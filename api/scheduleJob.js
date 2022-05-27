
const axios = require('axios');
const schedule = require('node-schedule');
const moment = require('moment');
const { sendMessage, sendImage, sendNews, sendHistory, sendStock } = require('./index');

const checkTodayIsHoliday = () => {
  const year = moment().year();
  const month = moment().month() + 1 < 10 ? `0${moment().month() + 1}` : moment().month() + 1;
  const date = moment().date() < 10 ? `0${moment().date()}` : moment().date();
  const url = `https://api.apihubs.cn/holiday/get?year=${year}&month=${year}${month}&date=${year}${month}${date}&cn=1&size=31`;
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      const { data: { data: { list } } } = res;
      const [today] = list;
      const { workday_cn } = today;
      const isHoliday = workday_cn !== '工作日';
      console.log(today, isHoliday, 'res')
      resolve(isHoliday);
    }).catch(err => reject(err))
  })
}
function init() {
  function ganfan() {
    const message = {
      content: `快到吃饭时间了，讨论下吃啥吧：http://104.168.140.110:3939/cftj.html`,
      mentioned_list: ["@all"]
    }
    sendMessage('text', message)
    console.log('scheduleCronstyle:' + message);
  }

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
      sendImage('./assets/xb.png');
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

}

module.exports = init