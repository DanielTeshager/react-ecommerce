const cart_icon = document.querySelector('.cart-icon');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const empty = document.querySelector('.empty');
const item_count = document.querySelector('.number');
const cart_quantity_badge = document.querySelector('.cart-quantity-badge');

const cart_total = document.querySelector('.cart-total');

const cart_items = document.querySelector('.cart-items');
// const cart = JSON.parse(localStorage.getItem('cart')) || [];
const big_product_image = document.querySelector('.big-product-image');
//item name extraction from header 
const item_name = document.querySelector('.header h1');

//price extraction from 2nd span    
const item_price = parseInt(document.querySelector('.price').children[1].textContent);
//define max quantity
let max_quantity = 9;
const remove_icon = 'http://127.0.0.1:5500/images/icon-delete.svg';

const cart = {'item_name': item_name.textContent, 'item_price': item_price, 'item_quantity': 0, 'image': big_product_image.src};
const current_cart = {
    'item_count': 1,
}

//populate cart
function populateCart(cart) {
    // cart_items.innerHTML = '';
    // cart_total.textContent = '';
    // cart_quantity.textContent = '';
    if (cart.item_quantity == 0) {
        cart_items.innerHTML = '';
        empty.style.display = 'none';
    }
    // quantity.textContent = cart.item_quantity;
    cart.item_quantity += parseInt(item_count.textContent);
    cart_total.textContent = cart.item_quantity;
    cart_quantity_badge.textContent = cart.item_quantity;
    cart_items.innerHTML += `<li class="cart-item">
                            <span class='cart-item-image'><img src='${cart.image}'/></span>
                            <span class='cart-item-detail'>${cart.item_name} $${cart.item_price} X <span class='qty'>${current_cart.item_count}</span> <b>$${cart.item_price * current_cart.item_count}</b></span>
                            <span class='cart-item-remove'><img src='./images/icon-delete.svg'><span>
                            </li>`;
    current_cart.item_count  = 1;
   
}



//toggle cart 
cart_icon.addEventListener('click', function() {
    document.querySelector('.cart-content').classList.toggle('show-cart');
});

//add item to cart


//remove item from cart


//increase quantity
plus.addEventListener('click', function() {
    //check if quantity is less than max quantity
    if(cart.item_quantity < max_quantity) {
    item_count.textContent = parseInt(item_count.textContent) + 1;
    }
    //update cart object
    current_cart.item_count = parseInt(item_count.textContent);

} );

//decrease quantity
minus.addEventListener('click', function() {
    let current_quantity = parseInt(item_count.textContent);
    item_count.textContent = current_quantity == 1 ? 1 : current_quantity - 1;
    //update cart object
    current_cart.item_count = parseInt(item_count.textContent);
} );


//add item to cart
document.querySelector('.add-to-cart').addEventListener('click', function() {
    populateCart(cart);
    //reset quantity
    item_count.textContent = 1;
});


// Identify the elemenet that needs to be deleted from the cart
const cart_items_container = document.querySelector('.cart-items');
cart_items_container.addEventListener('click', function(e) {
    if(e.target.parentElement.classList.contains('cart-item-remove')) {
        e.target.parentElement.parentElement.remove();
        // reduce the quantity of the item in the cart by the amount removed
        cart.item_quantity -= parseInt(e.target.parentElement.parentElement.children[1].children[0].textContent);
        // cart.item_quantity -= 1;
        cart_quantity_badge.textContent = cart.item_quantity;
        cart_total.textContent = cart.item_quantity;
        //show empty cart message
        if(cart.item_quantity == 0) {
            empty.style.display = 'block';
        }
    }
});

