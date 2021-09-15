// 1
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 в данной строке используется префиксная форма инкремента, присваивание происходит после инкремента
d = b++; alert(d);           // 1 в данной строке используется постфиксная форма инкремента, присваивание происходит до инкремента
c = (2 + ++a); alert(c);     // 5 то же что и в строке 2
d = (2 + b++); alert(d);     // 4 то же что и в строке 3
alert(a);                    // 3 инкрементация влияет на переменную к которой её применяли(применяли 2 раза -> 1+2=3)
alert(b);                    // 3 

//2
var a = 2;
var x = 1 + (a *= 2); //x = 5

//3
var a = 5, b = 3;
if (a >= 0 & b >= 0) {
    console.log(a - b)
}
else if (a < 0 & b < 0) {
    console.log(a * b)
}
else {
    console.log(a + b)
}

//4
var a = 0;
switch (a) {
    case 0:
        console.log(0)
    case 1:
        console.log(1)
    case 2:
        console.log(2)
    case 3:
        console.log(3)
    case 4:
        console.log(4)
    case 5:
        console.log(5)
    case 6:
        console.log(6)
    case 7:
        console.log(7)
    case 8:
        console.log(8)
    case 9:
        console.log(9)
    case 10:
        console.log(10)
    case 11:
        console.log(11)
    case 12:
        console.log(12)
    case 13:
        console.log(13)
    case 14:
        console.log(14)
    case 15:
        console.log(15)
}

//5
function sum(a, b) {
    return a + b
}

function sub(a, b) {
    return a - b
}

function mult(a, b) {
    return a * b
}

function div(a, b) {
    return a / b
}

//6
function mathOperation(arg1, arg2, callback) {
    console.log(callback(arg1, arg2))
}
mathOperation(5, 2, sum)
mathOperation(5, 2, sub)
mathOperation(5, 2, mult)
mathOperation(5, 2, div)

//7
console.log(typeof (null), '|', typeof (0));
if (null >= 0) {
    console.log("omg")
}
// null является отсутствием значения без типа данных, 0 в свою очередь это число
// при сравнении больше или равно возвращается true т.к. логика такого сравнения подразумевает, что если 
// null < 0 === false, значит результат true

//8
function power(val, pow) {
    if (pow == 1)
        return val
    return val * power(val, pow - 1)
}

power(2, 10)