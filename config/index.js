const dotenv = require('dotenv');
dotenv.config('./env');
const { WEBHOOK_URL, GANFAN, NEWS_KEY, PORT, GIT_WEBHOOK_KEY } = process.env;
module.exports = {
  key: WEBHOOK_URL,
  GANFAN,
  NEWS_KEY,
  PORT,
  GIT_WEBHOOK_KEY,
}
