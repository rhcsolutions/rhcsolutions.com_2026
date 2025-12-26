#!/usr/bin/env node
const http = require('http');

console.log('Testing simple connection to http://localhost:3003/');

const req = http.get('http://localhost:3003/', (res) => {
  console.log(`Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Success! Got response');
    console.log('First 100 chars:', data.substring(0, 100));
  });
});

req.on('error', (err) => {
  console.error('Error:', err.code || err.message || JSON.stringify(err));
});

req.setTimeout(5000, () => {
  console.error('Request timeout');
  req.destroy();
});
