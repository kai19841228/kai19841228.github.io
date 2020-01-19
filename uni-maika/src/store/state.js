const state = {
	serviceTypeStr: 'JSYC', // 服务类型
	cityCurrent: {
		status: 0
	}, // 当前城市
	cityUp: {
		cityId: 1,
		cityName: '',
		cityCode: '',
		regionNumber: '',
		centeralLaGd: '',
		centeralLoGd: '',
		status: 0
	}, // 上车城市
	cityDown: {
		cityId: '',
		cityName: '',
		cityCode: '',
		regionNumber: '',
		centeralLaGd: '',
		centeralLoGd: '',
		status: 0
	}, // 下车城市
	orderTime: {
		bookingStartTime: Math.ceil(new Date().getTime() / 1000),
		flightBookingStartTime: '',
		timeStr: '现在'
	}, // 下单时间
	predict: {}, // 费用预估
	switchStatu: false, // 页面带人叫车状态切换
	upAdress: {}, // 上车地址
	downAdress: {}, // 下车地址
	orderType: 1, // 订单类型 1普通用户2企业用户
	serviceType: 1, // 服务类型 1即时2预约
	bookingDate: '', // 出发时间 时间戳
	startPoint: '', // 起点坐标 经度,纬度
	endPoint: '', // 终点坐标 经度,纬度
	companyId: '', // 公司ID 企业订单传入
	userPhone: '', // 预订人手机号
	riderPhone: '', // 乘车人 手机号
	riderName: '', // 乘车人 姓名
	payFlag: 1, // 支付人标记 1:预订人 | 2:乘车人
	callByOthers: '' // 是否代人叫车 0否1是
}
export default state
