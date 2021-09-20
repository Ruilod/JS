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
    removeFromCart(art) {    // Метод удаления товара из корзины(в разработке)
        const index = this.cart.indexOf(art);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
    }

    getTotalPrice() {   // Считаем итоговый прайс и кол-во товаров
        return [this.cart.reduce((sum, current) => sum += current.price, 0)]
    }
    showCart() {    // Вывод информации
        const htmlcart = document.querySelector('.cart');
        const oldcart = document.querySelectorAll('.cart_product');

        if (oldcart.length != 0) {
            for (let el of oldcart) {
                htmlcart.removeChild(el);
            }
            htmlcart.removeChild(document.querySelector('.total_price'));
        }

        for (let article of this.cart) {
            let cartProduct = document.createElement('DIV');
            cartProduct.classList.add('cart_product');
            let cartProductInfo = document.createElement('P');
            cartProductInfo.classList.add('cart_product_info');
            cartProductInfo.textContent = article.name + ' цена: ' + article.price;

            let removeFromCart = document.createElement('BUTTON');
            removeFromCart.classList.add('remove_from_cart');
            removeFromCart.textContent = 'Remove From Cart';
            removeFromCart.onclick = function () { cart.removeFromCart(article); cart.showCart() };

            cartProduct.append(cartProductInfo);
            cartProduct.append(removeFromCart);
            htmlcart.append(cartProduct);
        }

        let totalPrice = document.createElement('P');
        totalPrice.classList.add('total_price');
        if (this.cart.length > 0) { totalPrice.textContent = 'Total price: ' + this.getTotalPrice() + '₽'; }
        else { totalPrice.textContent = 'Cart is Empty! ' }
        htmlcart.append(totalPrice);
    }
}

// Класс товара
class Article {
    constructor(id, pic, name, description, price, quantity) {
        this.id = id;
        this.pic = pic;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
    changeQuantity(corrQuantity) {  // Метод изменения кол-ва товара
        if (corrQuantity) {
            this.quantity += corrQuantity
        }
    }
}

function createCard(cart, prod) {
    let productCard = document.createElement('DIV');
    productCard.classList.add('product_card');

    let cardTop = document.createElement('DIV');
    cardTop.classList.add('card_top');

    let productName = document.createElement('H2');
    productName.classList.add('product_name');
    productName.textContent = prod.name;

    let productPic = document.createElement('IMG');
    productPic.classList.add('product_pic');
    productPic.src = prod.pic;

    let productDescription = document.createElement('P');
    productDescription.classList.add('product_description');
    productDescription.textContent = prod.description;

    let cardBottom = document.createElement('DIV');
    cardBottom.classList.add('card_bottom');

    let productPrice = document.createElement('H3');
    productPrice.classList.add('product_price');
    productPrice.textContent = prod.price + '₽';

    let productToCart = document.createElement('BUTTON');
    productToCart.classList.add('product_toCart');
    productToCart.textContent = 'Add to Cart';
    productToCart.id = 'product_toCart';
    productToCart.onclick = function () { cart.addToCart(prod); cart.showCart() };

    cardBottom.appendChild(productPrice);
    cardBottom.appendChild(productToCart);

    cardTop.appendChild(productName);
    cardTop.appendChild(productPic);

    productCard.appendChild(cardTop);
    productCard.appendChild(productDescription);
    productCard.appendChild(cardBottom);
    return productCard
}

let cart = new Cart;

let tshirt = new Article(102, 'products/tshirt.jpg', 'Футболка', 'very cool  tshirt', 500);
let shoes = new Article(89, 'products/shoes.jpg', 'Ботинки', 'Lorem ipsum dolor sit amet, Quasi, consequuntur dicta labore sint eveniet sunt tempora!', 1500);
let battaries = new Article(193, 'products/battaries.jpg', 'Батарейки', 'Lorem ipsum dolor Voluptate sunt doloribus tempora. Quasi,  dicta labore sint eveniet sunt tempora!', 150);
let ps = new Article(111, 'products/ps5.jpg', 'PlayStation 5', 'Lorem ipsum dolor Voluptate sunt doloribus tempora. Quasi,  dicta labore sint eveniet sunt tempora!', 62990)


const rel = document.querySelector('.products_container');
rel.append(createCard(cart, tshirt));
rel.append(createCard(cart, shoes));
rel.append(createCard(cart, battaries));
rel.append(createCard(cart, ps));
