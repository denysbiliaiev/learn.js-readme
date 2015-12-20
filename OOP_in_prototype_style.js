'use strict'
//obj.__proto__ == Object.prototype == Array.prototype.__proto__(ссылка на Object.prototype)
//([1,2,3].__proto__.__proto__ == Object.prototype)
//«Псевдоклассом» или, более коротко, «классом», называют функцию-конструктор вместе с её prototype «прототипный стиль ООП»
//прототип — это «резервное хранилище свойств и методов» объекта, автоматически используемое при поиске.
//Прототип задействуется только при чтении свойства. если его нет в обьекте, оно ищется в __proto__.
// Операции присвоения obj.prop = или удаления delete obj.prop совершаются всегда над самим объектом obj. При удалении с прототипа свойство просто скроется

console.log('------------------------------ //наследование');
// --------- Класс-Родитель ------------
// Конструктор родителя пишет свойства конкретного объекта
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

// Методы хранятся в прототипе
Animal.prototype.run = function() {
    alert(this.name + " бежит!")
}

// --------- Класс-потомок -----------
// Конструктор потомка
function Rabbit(name) {
    Animal.apply(this, arguments);
}

// Унаследовать
Rabbit.prototype = Object.create(Animal.prototype);

// Желательно и constructor сохранить
Rabbit.prototype.constructor = Rabbit;

// Методы потомка
Rabbit.prototype.run = function() {
    // Вызов метода родителя внутри своего
    Animal.prototype.run.apply(this);
    alert( this.name + " подпрыгивает!" );
};

// Готово, можно создавать объекты
var rabbit = new Rabbit('Кроль');

rabbit.run();

//Rabbit.prototype.__proto__ = Animal.prototype;//прямой доступ к __proto__ не поддерживается в IE10
//Неправильный вариант: Rabbit.prototype = new Animal


console.log('------------------------------ //obj.__proto__ == Object.prototype == Array.prototype.__proto__');
function A(){
    this.prop1 = 1;
}
function F() {
    this.prop2 = 2;
}

//При создании объекта через new, в его прототип __proto__ записывается ссылка из prototype функции-конструктора.
console.log(F.prototype.constructor);
F.prototype = new A();
console.log(F.prototype.constructor);
F.prototype.constructor = F;

var f = new F();
console.log(f.constructor);
console.log(f.hasOwnProperty('a'));//false свойство 'prop1' не принадлежит самому объекту f

console.log('------------------------------ //Эмуляция Object.create для IE8-');

function inherit(proto) {
    function N() {};
    N.prototype = proto;
    //N.prototype.constructor = N;
    obj = new N();
    return obj;
}

//новый обьект c obj.__proto__ = new A();
var obj = inherit(new A());
console.log(obj.constructor);


console.log('------------------------------ //Object.create(null)');
//Object.create(null) - не имеет прототипа, а значит в нём нет лишних свойств(обьекта)
var data = Object.create(null);//для перечисления

console.log('------------------------------ {} == new Object (есть __proto__)');
// {} = new Object(встроенная функция-конструктор для объектов), ставится __proto__ по prototype конструктора(Object.prototype)
var obj = {};
console.log(obj.__proto__ == Object.prototype);//проверим, правда ли что __proto__ это Object.prototype
console.log(obj.toString == Object.prototype.toString);//метод берётся из прототипа
console.log(obj.toString == Array.prototype.__proto__.toString);//метод берётся из прототипа Object

//[] == new Array();
console.log(Array.prototype.__proto__ == Object.prototype);
console.log([].join == Array.prototype.join);

var user = "Вася"; // создали строку (примитив)

//примитивы
var user = "Вася"; // создали строку (примитив)
console.log(user.constructor);
console.log(user.__proto__ == String.prototype);
user.toUpperCase(); // ВАСЯ
// был создан временный объект new String
// вызван метод
// new String уничтожен, результат возвращён
//user.age = '20';//Cannot assign to read only property 'age' of Вася


console.log('------------------------------ coffeeMachine');

function CoffeeMachine(power) {
    this._power = power;
    this._waterAmount = 0;
}

// свойства и методы для всех объектов класса
CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

CoffeeMachine.prototype.run = function() {
    setTimeout(function() {
        console.log( 'Кофе готов!' );
    }, this.getTimeToBoil());
};

CoffeeMachine.prototype.setWaterAmount = function(amount) {
    this._waterAmount = amount;
};

CoffeeMachine.prototype.getTimeToBoil = function() {
    return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.run();




console.log('------------------------------ Примеси');
//Для добавления примеси в класс — её просто «подмешивают» в прототип.

for(var key in eventMixin) {
    Menu.prototype[key] = eventMixin[key];
}




