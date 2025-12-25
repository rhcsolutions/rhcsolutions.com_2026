# Telegram Bot Integration

Optionally send form submissions and alerts to a private Telegram chat.

## Setup

### 1. Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Follow prompts:
   - Bot name: `RHC_CV_bot`
   - Bot username: `@RHC_CV_bot` (must be unique)
4. Copy the **Bot Token** (e.g., `123456:ABC-DEF...`)

### 2. Get Your Chat ID

1. Start a conversation with your new bot
2. Send any message
3. Run:
   ```bash
   curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates"
   ```
4. Look for `"id"` in the response — this is your **Chat ID**

### 3. Update Environment

Add to `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your-token-here
TELEGRAM_CHAT_ID=your-chat-id-here
```

### 4. Test

Run the test script:

```bash
node test-telegram.js
```

You should receive a test message in your Telegram chat.

## Usage

When configured, the site will send notifications to your Telegram chat for:

- Contact form submissions
- New job applications
- Admin alerts (if implemented)

## Troubleshooting

**Bot not responding?**

- Verify token: `curl https://api.telegram.org/bot<TOKEN>/getMe`
- Check Chat ID is correct and bot is started
- Ensure bot has permission to send messages

**No messages received?**

- Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env.local`
- Restart dev server: `pnpm dev`
- Submit a test form to trigger message
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
