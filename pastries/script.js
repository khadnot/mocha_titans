async function pageLoaded() {
    const pastries = await getPastries();
    const pastriesDiv = document.getElementById('pastries-items');
    pastries.forEach(pastry => {
        const button = document.createElement('button');
        button.innerText = pastry;
        button.onclick = addPastryToCart.bind(null, pastry);
        pastriesDiv.appendChild(button);
    });
}

function addPastryToCart(pastry) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(pastry);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${pastry} added to cart!`);
}

async function getPastries() {
    const response = await fetch('../items.json');
    const data = await response.json();
    return data.pastries;
}