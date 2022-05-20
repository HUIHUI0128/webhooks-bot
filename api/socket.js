const express = require('express');
const expressWS = require('express-ws');
const axios = require('axios');
const { GANFAN } = require('../config/index');
const router = express.Router();
expressWS(router);
let eatList = []
router.ws("/eat", function (ws, req) {
  ws.send(JSON.stringify({
    type: 1,
    data: eatList,
  }));
  ws.on("message", function (msg) {
    console.log(msg);
    const data = JSON.parse(msg);
    eatList.unshift(data);
    ws.send(JSON.stringify({
      type: 1,
      data: eatList,
    }));
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
})

module.exports = router