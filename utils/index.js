/* eslint-disable func-names */
// eslint-disable-next-line no-extend-native
const axios = require('axios');
const moment = require('moment');
Date.prototype.format = function (fmt) {
  const dateObj = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
  };
  if (/(y+)/.test(fmt)) {
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in dateObj) {
    if (new RegExp(`(${key})`).test(fmt)) {
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length === 1) ? (dateObj[key]) : ((`00${dateObj[key]}`).substr((`${dateObj[key]}`).length)),
      );
    }
  }

  return fmt;
};

// 转换时间戳
function parseTime(format) {
  const date = new Date();
  return date.format(format);
}

function checkTodayIsHoliday(dateTime = moment()) {
  const year = moment(dateTime).format('YYYY');
  const month = moment(dateTime).format('MM');
  const date = moment(dateTime).format('DD');
  const url = `https://api.apihubs.cn/holiday/get?year=${year}&month=${year}${month}&date=${year}${month}${date}&cn=1&size=31`;
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      const { data: { data: { list } } } = res;
      const [today] = list;
      const { workday_cn } = today;
      const isHoliday = workday_cn !== '工作日';
      console.log(today, isHoliday, 'res')
      resolve(isHoliday);
    }).catch(err => reject(err))
  })
}


module.exports = {
  parseTime,
  checkTodayIsHoliday,
};
