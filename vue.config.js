const path = require('path')  //引入path模块

function resolve(dir) {
  return path.join(__dirname, dir)  //path.join(__dirname)设置绝对路径
}

module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),  //主目录
        '@assets': resolve('src/assets'),  //图片
      }
    }
  },
  
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  }
}