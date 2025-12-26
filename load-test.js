const autocannon = require('autocannon');

// Load test configuration
const loadTest = async () => {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 1000,        // 1000 concurrent connections
    duration: 30,              // Test duration: 30 seconds
    timeout: 30000,            // 30 second timeout
    pipelining: 100,           // Number of requests per connection
    requests: [
      {
        path: '/',
        method: 'GET'
      },
      {
        path: '/services/professional-services',
        method: 'GET'
      },
      {
        path: '/services/cyber-security',
        method: 'GET'
      },
      {
        path: '/about-us',
        method: 'GET'
      },
      {
        path: '/contact',
        method: 'GET'
      }
    ]
  });

  // Print results
  console.log('\n========== LOAD TEST RESULTS ==========\n');
  console.log(`Total Requests: ${result.requests.total}`);
  console.log(`Requests/sec: ${result.requests.mean}`);
  console.log(`\nLatency (ms):`);
  console.log(`  Min: ${result.latency.min}`);
  console.log(`  Max: ${result.latency.max}`);
  console.log(`  Mean: ${result.latency.mean.toFixed(2)}`);
  console.log(`  Median: ${result.latency.p50}`);
  console.log(`  p99: ${result.latency.p99}`);
  console.log(`\nThroughput (bytes/sec): ${result.throughput.average}`);
  console.log(`Errors: ${result.errors}`);
  console.log(`Timeouts: ${result.timeouts}`);
  console.log('\n=======================================\n');
};

loadTest().catch(console.error);
