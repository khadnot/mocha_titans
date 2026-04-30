async function pageLoaded() {
    console.log("help!!!")
    const drinks = await getDrinks();
    for(let i = 0; i < drinks.length; i++) {
        const drink = drinks[i];
        const button = document.createElement("button");
        button.innerText = drink;
        document.body.appendChild(button);
        button.onclick = addDrinkToCart.bind(null, drink);
    }
}

function addDrinkToCart(drink) {
    console.log(`Added ${drink} to cart`);
}

async function getDrinks() {
    const response = await fetch('../items.json');
    const data = await response.json();
    return data.drinks;
}