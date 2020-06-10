var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  [Symbol.iterator]: function (){
    var curIndex = 0;
    var next = () => {
      return {
        value: this[curIndex],
        done: this.length === ++ curIndex
      }
    }
    return {
      next
    }
  }
}

// 简化为 generator
var obj1 = {
  0: 'a',
  1: 'b',
  2: 'c',
  [Symbol.iterator]: function *(){
    let curIndex = 0;
    while(curIndex != this.length){
      yield this[curIndex];
      curIndex++;
    }
  }
}

function myIterator(o){
  var curIndex = 0;
  var next = () => {
    return {
      value: o[curIndex],
      done: o.length === ++ curIndex
    }
  }
  return {
    next
  }
}