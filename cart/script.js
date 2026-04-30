let totalPrice = 0;

async function pageLoaded() {
    foodData = await getData();
    console.log("page loaded")
    const cartItems = getCartItems();
    for(let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        const p = document.createElement("p");
        size = item.charAt(0);
        item = item.substring(1);
        if (foodData[item] != undefined) {
            totalPrice += foodData[item].sizes[size];
            p.innerText = item + " - $" + foodData[item].sizes[size] + " (size " + size + ")";
        } else {
            item = size + item;
            p.innerText = item;
            totalPrice += 2.50;
            p.innerText += " - $2.50 (Default Food Price)";
        }
        document.body.appendChild(p);
    }
    const subTotal = document.createElement("h3");
    subTotal.innerText = "Subtotal: $" + totalPrice.toFixed(2);
    document.body.appendChild(subTotal);
    const tax = document.createElement("h3");
    tax.innerText = "Tax: $" + (totalPrice * 0.104).toFixed(2);
    document.body.appendChild(tax);
    totalPrice += totalPrice * 0.104;
    const totalPriceElement = document.createElement("h2");
    totalPriceElement.innerText = "Total Price: $" + totalPrice.toFixed(2);
    document.body.appendChild(totalPriceElement);
    const clearButton = document.createElement("button");
    clearButton.innerText = "Checkout";
    clearButton.onclick = clearCart;
    document.body.appendChild(clearButton);
}

function clearCart() {
    document.cookie = 'cart=; path=/';
    console.log("cart cleared");
    location.reload();
}

function getCartItems() {
    const currentCart = document.cookie.split('=')[1];
    if (currentCart) {
        return currentCart.split(',');
    } else {
        return [];
    }
}

async function getData() {
    const response = await fetch('../items.json');
    const data = await response.json();
    return data.foodData;
}