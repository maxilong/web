var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'tom';
console.log(sayHello(user));
var a = {
    name: 'lala',
    sex: 'man',
    id: 123
};
var bb = [1, 2, 3, 4, 5, '6'];
function cc(labelObj) {
    console.log(labelObj.label);
}
var obj = { size: 6, label: 'llalalala' };
cc(obj);
var dd = [1, '2', true,];
console.log(dd);
function ee(a, b, c) {
    return a + b + c;
}
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
function ff(a) {
    if (a.length) {
        console.log(a.length);
    }
    else {
        console.log(a.toString().length);
    }
    return 1;
}
ff(111);
var Days;
(function (Days) {
    Days[Days["Sun"] = "Sun".length] = "Sun";
    Days[Days["Mon"] = 1.5] = "Mon";
    Days[Days["Tue"] = 2.5] = "Tue";
    Days[Days["Wed"] = 3.5] = "Wed";
    Days[Days["Thu"] = 4.5] = "Thu";
    Days[Days["Fri"] = 5.5] = "Fri";
    Days[Days["Sat"] = "S"] = "Sat";
})(Days || (Days = {}));
;
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
// console.log(Week.fir);
// console.log(jquery('#wrapper'))
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var b = new Animal('lala');
console.log(b.name);
var hh = function (str, max) {
    return (str === max);
};
var yy = hh('aa', 'bb');
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.alert = function () {
        console.log('Car alert');
    };
    Car.prototype.lightOn = function () {
        console.log('Car lightOn');
    };
    Car.prototype.lightOff = function () {
        console.log('Car lightOff');
    };
    return Car;
}());
var bmCar = /** @class */ (function (_super) {
    __extends(bmCar, _super);
    function bmCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bmCar.prototype.chair = function () {
        console.log('zhenpi zuoyi');
    };
    return bmCar;
}(Car));
var car = new Car();
var bmcar = new bmCar();
bmcar.chair();
bmcar.alert();
bmcar.lightOn();
console.log(bmcar);
function cccc(bbbb) {
    if (bbbb.length) {
        return bbbb.length;
    }
    else {
        return bbbb.toString.length;
    }
}
cccc(12344);
var aaaaaaa = 'fdgfds';
var bbbbbbb = aaaaaaa.length;
function sum(arr) {
    var num = 0;
    for (var i = 0; i < arr.length; i++) {
        var newarr = arr[i];
        for (var i = 0; i < newarr.length; i++) {
            num += newarr[i];
        }
    }
    return num;
}
var arr4 = [
    [1, 2, 3],
    [4, 5, 6]
];
console.log(sum(arr4));
var Animals = /** @class */ (function () {
    function Animals(age) {
        this.age = age;
    }
    Animals.prototype.saySix = function () {
        if (this.age) {
            console.log("my ages is " + this.age + " year old");
        }
        else {
            console.log(Animals.six);
        }
    };
    Animals.six = 'lalala';
    return Animals;
}());
var animals = Animals;
animals.six = 'heiheihei';
var animals1 = new animals();
animals1.saySix();
function changeName(name) {
    console.log(name.length);
    return name;
}
function extend(first, second) {
    var resuld = {};
    for (var id in first) {
        resuld[id] = first[id];
    }
    for (var id in second) {
        if (!resuld.hasOwnProperty(id)) {
            resuld[id] = second[id];
        }
    }
    return resuld;
}
var Persons = /** @class */ (function () {
    function Persons(name) {
        this.name = name;
    }
    return Persons;
}());
var Foors = /** @class */ (function () {
    function Foors() {
    }
    Foors.prototype.log = function () {
        console.log('hahaha');
        return 'haha+';
    };
    return Foors;
}());
var vvvv = extend(new Persons('hahaha'), new Foors());
console.log(vvvv.name, vvvv.log());
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
console.log(getName(function mm() { return 'lalala'; }));
// type Alias = { num: number }
// interface Interface {
//     num: number;
// }
// declare function aliased(arg: Alias): Alias;
// declare function interfaced(arg: Interface): Interface;
var obje = {
    name: 'tom',
    getting: function () {
        console.log('hello', this.name);
    }
};
var getting = obje.getting.bind(obje);
getting();
