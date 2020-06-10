const fs = require('fs')
function *test(){
  var a = yield 1;
  console.log(a);
  var b = yield 2;
  console.log(b);
  return 3
}
// var og = test();
// og.next();
// og.next('a');
// og.next('b');

function readFile(path){
  return new Promise((res,rej) => {
    fs.readFile(path,'utf-8',(err,data) => {
      if(data){
        res(data)
      }else {
        rej(err)
      }
    })
  })
}

function *read(){
  let val1 = yield readFile('../assets/fs/name.txt')
  let val2 = yield readFile(val1)
  let val3 = yield readFile(val2)
  return val3
}

function co(oG){
  return new Promise((resolve, reject) => {
    let next = (data) => {
      let {value, done} = oG.next(data);
      if(done){
        resolve(value);
      }else{
        value.then(data => {
          next(data);
        }, reject)
      }
    }
    next();
  })
}

let og = read();
// co 函数 也可以 npm install co -D下载
co(og).then(data => {
  console.log(data);
},err => {
  console.log(err);
})
async function* range(start,end){
  for(i = start; i<= end; i++){
    yield Promise.resolve(i);
  }
}
(async ()=> {
  const gen = aa(1,3);
  for await (const item of gen){
    console.log(item);
  }
})()
