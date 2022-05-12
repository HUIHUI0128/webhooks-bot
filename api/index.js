const fs = require('fs');
const axios = require('axios');
const { key, GANFAN, NEWS_KEY, GIT_WEBHOOK_KEY } = require('../config/index');
const MD5 = require('md5');
function sendMessage(msgType, msgContent) {
  const params = JSON.stringify({
    "msgtype": msgType,
    [msgType]: msgContent
  })
  console.log(params, 'params');
  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${GANFAN}`, params)
}

function sendImage(path) {
  // const base64 = fs.readFileSync(path, 'base64');
  const buffer = fs.readFileSync(path);
  const base64 = Buffer.from(buffer, 'binary').toString('base64');
  const md5 = MD5(buffer);
  const params = JSON.stringify({
    "msgtype": "image",
    "image": {
      "base64": base64,
      "md5": md5,
    }
  })
  console.log(base64, md5, 'params');
  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${GANFAN}`, params)
}

function sendArt(articles) {
  const params = JSON.stringify({
    "msgtype": "news",
    "news": {
      "articles": articles,
    }
  })
  console.log('params/n/n/n', params, articles.length, 'params')
  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${GANFAN}`, params);
}

function sendNews() {
  axios.get(`https://api.jisuapi.com/news/get?channel=%E5%A4%B4%E6%9D%A1&start=0&num=10&appkey=${NEWS_KEY}`).then((res) => {
    const { result: { list } } = res.data;
    const articles = list.slice(0, 8).map((child => ({ title: child.title, description: child.src, url: child.url, picurl: child.pic })))
    sendArt(articles);
  }).catch((err) => {
    console.log(err, 'err')
  })
}

function sendHistory() {
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  axios.get(`https://api.jisuapi.com/todayhistory/query?appkey=${NEWS_KEY}&month=${month}&day=${day}`).then((res) => {
    const { result: list } = res.data;
    sendMessage('text', {
      content: '历史上的今天：\n' + list.slice(0, 10).map((child) => `${child.year}年${child.month}月${child.day}:${child.title}`).join('\n'),
      mentioned_list: [""]
    })
  }).catch((err) => {
    console.log(err, 'err')
  })
}

function sendStock() {
  axios.get(`https://api.jisuapi.com/stockhistory/query?code=603171&startdate=&enddate=&appkey=${NEWS_KEY}`).then((res) => {
    const { result: { list }, result } = res.data;
    console.log(res.data, 'dddd')
    const [info] = list;
    sendMessage('text', {
      content: '今日行情：\n' +
        `股票名称：${result.name}\n` +
        `股票代码：${result.code}\n` +
        `日期：${new Date()}\n` +
        `开盘价：${info.openningprice}\n` +
        `收盘价：${info.closingprice}\n` +
        `最高价：${info.maxprice}\n` +
        `最低价：${info.minprice}\n` +
        `成交量(手)：${info.tradenum}\n` +
        `成交额：${info.tradeamount}\n` +
        `换手率：${info.turnoverrate}\n` +
        `涨跌幅：${info.changepercent}\n` +
        `涨跌额：${info.amplitude}\n` +
        `振幅：${info.changepercent}\n`,
      // `市盈率：${info.per}\n` +
      // `市净率：${info.pbr}\n` +
      // `总市值：${info.totalmarket}\n` +
      // `流通市值：${info.circulationmarket}\n`,
      mentioned_list: [""]
    })
  }).catch((err) => {
    console.log(err, 'err')
  })
}
function gitWebhooks(result) {
  const { user_name, project: { name }, commits, event_name, user_username } = result;
  if (event_name === 'push') {
    const [commit] = commits;
    const { timestamp, url, title } = commit;
    const params = JSON.stringify({
      "msgtype": "markdown",
      "markdown": {
        "content": `
          # git变更通知，请相关同学注意
          > 仓库名: <font color="comment">${name}</font>
          > 提交人: <font color="info">${user_name}</font>
          > 变更日志: [${url}](${url})
          > 变更备注: <font color="comment">${title}</font>
          > 变更时间: <font color="comment">${timestamp}</font>
        `,
        "mentioned_list": ['15606720829'],
      }
    })
    console.log(params, 'params');
    axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${GIT_WEBHOOK_KEY}`, params)
  }
}
module.exports = {
  sendMessage,
  sendImage,
  sendNews,
  sendHistory,
  sendStock,
  gitWebhooks,
}