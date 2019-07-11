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
// window.addEventListener('load', function () {
//   // 首先，让我们检查我们是否有权限发出通知
//   // 如果没有，我们就请求获得权限
//   if (window.Notification && Notification.permission !== "granted") {
//     Notification.requestPermission(function (status) {
//       if (Notification.permission !== status) {
//         Notification.permission = status;
//       }
//     });
//   }

//   var button = document.getElementsByTagName('button')[0];

//   button.addEventListener('click', function () {
//     // 如果用户同意就创建一个通知
//     if (window.Notification && Notification.permission === "granted") {
//       var n = new Notification("Hi!");
//     }

//     // 如果用户没有选择是否显示通知
//     // 注：因为在 Chrome 中我们无法确定 permission 属性是否有值，因此
//     // 检查该属性的值是否是 "default" 是不安全的。
//     else if (window.Notification && Notification.permission !== "denied") {
//       Notification.requestPermission(function (status) {
//         if (Notification.permission !== status) {
//           Notification.permission = status;
//         }

//         // 如果用户同意了
//         if (status === "granted") {
//           var n = new Notification("Hi!");
//         }

//         // 否则，我们可以让步的使用常规模态的 alert
//         else {
//           alert("Hi!");
//         }
//       });
//     }

//     // 如果用户拒绝接受通知
//     else {
//       // 我们可以让步的使用常规模态的 alert
//       alert("Hi!");
//     }
//   });
// });

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
} else {
  // var db;
  // var request = indexedDB.open("MyTestDatabase");
  // const customerData = [
  //   { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  //   { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
  // ];
  // request.onerror = function(event) {
  //   alert("Why didn't you allow my web app to use IndexedDB?!");
  // };
  // request.onsuccess = function(event) {
  //   db = event.target.result;
  // };
  // request.onupgradeneeded = function(event) {
  //   var db = event.target.result;

  //   // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
  //   // 因为 ssn 可以保证是不重复的，用数据结构的ssn为主键。
  //   var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  //   // autoIncrement : true,自增的一个数字主键
  //   // var objectStore = db.createObjectStore("customers", { autoIncrement : true });

  //   // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
  //   objectStore.createIndex("name", "name", { unique: false });

  //   // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
  //   objectStore.createIndex("email", "email", { unique: true });

  //   // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
  //   objectStore.transaction.oncomplete = function(event) {
  //     // 将数据保存到新创建的对象仓库
  //     var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
  //     customerData.forEach(function(customer) {
  //       customerObjectStore.add(customer);
  //     });
  //   };
  // };

  // 读取数据库数据
  // var transaction = db.transaction(["customers"]);
  // var objectStore = transaction.objectStore("customers");
  // var request = objectStore.get("444-44-4444");
  // request.onerror = function(event) {
  //   // 错误处理!
  // };
  // request.onsuccess = function(event) {
  //   // 对 request.result 做些操作！
  //   console.log(event)
  //   alert("Name for SSN 444-44-4444 is " + request.result);
  // };
  // 简写方式
  // db.transaction("customers").objectStore("customers").get("444-44-4444").onsuccess = function(event) {
  //   alert("Name for SSN 444-44-4444 is " + event.target);
  // };

  // 使用索引查找，如果没有索引你将得到 DOMException
  // setTimeout(function() {
  //   var index = db.transaction("customers").objectStore("customers").index("name");
  //   index.get("Donna").onsuccess = function(event) {
  //     // alert("Donna's SSN is " + event.target.result.ssn);
  //     console.log(event)
  //   };
  // },3000)
}
