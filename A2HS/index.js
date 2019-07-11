const images = ['fox1','fox2','fox3','fox4'];
const imgElem = document.querySelector('img');

function randomValueFromArray(array) {
  let randomNo =  Math.floor(Math.random() * array.length);
  return array[randomNo];
}

setInterval(function() {
  let randomChoice = randomValueFromArray(images);
  imgElem.src = 'images/' + randomChoice + '.jpg';
}, 2000)

// 注册服务以控制使网站脱机工作

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/A2HS/sw.js')
           .then(function() { console.log('Service Worker 注册成功'); });
}

// 处理桌面上安装提示的代码

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});

// 通常你应在你的应用首次初始化的时候请求显示通知的权限
window.addEventListener('load', function () {
  Notification.requestPermission(function (status) {
    // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
    if (Notification.permission !== status) {
      Notification.permission = status;
    }
  });
});

var n = new Notification("Hi!");
n.onshow = function () { 
  setTimeout(n.close.bind(n), 5000); 
}
