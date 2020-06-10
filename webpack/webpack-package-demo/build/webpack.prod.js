const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// 用的是Commonjs 导出格式
const prodConfig = {

  mode: 'production',
  
  devtool: 'cheap-module-source-map',  
 
  // devServer:{
  //   proxy:{ // 用来跨域的
  //     '/api':{ // 配置跨域
  //       changeOrigin: true, // 开启跨域
  //       target: 'http://localhost:3000', // 跨域的目标地址 
  //       pathRewrite: {
  //         "^/api": ""
  //       } 
  //     }
  //   },
  // },
}
module.exports = merge(commonConfig,prodConfig);
