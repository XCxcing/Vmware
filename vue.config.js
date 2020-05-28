const path = require('path')
module.exports = {
  //基本路径     脚手架3.3以后废除了baseUrl
  publicPath: "./",
  //输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // assetsDir: './static',
  devServer: {
    open: true,
    proxy: {//代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
      '/api': {//axios访问 /api ==  target + /api  
        target: 'http://localhost:3000',
        changeOrigin: true,//创建虚拟服务器 
        ws: true  //是否代理websocket
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    }
  }
}
//反向代理：https://www.jianshu.com/p/47c9e65f5a04

//载体：   网络地址          apk，ipa

// 网页：把dist给后端，让后端放服务器上

// 移动端app： 打包app