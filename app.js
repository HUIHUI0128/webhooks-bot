const express = require('express');
const expressWs = require('express-ws')
const app = express();
const bodyParser = require('body-parser');
const restfulApi = require('./api/restfulApi');
const scheduleJob = require('./api/scheduleJob');
const socketRouter = require('./api/socket');
const { PORT } = require('./config/index');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
// 静态资源目录
app.use(express.static('www'));
// socket服务
expressWs(app)
app.use('/socket', socketRouter);

// 初始化restful服务
restfulApi(app);
// 定时任务
scheduleJob();
// 启动服务
app.listen(PORT, () => {
  console.log('start success');
})
