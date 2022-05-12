const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const { sendMessage, sendImage, sendNews, sendHistory, sendStock } = require('./api/index');
const { PORT } = require('./config/index');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.get('/', function (req, res) {
  res.send('I am docking bot');
})
app.post('/gitlab/webhooks', function (req, res) {
  res.send('200');
  console.log(req.body);
})
app.listen(PORT, () => {
  console.log('start success');
})
// app.get('/msg/text',function (req, res) {

//   res.send('success')
// // })
// app.post('/msg/text', (req, res) => {
//   const body = req.body
//   sendMessage('text', body)
//   console.log(req, 'body')
//   res.send({
//     status: 0,
//     msg: `POST请求成功${body}`,
//     data: body
//   })
// })



// sendMessage('news', {
//   articles: [
//     {
//       "title": "-",
//       "description": "-",
//       "url": "http://zentao.dc.servyou-it.com/pro/productplan-view-3119.html",
//       "picurl": "https://servu-test.oss-cn-hangzhou.aliyuncs.com/oc/licenseUpload/j01ffdQAzmLpug-file-read-198214.jpg",
//     }
//   ]
// })

// sendMessage('text', {
//   "content": "...",
//   "mentioned_mobile_list": [""],
// })
function ganfan() {
  const message = {
    content: `到点该吃饭了傻逼们：${new Date()}`,
    mentioned_list: ["@all"]
  }
  sendMessage('text', message)
  console.log('scheduleCronstyle:' + message);
}
// function xiaban() {
//   const message = {
//     content: `到点该下班了傻逼们：${new Date()}`,
//     mentioned_list: ["@all"]
//   }
//   sendMessage('text', message)
//   console.log('scheduleCronstyle:' + message);
// }
// function 喝水() {
//   const message = {
//     content: `到点该喝水了傻逼们：${new Date()}`,
//     mentioned_list: ["@all"]
//   }
//   sendMessage('text', message)
//   console.log('scheduleCronstyle:' + message);
// }
// ganfan();




// sendImage('./assets/dyd.png');


// const server = app.listen(8099, function () {

//   const host = server.address().address
//   const port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port,)

// })

// function scheduleJob(rules = ['*', '*', '*', '*', '*', '*', '*'], job) {
//   const rule = new schedule.RecurrenceRule();
//   // second、minute、hour、date、dayOfWeek、month、year 
//   rule.second = rules[0];
//   rule.minute = rules[1];
//   rule.hour = rules[2];
//   rule.date = rules[3];
//   rule.dayOfWeek = rules[4];
//   rule.month = rules[5];
//   rule.year = rules[6];
//   schedule.scheduleJob(rule, () => {
//     job();
//   });
// }

// 吃饭
schedule.scheduleJob('0 10 11 * * *', () => {
  ganfan();
});
// scheduleJob({}, () => ganfan());

// 喝水
schedule.scheduleJob('0 30 6,8,21 * * *', () => {
  sendImage('./assets/hs.png');
});

schedule.scheduleJob('0 0 11,15,18,19 * * *', () => {
  sendImage('./assets/hs.png');
});

schedule.scheduleJob('0 50 12 * * *', () => {
  sendImage('./assets/hs.png');
});

// 下班
schedule.scheduleJob('0 0 18 * * *', () => {
  sendImage('./assets/xb.jpg');
});

// 运动
schedule.scheduleJob('0 30 9,10,11,13,14,15,16,17,18 * * *', () => {
  sendImage('./assets/dyd.png');
});

// 加仓
schedule.scheduleJob('0 45 9,14 * * *', () => {
  sendImage('./assets/jc.jpeg');
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
  sendStock();
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