const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getRawDate = function (date) {
  return new Date(date.getTime() - date.getHours() * 60 * 60 * 1000 -
    date.getMinutes() * 60 * 1000 - date.getMilliseconds())
}
const DAY = 24 * 60 * 60 * 1000

module.exports = {
  // n分钟之后
  afterMinutes (d, n, adjust5) {
    if (!(d instanceof Date) || typeof n !== 'number') return null

    if (adjust5) { // 四舍五入置5
      d = this.afterMinutes(d, n)
      d.setMinutes(Math.ceil(d.getMinutes() / 5) * 5)
    } else {
      d = new Date(d.getTime() + n * 60 * 1000)
    }

    return d
  },

  getDateDiff (leftDate, rightDate) {
    // 两个同时抹掉当前的小时分钟毫秒等数字
    return Math.round(Math.abs(getRawDate(leftDate).getTime() - getRawDate(rightDate).getTime()) / DAY)
  },
  lastDay (d) { // 昨天
    d = d || new Date()
    var t = d.getTime() - DAY
    return new Date(t)
  },
  last2Day (d) { // 前天
    d = d || new Date()
    var t = d.getTime() - 2 * DAY
    return new Date(t)
  },
  nextDay (d) { // 明天
    d = d || new Date()
    var t = DAY + d.getTime()
    return new Date(t)
  },
  next2Day (d) { // 后天
    d = d || new Date()
    var t = 2 * DAY + d.getTime()
    return new Date(t)
  },
  nextNDay (n, d) { // 未来n天
    n = isNaN(+n) ? 1 : n // 默认值为1
    d = d || new Date()
    var t = n * DAY + d.getTime()
    return new Date(t)
  },
  pastNDay (n, d) { // 过去的n天
    n = n || 1
    d = d || new Date()
    var t = d.getTime() - n * DAY
    return new Date(t)
  },
  printMonthDay (d) { // 以 xx月xx日的形式输出日期
    if (!(d instanceof Date)) return ''
    return (d.getMonth() + 1) + '月' + d.getDate() + '日'
  },
  printYearMonthDay (d) { // 以 xxxx年xx月xx日的形式输出日期
    if (!(d instanceof Date)) return ''
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
  },
  printDay (d) { // 以中文的形式打印 “周一” 这类
    if (!(d instanceof Date)) return ''
    const MAP = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return MAP[d.getDay()]
  },
  printMonthDayAndWeek (d) {
    if (!(d instanceof Date)) return ''
    const MAP = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return (d.getMonth() + 1) + '月' + d.getDate() + '日' + ' ' + MAP[d.getDay()]
  },
  formate (d) {
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    // const second = d.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
  },
  getUpTime (d) {
    if (!(d instanceof Date)) return ''

    const minute = d.getMinutes()
    d.setMinutes(Math.ceil(minute / 5) * 5)
    return this.formate(d)
  },
  // 传入日期，获取月、日、小时和分钟
  getPoints (date) {
    return [date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()]
  },
  // 获取当天凌晨时间值
  getDateValue (dt) {
    if (!(dt instanceof Date)) return 0
    let dtWeeHours = new Date(`${dt.getFullYear()}/${formatNumber(dt.getMonth() + 1)}/${formatNumber(dt.getDate())}`)
    // console.log('dtWeeHours:', `${dt.getFullYear()}/${formatNumber(dt.getMonth() + 1)}/${formatNumber(dt.getDate())}`)
    return dtWeeHours.getTime()
  }
}
