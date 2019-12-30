import * as types from './mutation-type.js'
export default {
  setServiceType (context, data) {
    context.commit(types.SET_SERVICE_TYPE, data)
  }
}
