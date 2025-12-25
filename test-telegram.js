const fs = require('fs');
const https = require('https');
const FormData = require('form-data');

const BOT_TOKEN = '8212839523:AAE-wlu_cb8hVl8GAvJRr0Gu433T3n_YUFE';
const CHAT_ID = '-5006088546';

// Create a test file
const testContent = `Test Resume - ${new Date().toISOString()}

Name: Test Applicant
Position: Senior Developer
Email: test@example.com
Phone: +1 555-123-4567

This is a test file upload to verify Telegram integration.
`;

const testFileName = 'test-resume.txt';
fs.writeFileSync(testFileName, testContent);

console.log('✓ Test file created:', testFileName);

// First, send a text message
async function sendMessage() {
  console.log('\n📤 Sending test message to Telegram...');
  
  const message = `
🧪 <b>Test Job Application</b>

<b>Position:</b> Senior Developer

<b>Candidate Details:</b>
👤 <b>Name:</b> Test Applicant
📧 <b>Email:</b> test@example.com
📱 <b>Phone:</b> +1 555-123-4567
🔗 <b>LinkedIn:</b> <a href="https://linkedin.com/in/test">linkedin.com/in/test</a>

<b>Cover Letter:</b>
This is a test application to verify the Telegram integration is working correctly.

<b>reCAPTCHA Score:</b> 0.9 (test)
<b>Applied:</b> ${new Date().toLocaleString()}
  `;

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  });

  const data = await response.json();
  
  if (data.ok) {
    console.log('✅ Message sent successfully!');
    console.log('   Message ID:', data.result.message_id);
  } else {
    console.error('❌ Message failed:', data.description);
    throw new Error(data.description);
  }
  
  return data;
}

// Then, send the file
async function sendFile() {
  console.log('\n📎 Sending test file to Telegram...');
  
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('document', fs.createReadStream(testFileName));
    form.append('caption', 'Resume for Test Applicant - Senior Developer');

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${BOT_TOKEN}/sendDocument`,
      method: 'POST',
      headers: form.getHeaders(),
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          
          if (data.ok) {
            console.log('✅ File sent successfully!');
            console.log('   File ID:', data.result.document.file_id);
            console.log('   File name:', data.result.document.file_name);
            console.log('   File size:', data.result.document.file_size, 'bytes');
            resolve(data);
          } else {
            console.error('❌ File upload failed:', data.description);
            reject(new Error(data.description));
          }
        } catch (error) {
          console.error('❌ Error parsing response:', error);
          console.error('   Response body:', body);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error);
      reject(error);
    });

    form.pipe(req);
  });
}

// Run the test
async function runTest() {
  console.log('🚀 Starting Telegram integration test...');
  console.log('   Bot Token:', BOT_TOKEN);
  console.log('   Chat ID:', CHAT_ID);
  
  try {
    await sendMessage();
    await sendFile();
    
    console.log('\n✅ All tests passed!');
    console.log('   Check your Telegram chat for:');
    console.log('   1. Application message with formatted details');
    console.log('   2. File attachment (test-resume.txt)');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up test file
    if (fs.existsSync(testFileName)) {
      fs.unlinkSync(testFileName);
      console.log('\n🧹 Test file cleaned up');
    }
  }
}

runTest();
