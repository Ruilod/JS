'use strict'
function transform(num) {
    let detailed = {};

    if (num < 1000 & num >= 0) {
        let splittedNum = String(num).split('');
        while (splittedNum.length < 3) {
            splittedNum.unshift(0)
        }

        detailed = {
            'единицы': +splittedNum[2],
            'десятки': +splittedNum[1],
            'сотни': +splittedNum[0]
        }

        return detailed;

    }

    console.log('Число превышает 999 или меньше 0');
    return detailed;
}

console.log(transform(927))