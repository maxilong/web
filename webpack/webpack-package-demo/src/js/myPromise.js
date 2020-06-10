function MyPromise(func){
  var that = this;
  this.status = 'padding';
  this.resolveValue = undefined;
  this.rejectValue = undefined;
  this.resolveArr = [];
  this.rejectArr = [];
  function resolve(value){
    if(that.status === 'padding'){
      that.status = 'resolved';
      that.resolveValue = value;
      that.resolveArr.map(function(ele){
        ele();
      })
    }
  }
  function reject(value){
    if(that.status === 'padding'){
      that.status = 'rejected';
      that.rejectValue = value;
      that.rejectArr.map(function(ele){
        ele();
      })
    }
  }
  try{
    func(resolve,reject);
  }catch(e){
    reject(e);
  }
}

// 返回的值是promise

function returnPromise(returnValue, res ,rej){
  // 返回的promise.then() 通过外部触发 resolve || reject 来触发 nextPromise的 res 和 rej
  if(returnValue instanceof MyPromise){
    returnValue.then(res,rej)
  }else{
    res(returnValue);
  }
}


// throw new Error try{}catch(e){}
// 空的then() 会把参数往下传  通过判断resolve || reject是否存在  不存在就重置为原来的value || 抛出原来的初五
// 异步  通过setTimeout来实现
// 链式调用  如果return 值 那就把当前获取到的值 通过新的promise成功的传下去
// 如果是promise 下一个then要获取到promise的res rej的值  所以就 returnValue.then(nextPromise res, nextPromise rej)
MyPromise.prototype.then = function(resolve,reject){
  var that = this;
  if(!resolve){
    resolve = function (value){
      return value;
    }
  }
  if(!reject){
    reject = function (value){
      throw new Error(value)
    }
  }
  var nextPromise = new MyPromise(function(res,rej){
    // 同步
    if(that.status === 'resolved'){
      setTimeout(function(){
        try{
          var nextResolveValue = resolve(that.resolveValue);
          returnPromise(nextResolveValue, res, rej);
        }catch(e){
          rej(e);
        }
      },0)
    }
    if(that.status === 'rejected'){
      setTimeout(function(){
        try{
          var nextRejectValue = reject(that.rejectValue);
          returnPromise(nextRejectValue, res, rej);
        }catch(e){
          rej(e);
        }
      },0)
    }
    // 异步
    if(that.status === 'padding'){
      if(resolve){
        that.resolveArr.push(function(){
          setTimeout(function(){
            try{
              var nextResolveValue = resolve(that.resolveValue);
              returnPromise(nextResolveValue, res, rej);
            }catch(e){
              rej(e);
            }
          },0)
        })
      }
      if(reject){
        that.rejectArr.push(function(){
          setTimeout(function(){
            try{
              var nextRejectValue = reject(that.rejectValue);
              returnPromise(nextRejectValue, res, rej);
            }catch(e){
              rej(e);
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

var op = new MyPromise((resolve,reject) => {
  resolve(1);
})
op.then((value)=> {
  console.log(value);
  return 2;
}).then().then((value)=>{
  console.log(value);
})