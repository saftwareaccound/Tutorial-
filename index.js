require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

/* -------- /start -------- */
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;

  const welcome = `👋 မင်္ဂလာပါ ${msg.from.first_name || 'friend'}!\n\n` +
                  `ဤ bot မှာ အသုံးပြုနိုင်တဲ့ command များ:\n` +
                  `• /help – အပြည့်အစုံလမ်းညွှန်\n` +
                  `• /tutorial – လေ့လာကြမဲ့ guide\n` +
                  `• /other – ထပ်ဆောင်း info`;

  // Inline buttons
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📖 Help', callback_data: 'HELP' }],
        [{ text: '🎓 Tutorial', callback_data: 'TUTORIAL' }],
        [{ text: 'ℹ️ Other', callback_data: 'OTHER' }]
      ]
    }
  };

  bot.sendMessage(chatId, welcome, opts);
});

/* -------- /help -------- */
bot.onText(/^\/help$/, (msg) => {
  const helpText =
`🆘 **Help Menu**

🔹 /start – Bot‌ ကို ပြန်‌စတင်
🔹 /tutorial – လေ့လာညွှန်ကြားချက်
🔹 /other – အခြားသတင်းအချက်အလက်`;

  bot.sendMessage(msg.chat.id, helpText, { parse_mode: 'Markdown' });
});

/* -------- /tutorial -------- */
bot.onText(/^\/tutorial$/, (msg) => {
  const tut =
`🎓 **Tutorial**

1. Bot နဲ့ စတင်အသုံးပြုရန် \`/start\`
2. မေးခွန်းများရှိရင် \`/help\`
3. အခြားအကြောင်းအရာများ /other`;

  bot.sendMessage(msg.chat.id, tut, { parse_mode: 'Markdown' });
});

/* -------- /other -------- */
bot.onText(/^\/other$/, (msg) => {
  const otherInfo = 'ℹ️ အခြားအသုံးဝင်တဲ့ အချက်အလက်များကို ဒီနေရာတွင် ထည့်နိုင်ပါတယ်။';
  bot.sendMessage(msg.chat.id, otherInfo);
});

/* -------- Inline-button Callbacks -------- */
bot.on('callback_query', (query) => {
  const { message, data } = query;
  if (data === 'HELP') {
    bot.answerCallbackQuery(query.id);
    bot.emit('text', {chat: message.chat, text: '/help'}); // simulate
  } else if (data === 'TUTORIAL') {
    bot.answerCallbackQuery(query.id);
    bot.emit('text', {chat: message.chat, text: '/tutorial'});
  } else if (data === 'OTHER') {
    bot.answerCallbackQuery(query.id);
    bot.emit('text', {chat: message.chat, text: '/other'});
  }
});