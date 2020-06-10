// 在webpack中 loader是从右到左执行配置的
const path = require('path');  // 引入node的核心模块path
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 会在打包结束后 在dist目录下自动生成一个html文件 并把打包生成的js引用到这个html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 会在打包之前  把dist目录删除

// 用的是Commonjs 导出格式
module.exports = {

  // 在development  是不支持Tree Shaking  设置production 就直接开始了Tree Shaking  不需要再配置
  mode: 'production', // production 压缩格式  development 没有压缩
  
  devtool: 'cheap-module-source-map',  // 包括loader也检测 并且通过eval的方式精确地映射到每一行代码的 源代码映射关系

  // 入口文件 entry
  entry: {
    index: './src/js/index.js', // key值为 打包后的js文件名  也可以写多个入口，html引入多个打包后的js
  },

  // 在模块中(module) 制定规则(rules) 配置loader
  module: {
    rules:[
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader', // file-loader
          options: {
            name: '[name].[ext]', // 打包后图片的名字是原名字 ext是原文件的格式
            outputPath: 'img/', // 打包后的路径 打包到dist/img/下
            limit: 2048, //如果图片大小  大于2kb 会像file-loader压缩到 路径下  小于会像url-loader 压缩并以base64位放到js里面
          }
        }
      },
      {
        test: /.scss$/, // 配置sass 需要下载node-sass sass-loader
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options:{
              importLoaders: 2 , 
              // 在sass中 @import css 压缩可能走到css-loader 为了让其也执行下面的两个 就配置了 importLoader
              // modules: true,
              // modules 为了防止css冲突  在页面中引入css  再其他模块的js中再创建相同类名会都使用样式 css scope(作用域)
            } 
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader', //可以通过file-loader来打包字体文件
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除在外  如果在node包情况下 就是用
        loader: 'babel-loader',  // babel-loader 只是打通与babel的桥梁 它还需要@babel/preset-env来进行转译
        options: {

          // 针对业务代码  编译过后变量全部在全局上  会造成变量污染全局环境
          presets: [['@babel/preset-env']] 
        }
      }
    ]
  },
  // plugins 可以在webpack运行到某个时刻的时候 帮你做一些事情  类似生命周期
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // 会以这个模板的html  来打包生成后html
    }),
    new CleanWebpackPlugin()
  ],

  // 输出文件 打包文件  output 
  output: {  // 最后打包的文件
    publicPath: '/', // 打包输出在根路径下
    filename: '[name].js',  //打包后的js文件名 name就是entry配置的文件名
    path: path.resolve(__dirname, 'dist') //  __dirname 绝对根路径  dist文件名
  },

 
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