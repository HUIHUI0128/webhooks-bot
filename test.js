const express = require('express');
const axios = require('axios');
const expressWs = require('express-ws')
const app = express();
const bodyParser = require('body-parser');
const restfulApi = require('./api/restfulApi');
const { sendMarkTime } = require('./api/godview');
const scheduleJob = require('./api/scheduleJob');
const proxy = require("http-proxy-middleware").createProxyMiddleware;
const { sendImage } = require('./api');
// app.use("/_AMapService/v4/map/styles", proxy(`https://webapi.amap.com/v4/map/styles`));
// app.use("/_AMapService/v3/vectormap", proxy(`https://fmap01.amap.com/v3/vectormap`));
// app.use("/_AMapService", proxy({
//   target: 'http://restapi.amap.com',
//   pathRewrite: { '/_AMapService/': '/' }
// }));
// app.get('/', function (req, res) {
//   res.send('I am docking bot');
// })
// const socketRouter = require('./api/socket');
// const { PORT } = require('./config/index');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.raw());
// app.use(bodyParser.text());
// // 静态资源目录
// app.use(express.static('www'));
// // socket服务
// expressWs(app)
// app.use('/socket', socketRouter);

// // 初始化restful服务
// // restfulApi(app);
// // // 定时任务
// // scheduleJob();
// // 启动服务
// app.listen(PORT, () => {
//   console.log('start success');
// })
setInterval(() => {
  // const params = JSON.stringify({
  //   "msgtype": "markdown",
  //   "markdown": {
  //     "content": `
  //       # 测试通知，请相关同学注意
  //     `,
  //   }
  // })
  // console.log(params, 'params');
  // axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=eaa8c51c-4d24-49f4-b5a2-7cbb36c45ebe`, params)
  sendImage('./assets/new-xb.jpeg', 'eaa8c51c-4d24-49f4-b5a2-7cbb36c45ebe');
}, 5000)