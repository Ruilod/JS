function countBasketPrice(basket) {
    let Total = 0;
    for (el of basket) {
        Total += el[1];
    }
    return Total;
}

let basket = [[1, 110], [2, 150], [3, 30], [4, 210]];

console.log(countBasketPrice(basket))