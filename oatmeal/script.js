async function pageLoaded() {
    console.log("page loaded")
    const pastries = await getOatmeal();
    for(let i = 0; i < pastries.length; i++) {
        const item = pastries[i];
        const button = document.createElement("button");
        button.innerText = item;
        document.body.appendChild(button);
        button.onclick = addOatmealToCart.bind(null, item);
    }
    
}

function addOatmealToCart(item) {
    const currentCart = document.cookie.split('=')[1];
    if (document.cookie == "cart=") {
        document.cookie = 'cart=' + item + "; path=/";
    } else {
        document.cookie = 'cart=' + currentCart + ',' + item + "; path=/";
    }
    console.log(document.cookie);
}

function clearCart() {
    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = 'cart=; path=/';
    console.log("cart cleared");
}

async function getOatmeal() {
    const response = await fetch('../items.json');
    const data = await response.json();
    return data.oatmeal;
}