
const axios = require('axios');
const { GANFAN } = require('../config/index');
const { gitWebhooks } = require('./index');
function init(app) {
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
}

module.exports = init;