const getters = {
  getMenu: state => {
    return state.menu
  },
	// getters 里可以做计算,在computed里引用
	count: state => {
    return state.num * price
  }
}
export default getters