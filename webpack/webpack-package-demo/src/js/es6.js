// import "@babel/pollyfill";  //配合babel-lader进行一些高级语法转低级语法的弥补(一些低版本浏览器不存在的特性),而事实上我们配置了"useBuiltIns": "usage" 后会自动引入到业务代码，业务代码中我们不用手动引入！
// @babel/polly-fill"在window全局上绑定了变量

const arr = [
  new Promise(()=>{}),
  new Promise(()=>{})
]
// arr.map(item => {
//   console.log(item);
// })
export const add = (a , b) => {
  console.log( a + b );
}
export const change = (c) => {
  console.log( c.toString() );
}