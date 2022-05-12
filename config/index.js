const dotenv = require('dotenv');
dotenv.config('./env');
const { WEBHOOK_URL, GANFAN, NEWS_KEY, PORT } = process.env;
module.exports = {
  key: WEBHOOK_URL,
  GANFAN,
  NEWS_KEY,
  PORT,
}
