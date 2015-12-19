'use strict'

function Machine(power) {
    this._enabled = false;

    var self = this;

    this.enable = function() {
        // используем внешнюю переменную вместо this
        self._enabled = true;
    };

    this.disable = function() {
        self._enabled = false;
    };
}

function CoffeeMachine(power, capacity) {
    Machine.apply(this, arguments);

    let self = this;
    let waterAmount = 0;

    this.setWaterAmount = function(amount) {
        if (amount < 0) {
            throw new Error('Значение должно быть положительным');
        }

        if (amount > capacity) {
            throw  new Error(`Нельзя залить воды больше чем ${capacity}`);
        }

        waterAmount = amount;
    }

    this.getWaterAmount = function() {
        return waterAmount;
    }

    //переопределение родительского метода
    var parentEnable = this.enable;
    this.enable = function() {
        parentEnable(); // теперь можно вызывать как угодно, this не важен
        this.run();
    }

    this.run = function() {
        console.log(`(enabled = ${this._enabled})| вкл. время кипячения ${getBoilTime()}`);
        setTimeout(onReady, getBoilTime());
    }

    const WATER_HEAT_CAPACITY = 4200;
    function getBoilTime() {
        return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

    function onReady() {
        self.disable();
        console.log(`(enabled = ${self._enabled})| выкл. кофе готово`);
    }
}

var coffeeMachine = new CoffeeMachine(1000, 2000);

coffeeMachine.setWaterAmount(20);
coffeeMachine.enable();