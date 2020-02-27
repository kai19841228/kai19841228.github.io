// 域名处理
var sendLink = {}
if (location.host.toLowerCase().indexOf('test')>-1) {
	sendLink = {
		url: "http://test.manage.imycargo.com"
	}
} else if (location.host.toLowerCase().indexOf('pre')>-1) {
	sendLink = {
		url: "http://pre.manage.imycargo.com"
	}
} else if(location.host.toLowerCase().indexOf('127')>-1||location.host.toLowerCase().indexOf('192')>-1) {
	sendLink = {
		url: "http://test.manage.imycargo.com"
	}
} else {
	sendLink = {
		url: "https://manage.imycargo.com"
	}
	window.console.log=function(){}
}
//字符串缓冲器
function StringBuffer() {
	this._things_ = new Array();
};
StringBuffer.prototype.append = function(str) {
	this._things_.push(str);
	return this;
};
StringBuffer.prototype.toString = function() {
	return this._things_.join("");
};
//var sb = new StringBuffer();
//sb.append('<div class="level1 cr">');
//sb.append('79798797979');
//sb.append('</div>');
//sb.toString();
//console.log(sb.toString())
//var b = new StringBuffer();
//console.log(b)
var citydata = [
        {
            "cityCode": "",
            "cityId": 1,
            "cityName": "芜湖"
        },
        {
            "cityCode": "",
            "cityId": 3,
            "cityName": "北京"
        }
    ]
window.addEventListener("beforeunload", function (event) {
	if(socket !== ''){
		socket.disconnect()
	}
})
window.onunload = function(){
  if(socket !== ''){
	socket.disconnect()
  }
}
function getCity(){
	$.ajax({
		type:"post",
		url: '/api/car-datav/city/list',
		// url: 'http://test.manage.imycargo.com/api/car-datav/city/list',
		// url: 'https://gw-passenger-wap.01zhuanche.com/gw-passenger-wap/zhuanche-passenger/api/v1/city/list?status=1',
		dataType:"json",
		success: function(res){
			var res = res || {};
			if(res.code == 0){
				console.log(res)
				var citydata = res.data
				var sb = new StringBuffer();
				for (var elem of citydata) {
					// console.log(elem)
					sb.append('<li cityName ="'+ elem.cityName +'" cityid ="'+elem.cityId+'">'+elem.cityName+'</li>');
				}
				$("#citySelect ul").html(sb.toString())
				$('.select ul>li').eq(0).click()
			}
		},
		error: function(res){
			console.log('ajax错误');
			console.log(res)
		}
	});
}
var oldCity
$(function(){
	$('.select').on('click', '.placeholder', function(e) {
		var parent = $(this).closest('.select');
		if (!parent.hasClass('is-open')) {
			parent.addClass('is-open');
			$('.select.is-open').not(parent).removeClass('is-open');
		} else {
			parent.removeClass('is-open');
		}
		e.stopPropagation();
	}).on('click', 'ul>li', function(e) {
		var parent = $(this).closest('.select');
		parent.removeClass('is-open').find('.placeholder').text($(this).text());
		// 取出城市的中心点
		// console.log($(this).attr('location'))
		if(oldCity == $(this).attr('cityName')) {return false}
		oldCity = $(this).attr('cityName')
		map.setCity($(this).attr('cityName'));
		socketIO($(this).attr('cityid'))
		setTimeout(function(){
			map.setZoom(13)
		},450)
	});
	$('body').on('click', function() {
		$('.select.is-open').removeClass('is-open');
	});
	$(window).on("load",function(){
		getCity()
	})
})