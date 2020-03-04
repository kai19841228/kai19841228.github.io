define("js/main", ["jquery","TweenMax","swiper.animate","swiper4","toolkit","layer","verificationCode"], function(require, exports, module) {
	var obj = {
		shareTitle: '61儿童节带孩子来这儿玩！',
		shareDesc: '领取首汽约车欢乐周边游8折券，陪伴孩子成长的每一段旅程',
		shareImage: 'https://img.yun.01zhuanche.com/frontapp/activity/2018/05/images/61/sharelogo.png',
		shareLink: '',
		api: {
			'msg': lottery + '/touch/specialActivity/actMessage',
			'coupon': lottery + '/touch/flsendCoupon/sendCouponByTemplate'
		},
		phone: '',
		play: 'act_20180528lyzby',
		successText: '恭喜您，六一周边游优惠券已放入您的首汽约车账户中',
		eventSta: {
			sign: 'act_20180528lyzby',
			type: 'click',
			slogan: '六一活动'
		}
	};
	//替换input输入时背景
	jQuery(".phone").blur(function() {
		if (jQuery(".phone").val().length <= 0) {
			jQuery(".phone").css("background-image", "url('public/img/btn_input_def.png')");
		}
	});
	jQuery(".phone").focus(function() {
		jQuery(".phone").css("background-image", "url('public/img/btn_input_act.png')");
	});
	//规则
	jQuery('.rule_link').bind('click', function() {
		jQuery('#rule').show().click(function() {
			jQuery('#rule').hide();
			jQuery('#rule').off('click')
		});
	});
	//提交
	jQuery('.form_box .submit').click(function(event) {
		obj.phone = jQuery('.phone').val();
		if (checkPhone(obj.phone)) {
			showMsgCode(obj.phone, obj.api.msg, function(code) {
				if (code) {
					var data = {
						'phone': obj.phone,
						'validateCode': code,
						'play': obj.play,
						'downloadchannel': channel
					};
					sendRequest(obj.api.coupon, 'post', data, function(res) {
						if (res) {
							if (res.code == 601) {
								if (isInApp()) {
									showDialog(obj.successText);
								} else {
									if (channel) {
										showDialog(obj.successText, '', 'http://m.01zhuanche.com/?channel=' + channel);
									} else {
										showDialog(obj.successText, '', 'http://m.01zhuanche.com/');
									}
									jQuery('#dialog_download_app').click(function(event) {
										baiduEvent(obj.eventSta);
									});
								}
							} else {
								showDialog(res.msg);
							}
						}
					});
				}
			});
		}
	});
	console.log(utils.toolkit)
	var swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		height: window.innerHeight,
		observer: true,
		observeParents: true,
		on: {
			init: function(){
				swiperAnimateCache(this); //隐藏动画元素 
				swiperAnimate(this); //初始化完成开始动画
			},
			slideChangeTransitionEnd: function(event) {
				swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
				//this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
				if (swiper.activeIndex == 3) {
					$('.phone').blur();
				}
			},
		}
	});
	var startScroll, touchStart, touchCurrent;
	swiper.slides.on('touchstart', function(e) {
		startScroll = this.scrollTop;
		touchStart = e.targetTouches[0].pageY;
	}, true);
	swiper.slides.on('touchmove', function(e) {
		touchCurrent = e.targetTouches[0].pageY;
		var touchesDiff = touchCurrent - touchStart;
		var slide = this;
		var onlyScrolling =
			(slide.scrollHeight > slide.offsetHeight) &&
			(
				(touchesDiff < 0 && startScroll === 0) ||
				(touchesDiff > 0 && startScroll === (slide.scrollHeight - slide.offsetHeight)) ||
				(startScroll > 0 && startScroll < (slide.scrollHeight - slide.offsetHeight))
			);
		if (onlyScrolling) {
			return false
			// e.stopPropagation();
		}
	}, true);
	//	微信分享
	var qurey = window.location.search;
	var uri = window.location.pathname; //当前页面相对路径
	var share = {
		imgUrl: obj.shareImage || 'https://img.yun.01zhuanche.com/frontapp/activity/imgs/share1.png', // 分享后展示图片
		lineLink: "", // 点击分享后跳转的页面地址
		shareTitle: obj.shareTitle, // 分享后主标题
		descContent: obj.shareDesc // 分享后副标题
	};
	shareHs(uri, qurey, share);
	// 通过 exports 对外提供接口
	exports.doSomething = function(){
		// TweenMax.to(".banner",1,{y:+50})
		console.log(TweenMax)
	}
	window.onload=function(){
		jQuery(".viewport").fadeIn()
	}
})