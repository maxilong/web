var Header = require('./header.js');
var Silder = require('./silder.js');
var img = require('../img/image1.jpg');
// var Imgs = require('./createImg');
// var style = require('../css/index.scss');
require('../css/index.scss');
 // Tree Shaking 只支持 ES Module  
 // Tree Shaking 解决只引入文件中的一部分 就只打包一部分文件  而不是打包所有文件
import { add } from './es6';

function Img(){
  var imgs = new Image();
  imgs.src = img;
  // imgs.classList.add(style.active);
  imgs.classList.add('active');
  document.body.appendChild(imgs);
}

function Iconts(){
  var icon = document.getElementById('icon');
  icon.innerHTML = '<span class="iconfont iconright"></span>'
} 

function createDiv(){
  var oDiv = document.createElement('div');
  oDiv.innerHTML = '啦啦';
  oDiv.classList.add('title_text');
  document.getElementById('wrapper').appendChild(oDiv);
}

var btn = document.getElementById('btn');
btn.addEventListener('click', function(){
  createDiv();
})

// new Imgs();
// new Iconts();
// new Img();
// new Header();
// new Silder();
// add(1, 2);

// 只有开启 hmr  才有module.hot.accept  为什么css 不用配置呢   因为css-loader已经有这种配置
// 在js中想要启动模块化 且改变一个模块时不影响另一个模块当前渲染的数据  就要用到 hmr  
// vue-loader  自带下面的模块化更新原理 
// if(module.hot){  // 判断是否开始hmr
//   module.hot.accept('./header', () => {  // 通过accept监听到 header改变  同时执行后面的回调函数 
//     document.body.removeChild(document.getElementsByClassName('header')[0]);  
//     // 如果在这里你没有删除之前渲染的 那么后面再执行的会和之前一起展示 所以要把之前的删除掉
//     new Header();
//   })
// }
Father.prototype.sayName = function(){
  console.log('ma');
}
function Father(name){
  this.name = name;
  this.firstName = 'ma';
}

var father = new Father('aa');

Object.setPrototypeOf(Son.prototype, Father.prototype);
function Son(name){
  Father.call(this, name)
}
var son = new Son('xx');
son.sayName();
console.log(son.constructor, father.constructor);


// var obj = {
//   name:'xx',
//   lastName:'xx'
// };
// var obj1 = Object.create(obj);
// console.log(obj.constructor, obj1);

// class Father{
//   constructor (name){
//     this.name = name;
//     this.firstName = 'ma';
//   }
//   sayName () {
//     console.log('xx');
//   }
// }

// let father = new Father('aa');

// class Son extends Father{
//   constructor (name) {
//     super(name);
//   }
// }

// let son = new Son('xx');

// console.log(son.constructor, father.constructor);

// 用es5来对 es6 class 封装
/**
 * 1. 非new执行会报错
 * 2. 原型和静态方法不能枚举
 * 3. 静态方法通过class类名调用的
 */
class Person {
  constructor(){
    this.firstName = 'ma'
  }
  say(){
    console.log('lala');
  }
  *[Symbol.iterator](){
    yield this.firstName
  }
}
let person = new Person();
for(let item of person){
  console.log(item);
}
