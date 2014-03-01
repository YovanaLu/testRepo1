window.onload = function () {

    var x = document.getElementById("x");
    var y = document.getElementById("y");
    var op = document.getElementById("op");
    var res = document.getElementById("res");
    var errorElem = document.getElementById("error");
    

    var operation, calculator = new Calculator();
    function Calc() {
        try {
            switch (op.value) {
                case "addition":
                    operation = new Addition(x.value, y.value);
                    break;
                case "subtraction":
                    operation = new Subtraction(x.value, y.value);
                    break;
                case "division":
                    operation = new Division(x.value, y.value);
                    break;
                case "multiplication":
                    operation = new Multiplication(x.value, y.value);
                    break;
            }
            calculator.setOperation(operation);
            res.value = calculator.execute();
            errorElem.style.display = "none";
        }
        catch (e) {
            errorElem.innerHTML = e.message;
            errorElem.style.display = "block";
        }
    };
    x.onchange = y.onchange = op.onchange = Calc;
};

function inherit(p) {
    if (p === null) throw TypeError();
    if (Object.create)
        return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};
    f.prototype = p;
    return new f();
};

function Calculator(){
    this.setOperation = function(operation){
        if(!(operation instanceof Operation))
            throw Error("Установлено некорректное действие: " + operation);
        this.operation = operation;
    };
    this.operation;
    this.execute = function(){
        return this.operation.execute();
    };
}

function Operation(x, y){
    var xVal = parseFloat(x);
    var yVal = parseFloat(y);
    if(isNaN(xVal)) 
        throw Error("Установлено некорректное значение: " + x);
    if(isNaN(yVal)) 
        throw Error("Установлено некорректное значение: " + y);
    
    this.x = xVal;
    this.y = yVal;
    this.execute = function(){};
}

function Addition(x, y) {
    Operation.call(this, x, y);
    this.execute = function () {
        return this.x + this.y;
    };
}
Addition.prototype = inherit(Operation.prototype);
Addition.prototype.constructor = Addition;

function Subtraction(x, y) {
    Operation.call(this, x, y);
    this.execute = function () {
        return this.x - this.y;
    };
}
Subtraction.prototype = inherit(Operation.prototype);
Subtraction.prototype.constructor = Subtraction;


function Multiplication(x, y) {
    Operation.call(this, x, y);
    this.execute = function () {
        return this.x * this.y;
    };
}
Multiplication.prototype = inherit(Operation.prototype);
Multiplication.prototype.constructor = Multiplication;

function Division(x, y)
{
    Operation.call(this, x, y);
    this.execute = function(){
        if(this.y === 0)
            throw Error("Делить на нуль нельзя!");
        return this.x / this.y;
    };
}
Division.prototype = inherit(Operation.prototype);
Division.prototype.constructor = Division;