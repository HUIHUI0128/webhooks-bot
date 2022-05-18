const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const schedule = require('node-schedule');
const { sendMessage, sendImage, sendNews, sendHistory, sendStock } = require('./api/index');
const { GIT_WEBHOOK_KEY } = require('./config/index');
// const calendar = require('chinese-calendar');
const moment = require('moment');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
// app.get('/', function (req, res) {
//   res.send('I am docking bot');
// })
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
// function ganfan() {
//   const message = {
//     content: `到点该吃饭了傻逼们：${new Date()}`,
//     mentioned_list: ["@all"]
//   }
//   sendMessage('text', message)
//   console.log('scheduleCronstyle:' + message);
// }
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


// // 吃饭
// schedule.scheduleJob('0 10 11 * * *', () => {
//   ganfan();
// });

// // 喝水
// schedule.scheduleJob('0 30 6,8,21 * * *', () => {
//   sendImage('./assets/hs.png');
// });

// schedule.scheduleJob('0 0 11,15,18,19 * * *', () => {
//   sendImage('./assets/hs.png');
// });

// schedule.scheduleJob('0 50 12 * * *', () => {
//   sendImage('./assets/hs.png');
// });

// // 下班
// schedule.scheduleJob('0 0 18 * * *', () => {
//   sendImage('./assets/xb.jpg');
// });

// // 运动
// schedule.scheduleJob('0 30 9,10,11,13,14,15,16,17,18 * * *', () => {
//   sendImage('./assets/dyd.png');
// });

// // 加仓
// schedule.scheduleJob('0 45 9,15 * * *', () => {
//   sendImage('./assets/jc.jpeg');
// });

// sendImage('./assets/jc.jpeg');
// const rule = new schedule.RecurrenceRule();
// // second、minute、hour、date、dayOfWeek、month、year 
// rule.second = [0, 10, 20, 30, 40, 50];
// schedule.scheduleJob('1,5,10,15,20,25,30,35,40,45,50,55 * * * * *', () => {
//   // sendImage('./assets/jc.jpeg');
//   console.log('11111')
// });

// sendHistory();
// sendStock();

// const params = JSON.stringify({
//   "msgtype": "markdown",
//   "markdown": {
//     "content": `
//       # git变更通知，请相关同学注意
//       > 仓库名: <font color="comment">1</font>
//       > 提交人: <font color="info">1</font>
//       > 变更日志: [1](1)
//       > 变更备注: <font color="comment">1</font>
//       > 变更时间: <font color="comment">1</font>

//       <@qiaos>
//     `,
//   }
// })
// console.log(params, 'params');
// axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${GIT_WEBHOOK_KEY}`, params)

const checkTodayIsHoliday = () => {
  const year = '2022';
  const month = '10';
  const date = '01';
  const url = `https://api.apihubs.cn/holiday/get?year=${year}&month=${year}${month}&date=${year}${month}${date}&cn=1&size=31`;
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      const { data: { data: { list } } } = res;
      const [today] = list;
      const { workday_cn } = today;
      const isHoliday = workday_cn !== '工作日';
      resolve(isHoliday);
    }).catch(err => reject(err))
  })
}
checkTodayIsHoliday().then(res => console.log(res, 'res'))