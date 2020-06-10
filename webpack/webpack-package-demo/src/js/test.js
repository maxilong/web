Array.prototype.myFilter = function (fn){
  var arr = [];
  var len = this.length;
  for(var i = 0 ;  i< len; i ++ ){
    if(fn(this[i], i , this)){
      arr.push(this[i]);
    }
  }
  return arr;
}
Array.prototype.myReduce = function (fn,init){
  var prev = this[0];
  var i = 1;
  var len = this.length;
  if(init !== undefined){
    prev = init;
    i = 0;
  }
  for(i; i< len; i++){
    prev = fn(prev, this[i], i, this)
  }
  return prev;
}
Array.prototype.myMap = function (fn){
  var arr = [];
  var len = this.length;
  for(var i = 0; i< len; i++){
    arr.push(fn(this[i], i, this));
  }
}
let arr = [1,2,3,4,5];
let newArr = arr.myFilter((item) => {
  return item > 2;
});
console.log(newArr);
let newArr1 = arr.myReduce((prev,next) => {
  return prev + next;
})
console.log(newArr1);

// let a = {}
// let fn = function () { console.log(this) }
// fn.bind().bind(a)()
var str = "haoanininiiii";
var obj = {};
// for(var j = 0 ; j< str.length; j++){
//   for (var i = j+1; i < str.length; i++) {
//     if (str[j].charCodeAt() == str[i].charCodeAt()) {
//       obj[str[j]]++; //次数加1
//     } else {
//       obj[str[j]] = 1; //若第一次出现，次数记为1
//     }
//   }
// }
for(var i = 0; i < str.length; i++){
  if(obj[str[i]]){
    obj[str[i]] ++;
  }else{
    obj[str[i]] = 1;
  }
}

var arr3 = [];
for(key in obj){
  arr3.push({key: key, value: obj[key]});
}
var f = arr3.reduce((prev,item)=>{
  if(prev.value > item.value){
    return prev;
  }else{
    return item;
  }
})
console.log(f.key, f.value);