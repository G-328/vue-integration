const path = require('path')  //引入path模块
// const UglifyJsPlugin = require('uglifujs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)  //path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: "/", //部署应用包时的基本URL
  outputDir: "dist", //生产环境构建文件的目录
  assetsDir: "static", //放置生成的静态资源的目录
  indexPath: "index.html", //生成的index.html的输出路径。也可以是个绝对路径
  filenameHashing: true, //文件名的哈希值，以便更好地控制缓存
  // 在 multi-page(多页面) 模式下构建应用,每个page都应该有一个javascript入口文件
  /* 
    pages: {
      index: {
        entry: "src/main.js",
        template: "public/index.html",
        filename: "index.html",
        title: "TO TO TO",
        chunks: ["chunk-vendors", "chunk-common", "index"]
      },
      subpage: ""
    },
  */
  /* 
    1.是否在开发环境通过eslint-loader在每次保存时lint代码,这个值会在 @vue/cli-plugin-eslint 被安装之后生效
    2.当 lintOnSave 是一个 truthy 的值时，eslint-loader 在开发和生产构建下都会被启用
  */
  lintOnSave: false,
  runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  /* 
    1.如果不需要生产环境source map(源程序映射)，可以将其设置为false,加速生成环境构建
    2.查看压缩后代码对应源码的位置,控制台显示错误位置
  */
  productionSourceMap: process.env.NODE_ENV === "development",
  /* 
    设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
    需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签,直接写在模版 (public/index.html) 中的标签不受影响
  */
  crossorigin: undefined,
  integrity: false, //详情看文档
  configureWebpack: config => {
    config.resolve.alias = {
      // alias: {
        vue$: "vue/dist/vue.esm.js", //加上这一句
        '@': resolve('src'),  //主目录
        '@img': resolve('src/assets/img'),  //图片
        '@assets': resolve('src/assets'),  //图片
      // }
    }
    // config.optimization.minimizer = [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       compress: {
    //         warning: false,
    //         drop_console: true,
    //         drop_debugger: true,
    //         pure_funcs: ["console.log"]
    //       }
    //     }
    //   })
    // ]
  },
  /* 
    configureWebpack: {
      resolve: {
        alias: {
          vue$: "vue/dist/vue.esm.js", //加上这一句
          '@': resolve('src'),  //主目录
          '@img': resolve('src/assets/img'),  //图片
          '@assets': resolve('src/assets'),  //图片
        }
      }
    },
  */
  chainWebpack: config => {
    config.resolve.symlinks(true) //修复HRM

    // 设置 svg-sprite-loader
    // config.module
    //   .rule("svg")
    //   .exclude.add(resolve("src/icons"))
    //   .end()
    // config.module
    //   .rule("icons")
    //   .test(/\.svg$/)
    //   .include.add(resolve("src/icons"))
    //   .end()
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loder")
    //   .option({
    //     symbolId: "icon-[name]"
    //   })
    //   .end()
  },
  css: {
    // true时*.module.[ext]结尾的文件才会被视为CSS Modules模块,设置为false后就不需要加.module了 
    requireModuleExtension: false,
    /* 
      默认：生产环境是true，开发环境下是false
      提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取
      作用：提取.vue文件的css至单独的css样式文件
    */
    // extract: "",
    sourceMap: false, //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能,查看css源代码位置
    // 向css相关的loader传递选项
    // loaderOptions: {
    //   // 这里的会传递给css-loader
    //   css: {

    //   },  
    //   // 这里的会传递给postcss-loader
    //   postcss: {

    //   }
    // }
  },
  /* 
    所有webpack-dev-server的选项都支持,详情看文档
    配置跨域处理,只有一个代理
  */
  devServer: {
    // open: true, //自动打开浏览器
    // host: "0.0.0.0", //
    // port: "8050", //端口号
    // https: false,
    // hotOnly: false, //https: {type: Boolean}
    // disableHostCheck: true,
    proxy: {
      "/dev": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true, //改变源
        ws: true, //是否代理websockets
        pathRewrite: {
          "^/dev": ""
        }
      }
    }
    // before: app => {}
  },
  /* 
    是否为Babel或TypeScript使用thread-loader。
    该选项在系统的CPU有多余一个内核时自动启动，仅用于生产构建
  */
  parallel: require("os").cpus().length > 1,
  pwa: {}, //向PWA插件传递选项
  // 这是一个不进行任何schema验证的对象，因此它可以用来传递任何第三方插件选项
  pluginOptions: {
    // 插件可以作为‘options.pluginOptions.foo’访问这些选项
    // foo: {}
  },
}
