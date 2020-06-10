let fs = require('fs');

// 发布订阅
// 不用promise
// let oStdunt = {};
// let Store = {
//   time: 3,
//   list: [],
//   sunscribe(fuc){
//     this.list.push(fuc);
//   },
//   file(...arg){
//     --this.time === 0 && this.list.map((ele) => {
//       ele.apply(null, arg);
//     })
//   },

// }
// function show(data){
//   console.log(data)
// }
// function show2(data){
//   console.log(data,2)
// }
// fs.readFile('../assets/fs/number.txt','utf-8', (err,data)=>{
//   if(data) oStdunt.number = data
//   Store.file(oStdunt);
// })
// fs.readFile('../assets/fs/name.txt','utf-8', (err,data)=>{
//   if(data) oStdunt.name = data
//   Store.file(oStdunt);
// })
// fs.readFile('../assets/fs/student.txt','utf-8', (err,data)=>{
//   if(data) oStdunt.student = data
//   Store.file(oStdunt);
// })

// Store.sunscribe(show);
// Store.sunscribe(show2);

// 用 promise
// function readFile(data){
//   return new Promise((resolve, reject) => {
//     fs.readFile(data, 'utf-8',(err,data) => {
//       if(data){
//         resolve(data);
//       }
//     })
//   })
// }
// readFile('../assets/fs/name.txt').then((data) => {
//   return readFile(data);
// }).then((data) => {
//   return readFile(data);
// }).then((data) => {
//   console.log(data);
// })

function MyPromise (func){
  var that = this;
  this.status = 'padding';
  this.resolveValue = undefined;
  this.rejectValue = undefined;
  this.resolveCallBackArr = [];
  this.rejectCallBackArr = [];
  function resolve(value){
    if(that.status === 'padding'){
      that.status = 'resolved';
      that.resolveValue = value;
      that.resolveCallBackArr.map(function(ele){
        ele();
      })
    }
  }
  function reject(value){
    if(that.status === 'padding'){
      that.status = 'rejected';
      that.rejectValue = value;
      that.rejectCallBackArr.map(function(ele){
        ele();
      })
    }
  }
  try{
    func(resolve, reject)
  }catch(e){
    reject(e);
  }
}


// resolve || reject 返回的是promise
// 返回的是promise  那么下一个then 会拿到这个promise 执行的resolve||reject执行的值  就是返回的promise.then的value
function returnPromise(nextPromiseValue,res,rej){
  if(nextPromiseValue instanceof MyPromise){
    nextPromiseValue.then(res,rej);
  }else{
    res(nextPromiseValue);
  }
}

// then  异步执行
// throw new Error
// 空的 then()
MyPromise.prototype.then = function(resolve, reject){
  // 判断是否是空then  then().then(()=>{}, ()=>{})  空的then会把上一个then返回的 resolve || reject都传递给下一个then
  if(!resolve){
    resolve = function (value){
      return value;
    }
  }
  if(!reject){
    reject = function (value){
      throw new Error(value);
    }
  }
  var that = this;
  var nextPromise = new MyPromise(function(res, rej){
    if(that.status === 'resolved'){
      // 实现异步及抛出错误
      setTimeout(function(){
        try{
          var nextResolveValue = resolve(that.resolveValue);
          // res(nextResolveValue);
          returnPromise(nextResolveValue,res,rej);
        }catch(e){
          rej(e)
        }
      },0)
    }
    if(that.status === 'rejected'){
      setTimeout(function(){
        try{
          var nextRejectValue = reject(that.rejectValue);
          // res(nextRejectValue);
          returnPromise(nextRejectValue,res,rej);
        }catch(e){
          rej(e)
        }
      },0)
    }
    if(that.status === 'padding'){
      if(resolve){
        that.resolveCallBackArr.push(function (){
          setTimeout(function(){
            try{
              var nextResolveValue = resolve(that.resolveValue);
              // res(nextResolveValue);
              returnPromise(nextResolveValue,res,rej);
            }catch(e){
              rej(e)
            }
          },0)
        });
      }
      if(reject){
        that.rejectCallBackArr.push(function(){
          setTimeout(function(){
            try{
              var nextRejectValue = reject(that.rejectValue);
              // res(nextRejectValue);
              returnPromise(nextRejectValue,res,rej);
            }catch(e){
              rej(e)
            }
          },0)
        })
      }
    }
  })
  return nextPromise;
}

MyPromise.race = function(promiseAarr){
  return new MyPromise(function (resolve,reject) {
    promiseAarr.map(function(promise){
      promise.then(resolve,reject)
    })
  })
}


// let op = new MyPromise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve(0);
//   },2000)
// })
// op.then((value) => {
//   console.log(value, 'ok');
//   return 1;
// },(value)=>{
//   console.log(value, 'no');
//   return 2
// }).then().then((value)=>{
//   console.log(value, 'ok2');
// },(value)=>{
//   console.log(value, 'no2');
// })

// 把 fs上的方法进行promise化 也就是异步化 async
function promisify(func){
  return function (...arg){
    return new Promise((resolve, reject)=>{
      func(...arg, (error,data)=>{
        if(error){
          reject(error);
        }else{
          resolve(data)
        }
      })
    })
  }
}

// 把fs上所有的方法进行promise化 也就是异步化 async
function promisifyAll(obj){
  for(let key in obj){
    let fn = obj[key];
    if(typeof fn === 'function'){
      obj[key+'Async'] = promisify(fn);
    }
  }
}

promisifyAll(fs);

fs.readFileAsync('../assets/fs/name.txt', 'utf-8').then(res => {
  return res;
}).then(res=> {
  return new Promise((resolve, reject) =>{
    fs.readFileAsync(res, 'utf-8').then(res => {
      resolve(res);
    })
  })
}).then(res => {
  fs.readFileAsync(res, 'utf-8').then(res => {
    console.log(res);
  })
})

var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  // [Symbol.iterator]:function () {
  //   let curIndex = 0;
  //   let next = () => {
  //     return {
  //       value: this[curIndex],
  //       done: this.length === ++curIndex,
  //     }
  //   }
  //   return {
  //     next
  //   }
  // }
}
var a = Array.from(obj);
for(let i of a){
  console.log(i);
}