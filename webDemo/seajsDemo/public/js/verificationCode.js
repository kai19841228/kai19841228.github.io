function showMsgCode(phone, api, callback) {
	if (phone && api) {
		var msgCodeLayer = document.getElementById("msgCodeLayer");
		if (msgCodeLayer) {
			console.log("页面已存在id为msgCodeLayer的元素");
		} else {
			sendMsg(phone, api);
		}
	} else {
		console.log("错误：缺失参数");
	}

	function makeLayer() {
		var viewport, msgCodeLayer, html;
		viewport = document.getElementsByClassName("viewport")[0];
		msgCodeLayer = document.getElementById("msgCodeLayer");
		msgCodeLayer = document.createElement("div");
		msgCodeLayer.setAttribute("id", "msgCodeLayer");
		html = '<div class="layer dialog black_bg">';
		html += '<div class="dialog_box">';
		html += '<div class="dialog_title">验证码</div>';
		html += '<div class="dialog_content">';
		html += '<div class="msg_form">';
		html += '<input type="text" id="codeInput" maxlength="4" class="input" placeholder="输入验证码">';
		html += '<a  id="msgBtn" class="button primary msgBtn">获取验证码</a>';
		html += "</div></div>";
		html += '<div class="dialog_operation">';
		html += '<a class="button dialog_button submit primary" id="msgSubmit" href="javascript: void(0);">确定</a>';
		html += "</div></div></div>";
		msgCodeLayer.innerHTML = html;
		viewport.appendChild(msgCodeLayer);
		msgCodeLayer.setAttribute("style", "display:block;");
		var msgBtn = document.getElementById("msgBtn");
		msgBtn.onclick = function(event) {
			sendMsg(phone, api, "msgBtn");
		};
		var msgSubmit = document.getElementById("msgSubmit");
		msgSubmit.onclick = function(event) {
			var code = document.getElementById("codeInput").value;
			if (checkCode(code)) {
				callback(code);
				viewport.removeChild(msgCodeLayer);
			}
		};
	}

	function sendMsg(phone, msgApi, btnId) {
		var msgBtn, btnClass;
		var data = {
			"phone": phone
		};
		sendRequest(msgApi, "post", data, function(res) {
			if (res.code == 619) {
				if (!btnId) {
					makeLayer();
					msgBtn = document.getElementById("msgBtn");
					btnClass = msgBtn.getAttribute("class");
				} else {
					toast(res.msg);
					msgBtn = document.getElementById(btnId);
				}
				btnClass = msgBtn.getAttribute("class");
				msgBtn.setAttribute("class", btnClass + " is_disabled");
				timeCounter("msgBtn", 90, "获取验证码");
			} else {
				if (res.code == 612) {
					toast(res.msg);
					return false;
				} else {
					toast("请您输入正确的手机号");
					return false;
				}
			}
		});
	}

	function timeCounter(id, num, string) {
		var el = document.getElementById(id);
		var seconds = num;
		var myInterval = setInterval(function() {
			if (seconds > 0) {
				el.innerHTML = seconds + "S";
				seconds--;
			} else {
				clearInterval(myInterval);
				el.setAttribute("class", "button primary msgBtn");
				el.innerHTML = string;
			}
		}, 1000);
	}

	function checkCode(value) {
		var regExp = /\d{4,6}/;
		if (value) {
			if (regExp.test(value)) {
				return true;
			} else {
				toast("请输入正确的验证码");
			}
		} else {
			toast("请输入验证码");
		}
	}
}