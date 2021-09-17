'use strict'
// Класс корзины
class Cart {
    constructor() {
        this.cart = [];
        // this.countOfArticles = 0;
    }
    addToCart(art) {    // Метод добавления товара в корзину
        // this.countOfArticles++;
        this.cart.push(art);
    }
    removeFromCart(id) {    // Метод удаления товара из корзины(в разработке)
        pass;
    }

    getTotalPrice() {   // Считаем итоговый прайс и кол-во товаров
        return [this.cart.reduce((sum, current) => sum += current.price * current.quantity, 0), this.cart.reduce((sum, current) => sum += current.quantity, 0)]
    }
    showCart() {    // Вывод информации
        this.cart.forEach(el => {
            console.log(el, '\n')
        });
        let total = this.getTotalPrice();
        console.log('Total Price = ', total[0]);
        console.log('Total quantity = ', total[1]);

    }
}

// Класс товара
class Article {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    changeQuantity(corrQuantity) {  // Метод изменения кол-ва товара
        if (corrQuantity) {
            this.quantity += corrQuantity
        }
    }
}


let tshirt = new Article(102, 'Футболка', 500, 2);
let shoes = new Article(89, 'Ботинки', 1500, 1);
let battaries = new Article(193, 'Батарейки', 150, 4);
let cart = new Cart;

cart.addToCart(tshirt);
cart.addToCart(shoes);
cart.addToCart(battaries);
cart.showCart();
tshirt.changeQuantity(3);
battaries.changeQuantity(-1);
cart.showCart();
