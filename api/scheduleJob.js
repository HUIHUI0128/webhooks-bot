
const axios = require('axios');
const schedule = require('node-schedule');
const moment = require('moment');
const { key, GANFAN, NEWS_KEY, GIT_WEBHOOK_KEY, BIG_LUCKY } = require('../config/index');
const { sendMessage, sendImage, sendNews, sendHistory, sendStock, sendText } = require('./index');
const { sendMarkTime } = require('./godview');
const { checkTodayIsHoliday } = require('../utils')


function init() {
  function ganfan() {
    const message = {
      content: `干饭了！！！`,
      mentioned_list: ["@all"]
    }
    sendMessage('text', message)
    console.log('scheduleCronstyle:' + message);
  }

  // 开晨会
  schedule.scheduleJob('0 15 9 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendText('开晨会啦!!!', BIG_LUCKY);
    })
  });

  // 吃饭
  schedule.scheduleJob('0 29 11,17 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      ganfan();
    })
  });
  // scheduleJob({}, () => ganfan());

  // 喝水
  schedule.scheduleJob('0 30 6,8,21 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendImage('./assets/hs.png');
    })
  });

  schedule.scheduleJob('0 0 11,15,18,19 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendImage('./assets/hs.png');
    })
  });

  schedule.scheduleJob('0 50 12 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendImage('./assets/hs.png');
    })
  });

  // 上班
  schedule.scheduleJob('0 0 9 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendImage('./assets/sb.png');
    })
  });

  // 下班
  schedule.scheduleJob('0 0 18 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendImage('./assets/new-xb.jpeg');
    })
  });

  // 运动
  schedule.scheduleJob('0 30 9,10,11,13,14,15,16,17,18 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendImage('./assets/dyd.png');
    })
  });

  // 加仓
  schedule.scheduleJob('0 45 9,14 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendImage('./assets/jc.jpeg');
    })
  });

  // 新闻推送
  schedule.scheduleJob('0 10 9,11,13,15,17,19 * * *', () => {
    sendNews();
  });

  // 历史上的今天
  schedule.scheduleJob('0 45 10 * * *', () => {
    sendHistory();
  });

  // 股票行情
  schedule.scheduleJob('0 1 15 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendStock();
    })
  });

  // 工时漏记提醒
  schedule.scheduleJob('0 20 9 * * *', () => {
    checkTodayIsHoliday().then(res => {
      if (res) return
      sendMarkTime();
    })
  });

}

module.exports = init