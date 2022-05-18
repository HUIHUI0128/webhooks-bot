const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const moment = require('moment');
const { sendMessage, sendImage, sendNews, sendHistory, sendStock, gitWebhooks } = require('./api/index');
const { PORT } = require('./config/index');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

const checkTodayIsHoliday = () => {
  const year = moment().year();
  const month = moment().month() < 10 ? `0${moment().month()}` : moment().month();
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
// 服务api路由
// 根路由
app.get('/', function (req, res) {
  res.send('I am docking bot');
})
// git webhooks
app.post('/gitlab/webhooks', function (req, res) {
  res.send('200');
  console.log(req.body);
  gitWebhooks(req.body);
})
// 启动服务
app.listen(PORT, () => {
  console.log('start success');
})

function ganfan() {
  const message = {
    content: `到点该吃饭了傻逼们：${new Date()}`,
    mentioned_list: ["@all"]
  }
  sendMessage('text', message)
  console.log('scheduleCronstyle:' + message);
}

// 吃饭
schedule.scheduleJob('0 30 11 * * *', () => {
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

// 下班
schedule.scheduleJob('0 0 18 * * *', () => {
  checkTodayIsHoliday().then(res => {
    if (res) return
    sendImage('./assets/xb.jpg');
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

// 薅羊毛
// schedule.scheduleJob('0 55 16 * * *', () => {
//   const message = {
//     content: `薅羊毛：【德克士】仅售99元! 仅售99元！价值200.5元的欢聚时刻5人餐1份。 http://dpurl.cn/yYWjYghz`,
//     mentioned_list: ["@all"]
//   }
//   sendMessage('text', message)
//   console.log('scheduleCronstyle:' + message);
// });