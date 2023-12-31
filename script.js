let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})



let products = [
    {
        id: 1,
        name: 'Mass Cane Floor Plant',
        image: '1.jpg',
        price: 1800
    },
    {
        id: 2,
        name: 'Large Alocasia Regal Shield',
        image: '2.jpg',
        price: 2000
    },
    {
        id: 3,
        name: 'Pencil Cactus',
        image: '3.jpg',
        price: 1900
    },
    {
        id: 4,
        name: 'Stromanthe Triostar',
        image: '4.jpg',
        price: 1000
    },
    {
        id: 5,
        name: 'Grow Anywhere Meyer Lemon Tree',
        image: '5.jpg',
        price: 1400
    },
    {
        id: 6,
        name: 'Potted Bamboo',
        image: '6.jpg',
        price: 1500
    }
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}


function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    <!-- Add a "Remove" button for each item in the cart -->
                    <button onclick="removeFromCart(${key})">Remove</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })


    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function removeFromCart(key) {
    // Remove the item from the cart
    delete listCards[key];

    // Reload the cart to update the display
    reloadCard();
}







function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}