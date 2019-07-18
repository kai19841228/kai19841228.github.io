https://kai19841228.github.io/A2HS/    在谷歌浏览器和苹果浏览器把当前web添加到桌面快捷方式

http://caibaojian.com/mobile-meta.html  meta 标签参考

manifest.webmanifest  webAPP 图标 长短名字 开始地址  参考网址如下
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
"name": "Awesome fox pictures", // name提供完整的应用程序名
"short_name": "Foxes", // short_name提供一个简短的应用程序名称
"start_url": "/A2HS/index.html" // start_url：提供启动添加到主屏幕应用程序时应加载的资产的路径。
"icons": [ // 图标：指定浏览器在不同位置（如在任务切换器上或更重要的主屏幕上）表示应用程序时使用的图标。
"display": "fullscreen", // 显示：全屏显示
"background_color": "purple", // a2hs最相关的是当主屏幕上的应用程序图标被点击并开始加载时显示的启动屏幕
"description": "Shows random fox pictures. Hey, at least it isn't cats.", 应用程序的一个描述

index.js  判断是否支持 serviceWorker 支持注册服务，以控制脱机时工作

sw.js 缓存静态资源和异步结果，把脱机要用到的资源缓存下来，脱机也能正常展示。

cache 缓存 https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage