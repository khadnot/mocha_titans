async function pageLoaded() {
    const foods = await getFoods();
    const foodDiv = document.getElementById('food-items');
    foods.forEach(food => {
        const button = document.createElement('button');
        button.innerText = food;
        button.onclick = addFoodToCart.bind(null, food);
        foodDiv.appendChild(button);
    });
}

function addFoodToCart(food) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(food);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${food} added to cart!`);
}

async function getFoods() {
    const response = await fetch('../items.json');
    const data = await response.json();
    return data.food;
}