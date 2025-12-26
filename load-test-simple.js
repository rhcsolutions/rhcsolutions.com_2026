#!/usr/bin/env node
const http = require('http');

const url = 'http://localhost:3000/';
const concurrentConnections = 10; // Reduced for stability
const requestsPerConnection = 10;
const timeoutMs = 15000; // Increased timeout

let totalRequests = 0;
let successfulRequests = 0;
let failedRequests = 0;
let connectionRefusedCount = 0;
let timeoutCount = 0;
let totalLatency = 0;
let minLatency = Infinity;
let maxLatency = 0;
const latencies = [];
const errorLog = [];

const startTime = Date.now();

function makeRequest(connectionId, requestId) {
  return new Promise((resolve) => {
    const reqStart = Date.now();
    
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const latency = Date.now() - reqStart;
        successfulRequests++;
        totalLatency += latency;
        latencies.push(latency);
        minLatency = Math.min(minLatency, latency);
        maxLatency = Math.max(maxLatency, latency);
        resolve();
      });
    });

    req.on('error', (err) => {
      failedRequests++;
      if (err.code === 'ECONNREFUSED') {
        connectionRefusedCount++;
      }
      if (connectionId === 0 && requestId === 0) {
        errorLog.push(err.message);
      }
      resolve();
    });

    req.on('timeout', () => {
      timeoutCount++;
      failedRequests++;
      req.destroy();
      resolve();
    });
  });
}

async function runLoadTest() {
  console.log('\n========== STARTING LOAD TEST ==========');
  console.log(`Target: ${url}`);
  console.log(`Concurrent Connections: ${concurrentConnections}`);
  console.log(`Requests per Connection: ${requestsPerConnection}`);
  console.log(`Total Expected Requests: ${concurrentConnections * requestsPerConnection}`);
  console.log('======================================\n');

  // Create all connections
  const allPromises = [];
  for (let conn = 0; conn < concurrentConnections; conn++) {
    for (let req = 0; req < requestsPerConnection; req++) {
      totalRequests++;
      allPromises.push(makeRequest(conn, req));
    }
  }

  // Wait for all requests to complete
  await Promise.all(allPromises);

  const totalTime = Date.now() - startTime;
  const avgLatency = successfulRequests > 0 ? totalLatency / successfulRequests : 0;
  const requestsPerSecond = (totalRequests / totalTime) * 1000;

  // Calculate percentiles
  latencies.sort((a, b) => a - b);
  const p50 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.5)] : 0;
  const p90 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.9)] : 0;
  const p99 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.99)] : 0;

  console.log('========== LOAD TEST RESULTS ==========\n');
  console.log(`Total Time: ${totalTime}ms`);
  console.log(`Total Requests: ${totalRequests}`);
  console.log(`Successful: ${successfulRequests}`);
  console.log(`Failed: ${failedRequests}`);
  console.log(`  - Connection Refused: ${connectionRefusedCount}`);
  console.log(`  - Timeouts: ${timeoutCount}`);
  console.log(`Requests/sec: ${requestsPerSecond.toFixed(2)}`);
  console.log(`\nLatency (ms):`);
  console.log(`  Min: ${minLatency === Infinity ? 'N/A' : minLatency}`);
  console.log(`  Max: ${maxLatency}`);
  console.log(`  Mean: ${avgLatency.toFixed(2)}`);
  console.log(`  p50: ${p50}`);
  console.log(`  p90: ${p90}`);
  console.log(`  p99: ${p99}`);
  console.log(`\nSuccess Rate: ${successfulRequests > 0 ? ((successfulRequests / totalRequests) * 100).toFixed(2) : 0}%`);
  if (errorLog.length > 0) {
    console.log(`\nFirst Error: ${errorLog[0]}`);
  }
  console.log('=======================================\n');
}

runLoadTest().catch(console.error);
