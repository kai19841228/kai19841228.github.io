<template>
<div class="weui-cells_after-title">
  <picker mode="multiSelector" @cancel="cancelPick" @change="confirmPick" @columnchange="changeSelect" :value="dialIndex" :range="dialOptions">
    <view class="picker lh">
      <div class="timer_icon"></div>
      <div class="txt" :class="{'active': chooseTime == '请选择时间'}">{{chooseTime}}</div>
    </view>
  </picker>
</div>
</template>

<script>
var t = require('../utils/time')
const STRTODAY = '今天'
const STRNOW = '现在'
const STRGONOW = '请选择时间'
const UNITMintoMS = 60 * 1000
const UNITDAYtoMS = 24 * 60 * 60 * 1000
const LISTALLHOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const STRHOUR = '点'

export default {
  props: {
    // 显示天数（含当天）
    showDays: {
      type: Number,
      default: 8
    },
    // 控制是否显示'现在'，默认值1可以省略；不显示'现在'传0
    hasNow: {
      type: Number,
      default: 1
    },
    // 预留分钟，默认30min
    reserveMinute: {
      type: Number,
      default: 30
    },
    // 分钟间隔
    minuteSpan: {
      type: Number,
      default: 5
    },
    MaxReserveMinute: { // 最大时间预定时间
      type: Number,
      default: 24 * 60 * 7
    },
    modifyT: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      firstIndexOfDateItem: 0,
      dialIndex: [0, 0, 0],
      dialOptions: [[], [], []],
      chooseTime: STRGONOW
    }
  },
  onReady () {
    // console.log('大小时间差:', this.reserveMinute, this.MaxReserveMinute)
    if (this.reserveMinute > 0 && this.MaxReserveMinute > 0) {
      this.init()
    }
    if (this.$store.state.orderTime.timeStr) {
      this.chooseTime = this.$store.state.orderTime.timeStr
    }
  },
  watch: {
    reserveMinute (val, oldval) {
      this.init()
    },
    modifyT (val) {
      if (val) {
        this.chooseTime = val
      }
    }
  },
  methods: {
    init () {
      let listDays = this.getDaysList()
      let listHours = []
      let listMinutes = []
      // console.log('hasNow:', typeof this.hasNow, this.hasNow, !!this.hasNow)
      if (+this.hasNow) {
        if (this.dialIndex[0] === 0) {
          listHours.push(STRNOW)
        }
      }
      listHours = this.getHoursList()
      listMinutes = this.getMinutesList(listHours)
      this.dialOptions = [listDays, listHours, listMinutes]
    },
    getFormatString (str) {
      str = str ? str.replace(/[\u4E00-\u9FA5]/g, '') : ''
      let padZeros = str.length === 1 ? '0' : '' // [0, 0].slice(0, 2 - str.length).join('')
      return padZeros + str
    },
    getChooseTime (dialIndex) {
      let chooseTime = ''
      if (this.dialOptions[1][dialIndex[1]] === STRNOW) {
        chooseTime = STRNOW
      } else {
        chooseTime = this.dialOptions[0][dialIndex[0]] + ' ' + this.getFormatString(this.dialOptions[1][dialIndex[1]]) + ':' + this.getFormatString(this.dialOptions[2][dialIndex[2]])
      }
      let dayStr = this.dialOptions[0][dialIndex[0]]
      let hour = this.getFormatString(this.dialOptions[1][dialIndex[1]])
      let minute = this.getFormatString(this.dialOptions[2][dialIndex[2]])
      let dayInfo = dayStr.replace(/[\u4E00-\u9FA5]/g, ' ').split(' ')
			if (dayStr === '今天') {
				dayInfo = [new Date().getMonth() + 1, new Date().getDate()]
			} else if(dayStr === '明天') {
				dayInfo = [new Date().getMonth() + 2, new Date().getDate() + 1]
			} else if (dayStr === '后天') {
				dayInfo = [new Date().getMonth() + 3, new Date().getDate() + 2]
			}
      let choosedTime = new Date()
      choosedTime.setMonth(dayInfo[0] - 1)
      choosedTime.setDate(dayInfo[1])
      choosedTime.setHours(hour)
      choosedTime.setMinutes(minute)
      // console.log('所选时间:', choosedTime)
			let now = new Date()
			if (chooseTime === '现在') {
				choosedTime = now
			}
			this.$store.dispatch('setBookingStartTime', {time: choosedTime, timeStr: chooseTime})
      return chooseTime
    },
    cancelPick (e) {
      this.reflushDialOptions()
    },
    confirmPick (e) {
      this.chooseTime = this.getChooseTime(e.mp.detail.value)
      this.reflushDialOptions()
    },
    changeSelect (e) {
      let listDays = this.dialOptions[0]
      let listHours = this.dialOptions[1]
      let listMinutes = this.dialOptions[2]
      let chooseIndex = this.dialIndex
      chooseIndex[e.mp.detail.column] = e.mp.detail.value
      this.dialIndex = chooseIndex
      if (e.mp.detail.column < 2) {
        switch (e.mp.detail.column) {
          case 0:
            this.dialIndex = [e.mp.detail.value, 0, 0]
            listHours = this.getHoursList()
            listMinutes = this.getMinutesList(listHours)
            break
          case 1:
            listMinutes = this.getMinutesList([], e.mp.detail.value)
            break
        }
        this.dialOptions = [listDays, listHours, listMinutes]
      }
    },
    getDaysList () {
      let listDays = []
      let dtNow = new Date()
      let dayStart = Math.floor((this.firstBookingTime().getTime() - dtNow.getTime()) / UNITDAYtoMS)
      let dayEnd = Math.ceil((this.lastBookingTime().getTime() - dtNow.getTime()) / UNITDAYtoMS)
      // console.log('days range:', dayStart, dayEnd)
      this.firstIndexOfDateItem = dayStart
      for (let d = dayStart; d < dayEnd; d++) {
				// if (d === 0){
				// 	listDays.push('今天')
				// } else if (d === 1) {
				// 	listDays.push('明天')
				// } else if (d === 2) {
				// 	listDays.push('后天')
				// } else {
				// 	listDays.push(t.printMonthDayAndWeek(t.nextNDay(d)))
				// }
				listDays.push(t.printMonthDayAndWeek(t.nextNDay(d)))
      }
      return listDays
    },
    firstBookingTime () {
      let dtNow = new Date(new Date().valueOf() + this.reserveMinute * UNITMintoMS)
      let nowMin = dtNow.getMinutes()
      let timeSpan = this.minuteSpan
      let showMin = nowMin % timeSpan === 0 ? nowMin : Math.floor((nowMin + timeSpan) / timeSpan) * timeSpan
      let dtfirstBookingTime = new Date(dtNow.valueOf() + (showMin - nowMin) * UNITMintoMS)
      return dtfirstBookingTime
    },
    lastBookingTime () {
      let dtNow = new Date(new Date().valueOf() + this.MaxReserveMinute * UNITMintoMS)
      let nowMin = dtNow.getMinutes()
      let timeSpan = this.minuteSpan
      let showMin = nowMin % timeSpan === 0 ? nowMin : Math.floor((nowMin + timeSpan) / timeSpan) * timeSpan
      let dtLastBookingTime = new Date(dtNow.valueOf() + (showMin - nowMin) * UNITMintoMS)
      // console.log('last days:', dtLastBookingTime)
      return dtLastBookingTime
    },
    totalMinutesTodayhas () {
      let dtNow = new Date()
      let dtTorrmow = new Date(dtNow.valueOf() + UNITDAYtoMS)
      dtTorrmow.setHours(0)
      dtTorrmow.setMinutes(0)
      let dateDiffOfMinutes = (dtTorrmow.valueOf() - dtNow.valueOf()) / UNITMintoMS
      return dateDiffOfMinutes
    },
    totalMinutesCurrentHourhas () {
      let dtNow = new Date()
      return 60 - dtNow.getMinutes()
    },
    getAllMinutesMask () {
      let listAllMins = []
      let span = this.minuteSpan
      for (let m = 0; m < 60; m += span) {
        listAllMins.push(m + '分')
      }
      return listAllMins
    },
    reflushDialOptions () {
      let listDays = this.getDaysList()
      let listHours = this.dialOptions[1]
      let listMinutes = []
      let TimeSpanOfMins = this.reserveMinute
      let MinsOfTodayHas = this.totalMinutesTodayhas()

      // 日期不变，调小时or调分钟
      if (TimeSpanOfMins <= MinsOfTodayHas) {
        listHours = this.getHoursList()
        listMinutes = this.getMinutesList(listHours, this.dialIndex[1])
      } else {
        let showDaysOfMins = this.MaxReserveMinute
        if (showDaysOfMins > TimeSpanOfMins) {
          listHours = this.getHoursList()
          listMinutes = this.getMinutesList(listHours)
          if (+this.hasNow) {
            listDays.unshift(STRTODAY)
          }
        } else {
          throw new Error('预留时间参数过大，表盘无法显示')
        }
      }
      this.dialOptions = [listDays, listHours, listMinutes]
    },
    getHoursList () {
      let listHours = []
      let dtNow = new Date()
      let dtFirst = this.firstBookingTime()
      let dtLast = this.lastBookingTime()
      let dtChoose = new Date(dtNow.valueOf() + (this.dialIndex[0] + this.firstIndexOfDateItem) * UNITDAYtoMS)

      // console.log('choose&first&last:', t.getDateValue(dtChoose), t.getDateValue(dtFirst), t.getDateValue(dtLast))
      if (t.getDateValue(dtChoose) === t.getDateValue(dtFirst)) {
        // console.log('==first')
        listHours = LISTALLHOURS.slice(dtFirst.getHours()).map(function (h) {
          return h + STRHOUR
        })
      } else if (t.getDateValue(dtChoose) < t.getDateValue(dtFirst)) {
        // console.log('<first')
        listHours = []
      } else if (t.getDateValue(dtChoose) === t.getDateValue(dtLast)) {
        // console.log('==last')
        listHours = LISTALLHOURS.slice(0, dtLast.getHours() + 1).map(function (h) {
          return h + STRHOUR
        })
      } else {
        // console.log('in else')
        listHours = LISTALLHOURS.slice(0).map(function (h) {
          return h + STRHOUR
        })
      }
      if (t.getDateValue(dtChoose) === t.getDateValue(dtNow) && +this.hasNow && listHours.indexOf(STRNOW) < 0) {
        listHours.unshift(STRNOW)
      }
      return listHours
    },
    getMinutesList (listHours, indexHour) {
      let listMins = this.getAllMinutesMask()
      let dtFirst = this.firstBookingTime()
      let dtLast = this.lastBookingTime()
      let dtNow = new Date()
      let dtChoose = new Date(dtNow.valueOf() + (this.dialIndex[0] + this.firstIndexOfDateItem) * UNITDAYtoMS)
      let hourChoose = ''
      listHours = listHours && listHours.length > 0 ? listHours : this.dialOptions[1]
      if (!indexHour) {
        if (listHours.length > this.dialIndex[1]) {
          hourChoose = listHours[this.dialIndex[1]]
        } else {
          hourChoose = listHours[0]
        }
      } else {
        hourChoose = listHours[indexHour]
      }
      if (hourChoose === STRNOW) {
        listMins = ['']
      } else if (t.getDateValue(dtChoose) === t.getDateValue(dtFirst) && hourChoose === dtFirst.getHours() + STRHOUR) {
        listMins = listMins.slice(dtFirst.getMinutes() / this.minuteSpan)
      } else if (t.getDateValue(dtChoose) === t.getDateValue(dtLast) && hourChoose === dtLast.getHours() + STRHOUR) {
        listMins = listMins.slice(0, (dtLast.getMinutes() / this.minuteSpan) + 1)
      }
      return listMins
    }
  }
}
</script>

<style scoped>
.picker {
  width: 100%;
  height: 84upx;
  border-bottom: 1upx solid #e5e5e5;
}
.picker .timer_icon{
  float: left;
  width: 10%;
  height: 84upx;
  background: url(../static/images/app_icon21.png) no-repeat;
  background-size: 30upx;
  background-position: center;
}
.picker .txt {
  float: left;
  width: 80%;
  height: 84upx;
  line-height: 84upx;
  font-size: 32upx;
  box-sizing: border-box;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  
}
.picker .active {
  color: #777;
}
</style>

