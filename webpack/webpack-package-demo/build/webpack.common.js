// 在webpack中 loader是从右到左执行配置的
const path = require('path');  // 引入node的核心模块path
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 会在打包结束后 在dist目录下自动生成一个html文件 并把打包生成的js引用到这个html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 会在打包之前  把dist目录删除

module.exports = {
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
          presets: [['@babel/preset-env',{// 通过配置这个来转译为es5  @babel/preset-env 它不会完全把es6转换为es5 一些变量名和函数及方法还是没办法转换   这是我们就需要借助 @babel/polyfill
            useBuiltIns: 'usage', // 一般用@babel/polyfill 会生成800多k的包 这个包是有所有的es6转es5  我们感觉有点大 可以配置useBuiltIns: 'usage' 可以按需加载es6转es5的包  你使用什么就给你添加什么的包  而且不用再js包里引入@babel/poilfill
            // targets: {  // 如果项目打包大于配置的浏览器环境  那么就不需要打包
              // edge: '17',
              // firefox: '60',
              // chrome: '67',
              // safari: '11.1', 
            // },
          }]] 

          /**
           * 针对你写的相当于库的代码时
           * 需下载 @babel/plugin-transform-runtime   @babel/runtime
           * 为了防止编译值后的 变量污染全局环境   使用transform-runtime 会以闭包的形式来编译的
           */
          // "plugins":[
          //   ["@babel/plugin-transform-runtime"],{
          //    "corejs": 2, // 一般为boolean 如果写2 需下载  @babel/runtime-corejs2
          //    "helpers": true,
          //    "regenerator": true,
          //    "useESModules": false,
          //   }]

        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // 会以这个模板的html  来打包生成后html
    }),
    new CleanWebpackPlugin(['dist'],{
      root: path.resolve(__dirname, '../')
    }),
  ],
  // 输出文件 打包文件  output 
  output: {  // 最后打包的文件
    publicPath: '/', // 打包输出在根路径下
    // publicPath:'http://cdn.com.cn',                   //当js在另一个cdn地址上，这里将作为html引用js地址中拼接成最终的完整访问地址；如：<script src="http://cdn.com.cn/js/index.boundle.js"></script>;
    filename: '[name].js',  //打包后的js文件名 name就是entry配置的文件名
    path: path.resolve(__dirname, '../dist') //  __dirname 绝对根路径  dist文件名
  },
  
}