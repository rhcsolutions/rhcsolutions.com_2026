# Telegram Bot Setup - IMPORTANT

## ⚠️ Getting Your Chat ID

The Telegram bot is configured correctly:
- **Bot Name**: RHC_CV_bot
- **Username**: @RHC_CV_bot
- **Bot Token**: 8212839523:AAE-wlu_cb8hVl8GAvJRr0Gu433T3n_YUFE ✅

However, you need to get your actual Chat ID. Here's how:

### Step 1: Start a Conversation with the Bot

1. Open Telegram on your phone or desktop
2. Search for: **@RHC_CV_bot**
3. Click "START" or send any message (like "Hello")

### Step 2: Get Your Chat ID

Run this command in your terminal:

```bash
curl "https://api.telegram.org/bot8212839523:AAE-wlu_cb8hVl8GAvJRr0Gu433T3n_YUFE/getUpdates"
```

You'll see something like:

```json
{
  "ok": true,
  "result": [
    {
      "update_id": 123456789,
      "message": {
        "message_id": 1,
        "from": {
          "id": 123456789,  // <- This is your CHAT_ID
          "is_bot": false,
          "first_name": "Your Name"
        },
        "chat": {
          "id": 123456789,  // <- This is your CHAT_ID
          "type": "private"
        },
        "text": "Hello"
      }
    }
  ]
}
```

### Step 3: Update Your .env.local

Replace the Chat ID in your `.env.local` file:

```env
TELEGRAM_BOT_TOKEN=8212839523:AAE-wlu_cb8hVl8GAvJRr0Gu433T3n_YUFE
TELEGRAM_CHAT_ID=123456789  # <- Use the ID from getUpdates
```

### Step 4: Test Again

Run the test script:

```bash
node test-telegram.js
```

You should see:
```
✓ Test file created: test-resume.txt
🚀 Starting Telegram integration test...

📤 Sending test message to Telegram...
✅ Message sent successfully!
   Message ID: 1

📎 Sending test file to Telegram...
✅ File sent successfully!
   File ID: xxx
   File name: test-resume.txt
   File size: 123 bytes

✅ All tests passed!
   Check your Telegram chat for:
   1. Application message with formatted details
   2. File attachment (test-resume.txt)
```

## Quick Test Commands

### 1. Verify Bot Token
```bash
curl "https://api.telegram.org/bot8212839523:AAE-wlu_cb8hVl8GAvJRr0Gu433T3n_YUFE/getMe"
```

Should return bot details ✅

### 2. Get Your Chat ID (after sending a message to the bot)
```bash
curl "https://api.telegram.org/bot8212839523:AAE-wlu_cb8hVl8GAvJRr0Gu433T3n_YUFE/getUpdates"
```

### 3. Test File Upload
```bash
node test-telegram.js
```

## Troubleshooting

### "chat not found" Error
- ❌ You haven't started a conversation with @RHC_CV_bot
- ✅ Open Telegram, search for @RHC_CV_bot, and click START

### Empty getUpdates Response
- ❌ No messages sent to bot yet
- ✅ Send any message to @RHC_CV_bot first

### Bot Not Found
- ❌ Incorrect bot username
- ✅ Use: @RHC_CV_bot (with underscore, not dash)

## Current Status

✅ Bot Token: Valid and working  
✅ Bot Username: @RHC_CV_bot  
❌ Chat ID: Needs to be obtained (see steps above)  

**Next Step**: Send a message to @RHC_CV_bot on Telegram, then run getUpdates to get your Chat ID.
