const axios = require('axios');
const { Base64 } = require('js-base64');
const { parseTime, checkTodayIsHoliday } = require('../utils')
const moment = require('moment');
const { WORK_DALIY_KEY } = require('../config');
const qs = require('qs');
const {
  USER_NAME,
  PASSWORD,
} = require('../config/index');
function getToken() {
  const url = 'http://godview.dc.servyou-it.com/godview/ssologin/submitLogin';
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify({
      loginUsername: USER_NAME,
      loginPassword: Base64.encode(PASSWORD + parseTime('yyyyMMddhhmmss')),
    })).then(res => {
      console.log(res, 'token')
      resolve(res.data.data);
    }).catch(err => reject(err))
  })
}
function getProjectList(token) {
  const url = 'http://godview.dc.servyou-it.com/godview/v1/project/queryProjectListByYearAndTeamId';
  return new Promise((resolve, reject) => {
    axios({
      url: `${url}?year=${moment().format('YYYY')}&teamId=19`,
      method: 'get',
      headers: { 'Cookie': `sso-epctoken=${token};` },
    }).then(res => {
      console.log(res, 'project')
      resolve(res.data.body);
    }).catch(err => reject(err))
  })
}
function getList(projectId, indicator, token) {
  const url = 'http://godview.dc.servyou-it.com/godview/v1/detection/queryDetectionResult';
  return new Promise((resolve, reject) => {
    axios({
      url: `${url}?projectId=${projectId}&date=${moment().format('YYYY-MM-DD')}&indicator=${indicator}`,
      method: 'get',
      headers: { 'Cookie': `sso-epctoken=${token};` },
    }).then(res => {
      console.log(res, 'list');
      resolve(res.data.body.list);
    }).catch(err => reject(err))
  })
}
function findLastWorkDay(date = moment()) {
  timestemp = 24 * 60 * 60 * 1000;
  return new Promise((resolve, reject) => {
    checkTodayIsHoliday(date - timestemp).then(res => {
      if (res) {
        resolve(findLastWorkDay(date - timestemp));
      } else {
        resolve(moment(date - timestemp).format('YYYY-MM-DD'));
      }
    }).catch((err) =>
      reject(err));
  })
}
function sendMarkTime() {
  findLastWorkDay().then((yestody) => {
    getToken().then((info) => {
      console.log(info, 'sss')
      const { token } = info;
      getProjectList(token).then((res) => {
        const { id } = res.find((child) => !child.finished) || {};
        getList(id, '12', token).then((list) => {
          const todayList = list.filter((item) => JSON.parse(item.jsonData).date === yestody);
          if (!todayList || !todayList.length) return;
          const atStr = todayList.map((child) => {
            const jsonData = JSON.parse(child.jsonData);
            const { account, name } = jsonData;
            return `\n ${name} <@${account}>`
          }).join('');
          const params = JSON.stringify({
            "msgtype": "markdown",
            "markdown": {
              "content": `
                  # 上个工作日(${yestody})
                  # 工时漏记情况，请相关同学注意
                  ${atStr}
                  \n [点我记工时](http://zentao.dc.servyou-it.com/pro/my-task-assignedTo.html)
                `,
            }
          })
          console.log(params, 'params');
          axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${WORK_DALIY_KEY}`, params)
        })
      });
    });
  })

}
module.exports = {
  sendMarkTime,
}