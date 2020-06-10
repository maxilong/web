
// vm 表示Due对象  obj表示进行代理的对象  namespace表示data的命名空间
// 数据绑定 捕获修改的数据 从而进行页面内容更新 通过代理方式来监听数据修改
export function constructProxy(vm, obj, namespace){
  // 递归算法
  let proxyObj = null;
  if(obj instanceof Array){
    proxyObj = new Array(obj.length)
    for(let i = 0 ; i < obj.length ; i ++){
      if(obj[i] instanceof Object || obj[i] instanceof Array){
        proxyObj[i] = constructProxy(vm, obj[i], namespace);
      }
    }
    proxyObj = proxyArr(vm, obj, namespace);
  }else if(obj instanceof Object){
    proxyObj = constructObjectProxy(vm, obj, namespace)
  }else{
    throw new Error('error');
  }
  return proxyObj;
}
// 通过Object.defineProperty 进行代理
function constructObjectProxy(vm, obj, namespace){
  let proxyObj = {}; // 通过proxyObj 捕获,代理 obj上面的属性 
  for(let prop in obj){
    Object.defineProperty(proxyObj, prop, {
      configurable: true,
      get(){
        return obj[prop]
      },
      set: function (value){
        console.log(getName(namespace, prop))
        obj[prop] = value
      }
    })
    // vm 捕获,代理 obj上面的属性 捕获
    Object.defineProperty(vm, prop, { 
      configurable: true,
      get(){
        return obj[prop]
      },
      set: function (value){
        console.log(getName(namespace, prop))
        obj[prop] = value
      }
    })
    if(obj[prop] instanceof Object || obj[prop] instanceof Array){
      // 当不知道是否是数组或对象时
      proxyObj[prop] = constructProxy(vm, obj[prop], getName(namespace, prop))
    }
  }
  return proxyObj
}

// 代理数组push, pop等方法
const arrayProto = Array.prototype
function defArrayFunc(obj, func, namespace, vm){
  Object.defineProperty(obj, func, {
    enumerable: true,
    configurable: true,
    value: function (...arg){
      let original = arrayProto[func];
      const result = original.apply(this, arg);
      console.log(getName(namespace, ""));
      return result;
    }
  })
}
// 代理数组
function proxyArr(vm, arr, namespace){
  var obj = {
    eleType: 'Array',
    toString(){
      let result = '';
      for(let i = 0 ; i < arr.length; i++){
        result += arr[i] + ', ';
      }
      return result.substring(0, result.length-2);
    },
    push(){},
    pop(){},
    shift(){},
    unshift(){},
  }
  defArrayFunc.call(vm, obj, 'push', namespace, vm);
  defArrayFunc.call(vm, obj, 'pop', namespace, vm);
  defArrayFunc.call(vm, obj, 'shift', namespace, vm);
  defArrayFunc.call(vm, obj, 'unshift', namespace, vm);
  arr.__proto__ = obj;
  return arr;
}

//封装命名空间规则
function getName(namespace, prop){
  if(namespace == null || namespace == ""){
    return prop;
  }else if(prop == null || prop == ""){
    return namespace
  }else{
    return `${namespace}.${prop}`
  }
}