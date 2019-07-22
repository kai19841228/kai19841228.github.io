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
// 如果sw不更新，就在sw后追加一个版本

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/A2HS/sw.js?v=3')
           .then(function(reg) {
             console.log('Service Worker 注册成功'); 
             console.log(reg.waiting)
          });
}
//当发现控制自己的 SW 已经发生了变化，那就刷新自己，让新的 SW 控制，就一定能保证数据的一致性。
// 避免页面无限的自我刷新。为了弥补这一点，需要添加一个 flag 判断一下
var refreshing = false
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) {
    return
  }
  refreshing = true;
  window.location.reload();
});

function emitUpdate() {
  var event = document.createEvent('Event');
  event.initEvent('sw.update', true, true);
  window.dispatchEvent(event);
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
