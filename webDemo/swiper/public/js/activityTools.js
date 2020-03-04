(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (clientWidth >= 750) {
				clientWidth = 750;
			}
			if (clientWidth <= 320) {
				clientWidth = 320;
			}
			if (!clientWidth) {
				return;
			}
			docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
		};
	if (!doc.addEventListener) {
		return;
	}
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener("DOMContentLoaded", recalc, false);

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			if (unescape(r[2]) != "undefined" && unescape(r[2]) != "NaN") {
				return unescape(r[2]);
			} else {
				return null;
			}
		}
		return null;
	}
	var channel = GetQueryString("channel");
	var condition = GetQueryString("condition");
	if (channel != null && channel.toString().length > 1) {
		win.channel = channel;
	} else {
		win.channel = "";
	}
	switch (condition) {
		case "0":
			win.lottery = "//test-m.01zhuanche.com";
			break;
		case "1":
			win.lottery = "//pre-m.01zhuanche.com";
			break;
		default:
			win.lottery = "//m.01zhuanche.com";
	}
})(document, window);

function addFile(url, fileType) {
	var date = new Date();
	min = date.getMinutes() % 10 == 0 ? date.getMinutes() : Math.floor(date.getMinutes() / 10) * 10;
	var timestamp = "?t=" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + min;
	var head = document.getElementsByTagName("HEAD").item(0);
	var link;
	if (fileType == "js") {
		link = document.createElement("script");
		link.type = "text/javascript";
		link.src = url + timestamp;
	} else {
		link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = url + timestamp;
	}
	head.appendChild(link);
}

function shareHs(uri, query, share) {
	$.ajax({
		type: "post",
		url: "//m.01zhuanche.com/touch/wxshareMsg/msg",
		dataType: "json",
		data: {
			"uri": uri,
			"query": query
		},
		success: function(res) {
			share.lineLink = res.url;
			wx.config({
				debug: false,
				appId: res.appId,
				timestamp: res.timestamp,
				nonceStr: res.nonceStr,
				signature: res.signature,
				jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
			});
			wx.error(function(res) {});
			wx.ready(function() {
				wx.onMenuShareTimeline({
					title: share.shareTitle,
					link: share.lineLink,
					imgUrl: share.imgUrl,
					success: function() {},
					cancel: function() {}
				});
				wx.onMenuShareAppMessage({
					title: share.shareTitle,
					desc: share.descContent,
					link: share.lineLink,
					imgUrl: share.imgUrl,
					type: "",
					dataUrl: "",
					success: function() {
						if (typeof wxShareSuccess == "function") {
							wxShareSuccess();
						}
					},
					cancel: function() {}
				});
			});
		}
	});
}

function shareHandle(shareObj) {
	var share_thisUrl = location.href.split("#")[0];
	var share_title = shareObj.share_title;
	var share_desc = shareObj.share_desc;
	var share_imgUrl = shareObj.share_imgUrl;
	var share_urlShare = shareObj.share_urlShare;
	$.ajax({
		type: "post",
		url: "//m.01zhuanche.com/touch/wxshareMsg/msgn",
		dataType: "json",
		data: {
			"url": share_thisUrl
		},
		success: function(res) {
			wx.config({
				debug: false,
				appId: res.appId,
				timestamp: res.timestamp,
				nonceStr: res.nonceStr,
				signature: res.signature,
				jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
			});
			wx.ready(function() {
				wx.onMenuShareTimeline({
					title: share_title,
					link: share_urlShare,
					imgUrl: share_imgUrl,
					success: function() {},
					cancel: function() {}
				});
				wx.onMenuShareAppMessage({
					title: share_title,
					desc: share_desc,
					link: share_urlShare,
					imgUrl: share_imgUrl,
					trigger: function(res) {},
					success: function(res) {},
					cancel: function(res) {},
					fail: function(res) {}
				});
			});
			wx.error(function(res) {});
		}
	});
}

function toWxShare(shareObj, callback) {
	var share_thisUrl = location.href.split("#")[0];
	var share_title = shareObj.share_title;
	var share_desc = shareObj.share_desc;
	var share_imgUrl = shareObj.share_imgUrl;
	var share_urlShare = shareObj.share_urlShare;
	$.ajax({
		type: "post",
		url: "//m.01zhuanche.com/touch/wxshareMsg/msgn",
		dataType: "json",
		data: {
			"url": share_thisUrl
		},
		success: function(res) {
			wx.config({
				debug: false,
				appId: res.appId,
				timestamp: res.timestamp,
				nonceStr: res.nonceStr,
				signature: res.signature,
				jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
			});
			wx.ready(function() {
				wx.onMenuShareTimeline({
					title: share_title,
					link: share_urlShare,
					imgUrl: share_imgUrl,
					success: function(res) {
						console.log(res);
						if (callback && (typeof(callback) === "function")) {
							callback(res);
						} else {
							console.log(res.msg);
							return res;
						}
					},
					cancel: function() {}
				});
				wx.onMenuShareAppMessage({
					title: share_title,
					desc: share_desc,
					link: share_urlShare,
					imgUrl: share_imgUrl,
					trigger: function(res) {},
					success: function(res) {
						console.log(res);
						if (callback && (typeof(callback) === "function")) {
							callback(res);
						} else {
							console.log(res.msg);
							return res;
						}
					},
					cancel: function(res) {},
					fail: function(res) {}
				});
			});
			wx.error(function(res) {});
		}
	});
}
// var _hmt = _hmt || [];
// (function() {
// 	var hm = document.createElement("script");
// 	hm.src = "//hm.baidu.com/hm.js?44b89a2108eb84a48ec1b4f686af2753";
// 	var s = document.getElementsByTagName("script")[0];
// 	s.parentNode.insertBefore(hm, s);
// })();

function baiduEvent(eventSta) {
	if (eventSta.sign && eventSta.slogan) {
		_hmt.push(["_trackEvent", eventSta.sign, "click", eventSta.slogan]);
	} else {
		console.log("缺少统计参数");
	}
}

function jumpLink(url, channel) {
	if (url) {
		location.href = url;
	} else {
		location.href = "http://m.01zhuanche.com/?channel=" + channel;
	}
}

function validatePhone(string) {
	var msg, regExp = /^1\d{10}$/;
	if (string) {
		if (regExp.test(string)) {
			return true;
		} else {
			toast("请您输入正确的手机号");
		}
	} else {
		toast("请您输入手机号");
	}
}

function checkPhone(string) {
	var msg, regExp = /^1\d{10}$/;
	if (string) {
		if (regExp.test(string)) {
			return true;
		} else {
			// message("请您输入正确的手机号");
			layer.open({
				content: '请您输入正确的手机号'
				,shade: true
				,time: 3 //2秒后自动关闭
			})
		}
	} else {
		// message("请您输入手机号");
		layer.open({
			content: '请您输入手机号'
			,shade: true
			,time: 3 //2秒后自动关闭
		})
	}
}

function checkCode(string) {
	var regExp = /\d{4,6}/;
	if (string) {
		if (regExp.test(string)) {
			return true;
		} else {
			// message("请您输入正确的验证码");
			layer.open({
				content: '请您输入正确的验证码'
				,shade: true
				,time: 3 //2秒后自动关闭
			})
		}
	} else {
		// message("请您输入验证码");
		layer.open({
			content: '请您输入验证码'
			,shade: true
			,time: 3 //2秒后自动关闭
		})
	}
}

function crossRequest(url, type, data, callback) {
	if (url && type) {
		$.ajax({
			url: url,
			type: type,
			data: data,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(res) {
				if (callback && (typeof(callback) === "function")) {
					callback(res);
				} else {
					console.log(res.msg);
					return res;
				}
			},
			error: function(res) {
				// message(res.msg);
				layer.open({
					content: res.msg
					,shade: true
					,time: 3 //2秒后自动关闭
				})
			}
		});
	}
}

function sendRequest(url, type, data, callback) {
	if (url && type) {
		$.ajax({
			url: url,
			type: type,
			data: data,
			success: function(res) {
				if (callback && (typeof(callback) === "function")) {
					callback(res);
				} else {
					console.log(res.msg);
					return res;
				}
			},
			error: function(res) {
				// message(res.msg);
				layer.open({
					content: res.msg
					,shade: true
					,time: 3 //2秒后自动关闭
				})
			}
		});
	}
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

function isInApp() {
	var ua = navigator.userAgent;
	if (ua.indexOf("SQYC") < 0) {
		return false;
	} else {
		return true;
	}
}(function(o) {
	try {
		document.domain = "01zhuanche.com";
	} catch (e) {}
	var domainName = ".01zhuanche.com";
	o.addCookie = function(cname, cvalue, exdays, secureFlag, othenDomainName) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		var strCookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
		strCookie += "; path=/";
		if (othenDomainName == null || othenDomainName == typeof("undifined")) {
			strCookie += "; domain=" + domainName;
		} else {
			strCookie += "; domain=" + othenDomainName;
		}
		if (typeof secureFlag != "undefined" && secureFlag) {
			strCookie += "; secure";
		}
		document.cookie = strCookie;
	};
	o.getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) != -1) {
				return decodeURIComponent(c.substring(name.length, c.length));
			}
		}
		return null;
	};
	o.clearCookie = function(name) {
		addCookie(name, "", -1);
	};
})(window);

function toast(string) {
	if (string) {
		var viewport, toast, text;
		viewport = document.getElementsByClassName("viewport")[0];
		toast = document.getElementById("toast");
		if (toast) {
			console.log("#toast 已存在");
		} else {
			toast = document.createElement("div");
			toast.setAttribute("id", "toast");
			var html = '<div class="layer"><div class="toast">' + string + "</div></div>";
			toast.innerHTML = html;
			viewport.appendChild(toast);
			toast.setAttribute("style", "display:block;");
			var timer = setTimeout(function() {
				viewport.removeChild(toast);
				clearTimeout(timer);
			}, 3000);
		}
	}
}

function message(string) {
	if (string) {
		var viewport, message, text;
		viewport = document.getElementsByClassName("viewport")[0];
		message = document.getElementById("message");
		if (message) {
			var i = Math.round(Math.random() * 10);
			message = document.createElement("div");
			message.setAttribute("id", "newMessage" + i);
		} else {
			message = document.createElement("div");
			message.setAttribute("id", "message");
		}
		var html = '<div class="layer black_bg"><div id="message_con" class="message">' + string + "</div></div>";
		message.innerHTML = html;
		viewport.appendChild(message);
		message.setAttribute("style", "display:block;");
		var timer = setTimeout(function() {
			viewport.removeChild(message);
			clearTimeout(timer);
		}, 3000);
	} else {
		console.log("参数不可为空");
	}
}

function showDialog(string, title, download) {
	if (string) {
		var viewport, dialog, dialogBtn;
		viewport = document.getElementsByClassName("viewport")[0];
		dialog = document.getElementById("dialog");
		if (dialog) {
			console.log("对话框已存在");
		} else {
			dialog = document.createElement("div");
			dialog.setAttribute("id", "dialog");
			var html = '<div class="dialog layer black_bg"><div class="dialog_box">';
			if (title) {
				html += '<div class="dialog_title">' + title + "</div>";
			}
			html += ' <div class="dialog_content">' + string + "</div>";
			html += '<div class="dialog_operation">';
			html += '<a class="button dialog_button primary" href="javascript: void(0);">确定</a>';
			if (download) {
				html += '<a class="button dialog_button default" id="dialog_download_app" >下载APP</a>';
			}
			html += "</div></div></div>";
			dialog.innerHTML = html;
			viewport.appendChild(dialog);
			dialogBtn = dialog.getElementsByClassName("dialog_button")[0];
			dialog.setAttribute("style", "display:block;");
			dialogBtn.onclick = function(event) {
				viewport.removeChild(dialog);
			};
			if (download) {
				var downloadBtn = document.getElementById("dialog_download_app");
				downloadBtn.onclick = function() {
					jumpLink(download, channel);
				};
			}
		}
	} else {
		console.log("参数不可以为空");
	}
}

function checkEnv() {
	var ua = window.navigator.userAgent.toLowerCase();
	var environment = "";
	if (!isInApp()) {
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			environment = "Weixin";
		} else {
			if (ua.match(/AlipayClient/i) == "alipayclient") {
				environment = "Alipay";
			} else {
				environment = "other";
			}
		}
	} else {
		environment = "app";
	}
	return environment;
}
