const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// 用的是Commonjs 导出格式
const devConfig = {

  mode: 'development', 
  
  devtool: 'cheap-module-eval-source-map',  
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
  ],
  
  optimization: {  
    usedExports: true  
  },

  devServer:{
    port: '9000', // 开启的端口号
    contentBase: './dist',  // 在dist中开启 服务器
    open: true,   // 默认在浏览器中打开
    hot: true, // webpack模块热更新  一般开启这个  就不用配置 new webpack.HotModuleReplacementPlugin() 
    // hotOnly: true, // 不设置会自动刷新页面 启动hot且改变源代码后不让浏览器自动刷新
    proxy:{ // 用来跨域的
      '/api':{ // 配置跨域
        changeOrigin: true, // 开启跨域
        target: 'http://localhost:3000', // 跨域的目标地址 
        pathRewrite: {
          "^/api": ""
        } 
      }
    },
  },
}
module.exports = merge(commonConfig,devConfig);