//1. С помощью цикла --while-- вывести все простые числа в промежутке от 0 до 100.\
simple = [2]
for (let i = 3; i <= 100; i++) {
    let check = true;
    let k = 2
    while (k * k <= i) {
        if (i % k === 0) {
            check = false;
            break;
        }
        k++
    }
    if (check === false) {
        continue;
    }
    else {
        simple.push(i);
    }

}
console.log(simple)