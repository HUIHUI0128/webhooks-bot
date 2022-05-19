
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


  // 吃饭统计
  let cfList = []; // 临时变量存储
  app.post('/cf/submit', function (req, res) {
    // const { ip } = req.body;
    // if (cfList.map((child) => child.ip).includes(ip)) {
    //   res.send(false);
    //   return
    // }
    res.send('200');
    cfList.unshift(req.body)
    if (cfList.length >= 11) {
      cfList.pop();
    }
  })
  app.get('/cf/list', function (req, res) {
    res.send(cfList);
    console.log(req.body);

  })
}

module.exports = init;