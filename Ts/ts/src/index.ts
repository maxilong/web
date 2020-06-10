function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = 'tom';
console.log(sayHello(user));
interface Person{
  name:string;
  age?:number;
  [perName:string]:any;
  readonly id:number
}
let a:Person = {
  name: 'lala',
  sex: 'man',
  id: 123
}
let bb:(number | string)[] = [1,2,3,4,5,'6'];

function cc(labelObj:{label:string}){
  console.log(labelObj.label);
}
let obj = {size:6,label:'llalalala'};

cc(obj)

let dd:any[] = [1,'2',true,];
console.log(dd);

function ee(a:number,b?:number,c?:number):number{
  return a+b+c
}

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

function ff(a:number|string):number{
  if((<string>a).length){
    console.log((<string>a).length)
  }else{
    console.log((<string>a).toString().length)
  }
  return 1
}
ff(111);

declare var jquery:(selector:string) => any;

declare const enum Directions {
  Up,
  Down,
  Left,
  Right
}
enum Days{Sun = "Sun".length, Mon = 1.5, Tue, Wed, Thu, Fri, Sat = <any>"S"};

const enum Week{fir, sec, ser}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// console.log(Week.fir);
// console.log(jquery('#wrapper'))
class Animal {
  public name:string
  public constructor(name:string){
    this.name = name
  }
}
let b: Animal = new Animal('lala');
console.log(b.name);

interface Alerts{
  (str: string, max: string): boolean
}
let hh: Alerts = function (str: string, max: string){
  return (str === max)
}
let yy = hh('aa','bb');

interface Alarm{
  alert()
}
interface Light{
  lightOn();
  lightOff();
}
class Car implements Alarm, Light{
  alert(){
    console.log('Car alert')
  }
  lightOn(){
    console.log('Car lightOn')
  }
  lightOff(){
    console.log('Car lightOff')
  }
}
class bmCar extends Car{
  chair(){
    console.log('zhenpi zuoyi')
  }
}
let car = new Car();
let bmcar = new bmCar();
bmcar.chair();
bmcar.alert();
bmcar.lightOn();
console.log(bmcar);
interface Search{
  (source: string, subString: string): boolean;
}
interface Door{
  six: string;
  width: number;
  height: number;
  color: string;
  (six:string, color: string): boolean;
}
function cccc(bbbb:string | number):number{
  if((<string>bbbb).length){
    return (<string>bbbb).length;
  }else{
    return (<string>bbbb).toString.length;
  }
}
cccc(12344);

let aaaaaaa:any = 'fdgfds';
let bbbbbbb:number = (<string>aaaaaaa).length;
function sum(arr){
  var num = 0;
  for(var i = 0; i < arr.length; i++){
    var newarr = arr[i];
    for(var i= 0 ; i < newarr.length; i++){
      num += newarr[i];
    }
  }
  return num;
}
var arr4 = [
  [1,2,3],
  [4,5,6]
]
console.log(sum(arr4));

class Animals{
  static six = 'lalala';
  public age: number;
  constructor(age?: number){
    this.age = age;
  }
  saySix():void{
    if(this.age){
      console.log(`my ages is ${this.age} year old`);
    }else{
      console.log(Animals.six);
    }
  }
}
let animals:typeof Animals = Animals;
animals.six = 'heiheihei';

let animals1 = new animals();
animals1.saySix();
interface Lengthwise{
  length:number
}
function changeName<T extends Lengthwise>(name:T):T{
  console.log(name.length);
  return name;
}
function extend<T,U>(first:T, second:U): T & U{
  let resuld = <T & U>{};
  for(let id in first){
    resuld[id] = <any>first[id];
  }
  for(let id in second){
    if(!resuld.hasOwnProperty(id)){
      resuld[id] = <any>second[id];
    }
  }
  return resuld;
}
class Persons{
  public name;
  constructor(name:string){
    this.name = name;
  }
}
interface Foor{
  log():string;
}
class Foors implements Foor{
  log(){
    console.log('hahaha');
    return 'haha+';
  }
}

let vvvv = extend(new Persons('hahaha'), new Foors());
console.log(vvvv.name, vvvv.log());

//类型谓词
// interface Brid{
//   fly():void;
//   say():void;
// }
// interface Fish{
//   swim():void;
//   say():void;
// }

// function nnnn():Brid | Fish{
//   //....
// }
// let zoo = nnnn();
// function isFish(zoo: Fish | Brid):zoo is Fish{
//   return (<Fish>zoo).swim !== undefined;
// }
// if(isFish(zoo)){
//   zoo.swim()
// }else{
//   zoo.fly()
// }

// 类型保护  
// interface Padder{
//   getPaddingString():string;
// }

// class SpacePadding implements Padder{
//   constructor(public aa:number){}
//   getPaddingString(){
//     return Array(this.aa + 1).join(' ');
//   }
// }
// class PaddingString implements Padder{
//   constructor (public aa:string){}
//   getPaddingString(){
//     return this.aa;
//   }
// }

// function getRandomPadder(){
//   return Math.random() > 0.5 ? new SpacePadding(5) : new PaddingString('lala');
// }

// let padder = getRandomPadder();
// if(padder instanceof SpacePadding){
//   console.log(padder);
// }
// if(padder instanceof PaddingString){
//   console.log(padder);
// }

// null 或 undefined的类型保护及断言
// function broken(name: string | null):string{
//   function fixed(){
//     return name!.charAt(0)+'lalalala';
//   }
//   name = name || 'default';
//   return fixed();
// }
// let mmmm = broken(null);
// console.log(mmmm);

// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver):string{
  if(typeof n === 'string'){
    return n;
  }else{
    return n();
  }
}
console.log(getName(function mm(){return 'lalala'}));

// type Alias = { num: number }
// interface Interface {
//     num: number;
// }
// declare function aliased(arg: Alias): Alias;
// declare function interfaced(arg: Interface): Interface;


let obje = {
  name: 'tom',
  getting(){
    console.log('hello',this.name)
  }
}

let getting = obje.getting.bind(obje);
getting();