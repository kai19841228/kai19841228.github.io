<template>
	<view class="mainBody">
		<timeSelector v-if="showComponent('timeSelector')"></timeSelector>
		<view class="phone item"><input type="tel" @blur="userPhoneChange" v-model="userPhone" maxlength="11" placeholder="预订人手机号"></view>
		<view class="item" style="padding:7px 0;background:none;padding-left: 40px;"><span style="padding-right:16px;">代人叫车</span><switch :checked="switchStatu" @change="switchChange" color="#ff8400"/></view>
		<view v-show="switchStatu" class="phone item"><input type="tel" @blur="riderPhoneChange" v-model="riderPhone" maxlength="11" placeholder="预订人手机号"></view>
		<view v-show="switchStatu" class="user item"><input type="tel" @blur="riderNameChange" v-model="riderName" placeholder="预订人姓名"></view>
		<view class="item"><input type="text" disabled @click="addressHandle('up')" v-model="upAdress.name" placeholder="您在哪上车"></view>
		<view class="downAdress item"><input type="text" disabled @click="addressHandle('down')" v-model="downAdress.name" placeholder="您在哪下车"></view>
		<swiper class="swiper" duration="600" @change="planChange">
			<swiper-item v-for="(item, index) in data.estimateCostVOList" :key="index">
				<view class="cost">
					<h1>{{item.groupName || '优享型'}}</h1>
					<img style="width:200px;height:56px;" :src="item.imgUrl || '//rest-h5.imycargo.com/static/appimg/car.png'">
					<p>约 <span>{{item.debtAmount || 0}}</span> 元 
					<em style="display: inline-block;" v-if="item.discountAmount && item.discountAmount != 0">已减免 <span>{{item.discountAmount}}</span> 元</em></p>
					<p><span class="valuation" @tap="valuationHandle">计价规则</span></p>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import * as types from '../store/mutation-type.js'
	import order from '../services/order'
	import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
	import timeSelector from './timeSelector.vue'
	export default {
		name: "top",
		data() {
			return {
				data: {
					estimateCostVOList: [
						{
							groupName: '优享型'
						},
						{
							groupName: '经济型'
						},
						{
							groupName: '豪华型'
						}
					],
					estimateCostVOList: [0, 1, 2]
				}
			}
		},
		components: {
			timeSelector
		},
		methods: {
			planChange (e) {
				this.$store.dispatch('setPredict', this.data.estimateCostVOList[e.detail.current])
			},
			valuationHandle () {
				uni.navigateTo({
				   url: '/pages/valuation/valuation'
				})
			},
			addressHandle (val) {
				let url = '/pages/regeo/index?address=' + val
				uni.navigateTo({ url })
			},
			userPhoneChange (e) {
				if (e.detail.value === '' || e.detail.value.length != 11) return false
				this.$store.dispatch('setUserPhone', e.detail.value)
			},
			riderPhoneChange (e) {
				if (e.detail.value === '' || e.detail.value.length != 11) return false
				this.$store.dispatch('setRiderPhone', e.detail.value)
			},
			riderNameChange (e) {
				this.$store.dispatch('setRiderName', e.detail.value)
			},
			switchChange (e) {
				this.$store.dispatch('setSwitchStatu', {switchStatu: e.detail.value})
			},
			// 根据服务类型 看那些组件显示，那些隐藏。
			showComponent: function (componentName) {
				let serviceType = this.$store.state.serviceTypeStr
				let willShow = false
				let componentsShowInMain = {
					// 即时
					'JSYC': ['TopMenu', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 预约
					'YYYC': ['timeSelector', 'getonaddress', 'getoffaddress', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 接机
					'JJYC': ['choseflight', 'timeSelector', 'selecttimedif', 'termbuilding', 'getoffaddress', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 送机
					'SJYC': ['timeSelector', 'getonaddress', 'termbuilding', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 出租车
					'CZC': ['timeSelector', 'getonaddress', 'termbuilding', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice']
				}
				componentName = (componentName || '').toLowerCase()
				willShow = !!componentsShowInMain[serviceType].find(item => item.toLowerCase() === componentName)
				return willShow
			},
			getOrderCollect () {
				order.getOrderCollect(this)
			}
		},
		computed: {
			...mapState({
				switchStatu: function (state) {
					return state.switchStatu
				},
				upAdress: function (state) {
					return state.upAdress
				},
				downAdress: function (state) {
					return state.downAdress
				}
			})
    },
		mounted () {
			// 上下车地址都有值，调用费用预估
			uni.$on('getOrderCollect', this.getOrderCollect)
		},
		onShow() {
		},
		destroyed () {
		},
		// 监听页面卸载
		onUnload() {
			uni.$off('getOrderCollect', this.getOrderCollect)
		}
	}
</script>

<style scoped>
	.mainBody {
		box-sizing: border-box;
		width: 95%;margin: 10px auto;
		background: #FFFFFF;
		box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
		-webkit-box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
	}
	.mainBody .item {
	    border-bottom: 1rpx solid #e5e5e5;
	    padding: 12px 0;
	    padding-left: 40px;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABnElEQVQ4T7WVzS5DQRTHf6etdGfpKxYSnqDxANgTomLBG/gKFohLmrgiLIi23sCqrRD22NcjSFj43tkR2iNzU+XeTptUapZzzvzmzMz//EewDJ0hShujFBlB6AXaS2mPKFeEOOaJI0nxHlwuwQl1GUPZRei0bVaeU+4QFsQh+zuvDNQEISLsA9M1QZXBNJ/MSYKiCf0AXVJ/gH3j0+IwUwZ6x4RMnZX504VxWSUjmiTKK9dV7uyCAnsoeSKEKRAjzDzQb9n8nma6RV0mgENLwg4OywL6O6bmmjbZQlmyrJkU3SCLEA8EL3EYCMJ8YJcLoM+3TsmZCm+ArgBwSBzOat2pugwCp4GcWwN8A6K+wCftkuCpJjBBGxEeAznv/wJs8JE3yaKVjyKOVRo/nedyXiGf0qPYZaNss8aKVTYbbCHVZGOcpaWGsI1RhMjzQZgwMWMIVmEbs3ihx+vlhrRekXFZJ/M/5uBVaeyriSTKVF0moRxQYLbCvr4hdRmssmiOaTVYX5+ah2oljjJc+gI6SvEH7wsQTngmZ/sCvgB0Rprw3p/oOwAAAABJRU5ErkJggg==) no-repeat left 13px center;
	    background-size: 12px;
	}
	.mainBody .phone {
	    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAB8ElEQVRIS+2XvWtTURjGf0+ottXJxY+h4EerHfwLVJQrFQQdzCC62Tonu0VHRScdimvbSXBzklqEJJWCa0ebUgTBr03E2Eq4j6Q3JpikaXO5SZbe7cA553ff5z3nfZ8jr7w5yPDgDOIWcIDufiXMS35vZuXV/Cxiqru8ht3NnFzM/+pBpI1xlSpgbx+tv4Gy4E+dKZI6BZ4BDm23bidwRmPB886g0WyvFe5jP4wHDp3WmeDVv8VeW8rgsBJJ82c/0OngUW3uam4SaS4ZcPH1IOXhYy03G+KrTgQbyYDlLNa1OFIDi8DTeBHjadDjeOD2a3c6XHvgDlRPQmp7BalSRK5HZBXA54B9bYpP2zTtNscLSB/BNzBHEfOY28BQD8CMEzqPNFkD28vABqgEpBED9R9JQmpYQIxjysBnxDrmJmIRk47gvAOudAt8HPMC8QO4A7wHLgNhtWBcTRqcA0aBEWATM4Wo1OEiUML+iXShOj5bbROJHK4OrlGtWu+B/1Ntt/e451JnQBMxqECqAOGzeG2xwYHUncjyYcI/s1vj1P67Gj3/vRHgJB1IDVzM3av3aU9rLHiSLBi3NHteL1yk7LdbsAFN6OSlpSbwh1yGlFr7s0qbiW1vpch72V+a86iRyN7qSLsc98nQ9+0J06dH21/XRUo6Lho1ewAAAABJRU5ErkJggg==);
	    background-size: 15px;
	}
	.mainBody .user{
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADuElEQVRIS8WXb2hVdRjHP8859567NFpaUpYUUYLurjRYr3pTlFEGbcO0wMoXFZL9uQjtjUnTUCKIiQsXUqOiP9RNuneE+mL0JntTG7HRzhBM+gdKK6eS090/5zxxzt3GPXr+3Anl79WB3/f5fZ//z3OEBo6O5S0wH8YwH0K5B7gDodkXVc6CHkdkCHSQX/84LGtfKSU9K3EAHc43c5WVA14Grk96bOZ+EngXyj2S3eB9h55IYrW/Wg9mL+iNDRIGYSJ/oWyVbPunYfKXEKvmTex0LyJbLovwYiHVfqYnXpC2zZX6qwCxDu9P03TDAYTHoknlR3A/xOUnUqbiOHciPAPixT7qfM2FP9fVkweJxwrvI/JsuLS6qNFFtn0PI4VmMtLm40o6LHd3ntHx4haUvUAqVF61X1o7n5u9myNWe2Aj6CfRSus2Wkbfwl61E8N4FdUmHysyjeu+TXa0G3t1DqEnxltPzcbcJ1Y7vxjJHEV1SYS1x2iprMRO70Bke4RFuzgw2s361WPAyvBU9hKutMLL9hni4i7gtZgYvUFZ95AxTs5ZejHYs7zkLsUycqA7Yt7aLdmO7aKHejPcessJYHEkWHgSOIUyGJvpwhocrsPg8xjcJL/9fpPoeKEDlULsg8omDE4kElf1QdJyM8pH8Qpqp+h4cR9KQs3qO5R5PdbVcA4tL0Uyb4K+lOCZPlG78ENCDYLwN2nrdkqlrsjkgi6cqX7MhT/Hhs3XSIdE7eKpZKCP/oyJkU0sWdUdKCfPUthJS3sP4wN5YF2stbXLSc/VVRSzAbAH+RLLepFzpYrfQCqqmJXvaUotoGS8B3Edr45BcBon9tyNsZvz0x9I24az9Yrq8Xwz563nMdgGLEo0widuyNXyHS6P+w8abg6lA2R5jUCPIRRxjb1YRoqqWwCN69szrk5KLtUhnH/ux1h4H4b5cYxFp3Gdp5m6cIRrrj6Ccle05V5yxZfTNK62kjKX4TiDiKTj610rmOYaqtUJDGMEsMJbJ33xDUTowy1vBesowm2JsfM9zy9QXgHWPoS5aRSQFa+BxLVMg3txdRnIFw2RzoH0CZCTwLchcrWW6StphwwJwcEtL0CsXmDz/IjZj2XlqJSnQkq1NiRqxCFjUTkjrR2L1B44BPrI/IjlsGTb1+pY8TTCtXOy/h5WNxZr5KGLwEFEHogchVHaeCNS9Rvg0SBEgovA7KXGrj7zs/kSdNTq41vd0LJ3WQrEL3s++ZVYbwP99/9e6APkV+IXJqDAf/DT9i9mIqokYWn2zgAAAABJRU5ErkJggg==);
	    background-size: 15px;
	}
	.mainBody .downAdress{
	  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACCklEQVQ4T61VTWsTURQ9Z0aMSBCz8KPiQtBfUESculF3FRTFzGSh/0CrWBcqtDFfILpI0cR/4MaZiKKgO+Mq09L+hIIuotW6iEgWqZq58loyncxMAwN5y3vuPe9+vfOImDPzfjp1YH/6KoErQp4kMKHcBFijyIoAr3/+6r6qXfiwEQ5n2FBsZU2SVYJH4y4b2ATS1kRm56YaTtDPJywING3RfErw5iiiMCaQunfauV0gPIX5hKWWWSOTkfnZitTzU86MT1hpZU2hZifJLJopcnnDtqkGcDCTXkVMzwg0++gvSE9b3pWC3qc3qUO/I8C56OXydb3TPc6im7umQV5EbvTwJH/Gvr813KHDsms9AnAvHOOB11luWQ6I7DAon+YN53wMme9Wds0mwLNDcSINllzrM4FjQcADLj007Hejelp0rYsa8DboI8AXlX4PQCoI9HWZKJxyvo8iLDTNw/oeroUy3Bg/4fhLXrQcSOxQYlZju8CKa32MrI8ayk5rA+DxvGE/SLw2m8qSSa/GiYFabBGvqml/lv/u3qvrvX+TpDa7w2K31zvdE5tvubKUM8WT8Ty9QVdKrllLqjSDWIL1OePltjgoQMmXvmQ9g+BGIpEQPO8b9q2IfA1Itsr3qnFiEXqebQHvKoWJFdigUQ3qUGZfVkQuC6G+gCMKF+AbBSsk3/zo/G7EfQH/Afuv6qnAoaB9AAAAAElFTkSuQmCC);
	}
	.swiper{
		width: 100%;
		height: 173px;
	}
	.cost{
	  padding: 10px;
	  background-image: none;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;
	}
	.cost h1 {
	    font-size: 16px;
	    margin-bottom: 16px;
	}
	.cost p{
	  font-size: 13px;
	}
	.cost p span {
	    font-size: 20px;
	    color: #ff9d62;
	    font-weight: 400;
	}
	.cost p .valuation {
	    display: inline-block;
	    font-size: 15px;
	    margin-top: 10px;
	}
</style>
