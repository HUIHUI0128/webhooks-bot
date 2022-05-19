const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const restfulApi = require('./api/restfulApi');
const scheduleJob = require('./api/scheduleJob');
const { PORT } = require('./config/index');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
// 静态资源目录
app.use(express.static('www'));

// 初始化restful服务
restfulApi(app);

// 启动服务
app.listen(PORT, () => {
  console.log('start success');
})

scheduleJob();