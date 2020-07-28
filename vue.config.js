const path = require('path')  //引入path模块

function resolve(dir) {
  return path.join(__dirname, dir)  //path.join(__dirname)设置绝对路径
}

module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,

  parallel: require('os').cpus().length > 1,
  pwa: {},

  // webpack配置
  chainWebpack: () => {},
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
  
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },

  // webpack-dev-server 相关配置
  devServer: {
    open: true,                                 //配置自动启动浏览器
    // host: 'localhost',
    host: '0.0.0.0',
    port: 8081,                                 // 端口号
    https: false,
    hotOnly: false,                             // https:{type:Boolean}
    // disableHostCheck: true
    proxy: {                                        // 配置跨域
        '/dev':{
            // target:'http://192.168.110.19:8088', //源地址
            target:'http://192.168.110.50:8088', //杨雄欢
            changeOrigin:true,                  //改变源
            ws:true,                            //是否代理websockets
            pathRewrite:{
                '^/dev':''
            }
        }
    },                                           // 配置跨域处理,只有一个代理
    before: app => {}
  },

  // 第三方插件配置
  pluginOptions: {}
}
