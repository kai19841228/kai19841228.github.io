<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="format-detection" content="telephone=no">
<meta http-equiv="x-rim-auto-match" content="none">
<meta name="viewport" content="initial-scale=1, minimum-scale=1 maximum-scale=1, user-scalable=no">
<title>井致邀你，首汽有礼</title>
<meta name="keywords" content="井致邀你，首汽有礼">
<meta name="description" content="井致邀你，首汽有礼">
<meta name="Copyright" content="井致邀你，首汽有礼">
<meta name="author" content="井致邀你，首汽有礼">
<!-- 网站的ico图标 -->
<link rel="shortcut icon" href="<@global.m/>accountqianyi/img/favicon.jpg" type="image/x-icon">
<link rel="stylesheet" href="<@global.m/>zx/css/reset.css"/>
<link rel="stylesheet" href="<@global.m/>zx/css/nanjingyidong.css?t=${.now?string('yyyy-MM-dd HH')}"/>
<script src="<@global.m/>zx/js/jquery1.8.3.min.js"></script>
<#include '../common/wx.share.ftl'>
		<script type="text/javascript">
			var shareTitle  = '首汽约车福利来袭';  // 分享后的标题
			var descContent = '10元通用优惠券限时免费领';  // 分享后的描述信息
		</script>
		<#include '../common/statistics_header.ftl'>
</head>

<body>
<!-- loading -->
<div id="loading"></div>
<!-- 图片展示部分 -->
<div class="wfj1">
	<header class="wfj1_header">
		<img src="<@global.m/>zx/imgs/2017/0413/quan_01.jpg" alt="" />
	</header>
	<section class="wfj1_section">
		<img src="<@global.m/>zx/imgs/2017/0413/quan_02.jpg" alt="" />
		<div class="contant">
			<input type="tel" class="wfj_phone" value="输入手机号" onclick="_hmt.push(['_trackEvent', 'act_wfjsqyc', 'click', '王府井手机号输入框'])" />
			<a class="wfj_submit" href="javascript:;" onclick="_hmt.push(['_trackEvent', 'act_wfjsqyc', 'click', '王府井马上领取按钮'])">马上领取优惠券</a>
			<span class="wfj_rule"  onclick="_hmt.push(['_trackEvent', 'act_wfjsqyc', 'click', '王府井活动规则按钮'])">了解活动规则</span>
		</div>
	</section>
	<article class="detail_box">
		<div class="detail_contant">
			<img class="explain" src="<@global.m/>zx/imgs/2017/0413/wfj_content.png" alt="" />
			<span class="close"></span>
		</div>
	</article>
	<article id="tip">
	    <div class="pack">
	        <h1>温馨提示</h1>
	        <p></p>
	        <a class="fail" href="javascript: void(0);">确定</a>
	        <div class="success cr">
	        	<a href="javascript: void(0);" class="fl success_left" style="width:45%;margin-left: 3%;text-align: center;">确定</a>
	        	<a href="http://m.01zhuanche.com" class="fr success_right" style="width:45%;margin-left:0;margin-right: 3%;text-align: center;" onclick="_hmt.push(['_trackEvent', 'act_wfjsqyc', 'click', '王府井下载APP按钮'])">下载APP</a>
	        </div>
	    </div>
	</article>
</div>
<script>
    $(function(){
        $(window).on("load",function(){
            $("#loading").fadeOut();
        })
         // ========================================浮层控制
         function fade_out(){
         	$("#tip").fadeOut()
            $("#tip .pack p").html("")
         }
         $("#tip .pack a").on("click",function(){
         	fade_out();
            return false;
        })
 
        function alerths(str){
        	$(".success").hide();
        	$(".fail").show();
            $("#tip").fadeIn()
            $("#tip .pack p").html(str)
            return false;
        }
        function alerths1(str){
        	$(".fail").hide();
        	$(".success").show();
            $("#tip").fadeIn()
            $("#tip .pack p").html(str)
            return false;
        }
    	var checkPhone = function(a){
		    var patrn = /^((?:13|15|18|14|17)\d{9}|0(?:10|2\d|[3-9]\d{2})[1-9]\d{6,7})$/;
		    if (!patrn.exec(a)) return false;
		    return true;
		};
		//========================================说明窗口
		$('.wfj_phone').each(function() {  
	        var default_value = this.value;  
	        $(this).focus(function(){  
	            if(this.value == default_value) {  
	                this.value = '';
	            }  
	        });  
	        $(this).blur(function(){  
	            if(this.value == '') {  
	                this.value = default_value;
	            }  
	        }); 
		})
		//=========================================规则窗口
		
		$(".wfj_rule").on("click",function(){
			$(".detail_box").fadeIn();
		})
		$(".close").on("click",function(){
			$(".detail_box").fadeOut();
		})
		// ========================================点击提交
		
        $(".wfj_submit").on("click",function(){
            var str=$(".wfj_phone").val()
				
            if(str.length==11&&checkPhone(str)){
               // 判断是不是11位手机号，为真提交
               $.post("/touch/promotions/sendNewVersionCoupons",{"phone":str,"play":"act_wfjsqyc"},function(data){
					if(data){
						if(data == 1){
							alerths1('恭喜您，10元通用券已放入到您的App账户');
						}else if (data == -600){
							alerths("仅限新用户领取");
						}else if (data == 2){
							alerths("您已参与过此活动！");
						}else if (data ==3){
							alerths("系统异常！");
						}else if (data == 4){
							alerths("参数错误！请输入正确的手机号！");
						}else if (data == 6){
							alerths("正在领取中......");
						}else if (data == 11){
							alerths("正在领取中......");
						}else if(data == -100){
							alerths("验证输入错误");
						}else if (data == -300){
							alerths("领取人数过多，请稍后重试！");
						}
					}else{
						alerths("操作失败！该活动已经过期或者还未开始！");
					}
				});
            }else{
                alerths("请正确输入手机号！")
            }
            return false;
        })
    });  

</script>
</body>
</html>