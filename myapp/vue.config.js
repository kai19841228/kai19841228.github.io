const baseUrl = '/'
module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部,
  // 例如 https://www.my-app.com/
  // 如果你的应用部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如将你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 '/my-app/'
  // baseUrl: "/", // 构建好的文件输出到哪里
  publicPath: "/",
  outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
  lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
  transpileDependencies: [
    /* string or regex */
  ], // 是否为生产环境构建生成sourceMap?

  productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {}, // CSS 相关选项
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    extract: true, // 允许生成 CSS source maps?
    sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
    modules: false
  }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

  parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

  pwa: {
    name: '麦卡出行',
    themeColor: '#ff8400',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // workboxPluginMode: 'GenerateSW',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }, // configure webpack-dev-server behavior
  devServer: {
    open: true,
    disableHostCheck: false,
    host: "0.0.0.0",
    port: 8088,
    https: false,
    hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {
      '/api': {
        //target: 'http://192.168.100.198:8082/myCar-Rest/',
        // target: 'https://driver.imycargo.com/api/',
        target: 'http://dev.rest-h5.imycargo.com/api/',
        changeOrigin: true,     //开启代理
        pathRewrite: {
              '^/api': ''
        }
      }
    }, // string | Object
    before: function(app) {
      // const base = baseUrl.replace(/\/+$/, '')
      // app.get(`${base}/:page/*`, function(req, res, next) {
      //   if (['index', 'home'].includes(req.params.page)) {
      //     req.url = `${base}/${req.params.page}/`;
      //     next('route');
      //   } else {
      //     next();
      //   }
      // })
    }
  }, // 第三方插件配置

  pluginOptions: {
    // ...
  },
  // https://www.cnblogs.com/guiltyWay/p/10320653.html 多页面配置
  // https://blog.csdn.net/Tomwildboar/article/details/88979023 多页面配置
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '练习',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    home: {
      // page 的入口
      entry: 'src/home/main.js',
      // 模板来源
      template: 'public/home.html',
      // 在 dist/index.html 的输出
      filename: 'home.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '练home习',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'home']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/home/main.js'
  }
};