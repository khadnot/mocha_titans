async function pageLoaded() {
    console.log("page loaded")
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
    const size = window.prompt("What size would you like? (s, m, l)");
    if (size != "s" && size != "m" && size != "l") {
        alert("Invalid size. Please enter s, m, or l.");
        return;
    }
    const currentCart = document.cookie.split('=')[1];
    if (document.cookie == "cart=") {
        document.cookie = 'cart=' + size + drink + "; path=/";
    } else {
        document.cookie = 'cart=' + currentCart + ',' + size + drink + "; path=/";
    }
    console.log(document.cookie);
}

function clearCart() {
    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = 'cart=; path=/';
    console.log("cart cleared");
}

async function getDrinks() {
    const response = await fetch('../items.json');
    const data = await response.json();
    return data.drinks;
}