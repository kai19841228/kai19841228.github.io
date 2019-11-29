import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
    }
  }

  onShow() {
    console.log('mixin onShow')
  }

  onHide() {
    console.log('mixin hide')
  }

  onLoad() {
  }
}
