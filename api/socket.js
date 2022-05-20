const express = require('express');
const expressWS = require('express-ws');
const axios = require('axios');
const { GANFAN } = require('../config/index');
const router = express.Router();
expressWS(router);
let eatList = []
let clients = {}
router.ws("/eat/:wid", function (ws, req) {
  // clients
  const wid = req.params.wid
  clients[wid] = ws
  ws.send(JSON.stringify({
    type: 1,
    data: eatList,
  }));
  console.log(wid, 'req')
  ws.on("message", function (msg) {
    console.log(msg);
    const data = JSON.parse(msg);
    if (data === 'ping') {
      ws.send(JSON.stringify({
        type: 2,
        data: 'pong',
      }))
      return
    }
    eatList.unshift(data);
    Object.keys(clients).forEach((key) => {
      clients[key].send(JSON.stringify({
        type: 1,
        data: eatList,
      }));
    })
    if (eatList.length >= 11) {
      eatList.pop();
    }
    const params = JSON.stringify({
      "msgtype": "text",
      "text": {
        content: `(${data.time}<${data.name}>) : ${data.value}`,
      }
    })
    axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${GANFAN}`, params)
  });

  ws.on("close", function (msg) {
    delete clients[wid]
  })
})

module.exports = router