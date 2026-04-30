function pageLoaded() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            cartDiv.appendChild(p);
        });
    }
}