const menu = {
    "Coffee & Espresso": [
        { name: "Espresso", price: 250 },
        { name: "Americano", price: 280 },
        { name: "Cappuccino", price: 320 },
        { name: "Latte", price: 350 },
        { name: "Mocha", price: 380 },
        { name: "Flat White", price: 350 },
        { name: "Macchiato", price: 320 },
        { name: "Cold Brew", price: 380 },
        { name: "Iced Coffee", price: 350 }
    ],
    "Specialty Drinks": [
        { name: "Caramel Macchiato", price: 420 },
        { name: "Vanilla Latte", price: 400 },
        { name: "Hazelnut Mocha", price: 420 },
        { name: "Matcha Latte", price: 450 },
        { name: "Chai Latte", price: 380 },
        { name: "Turmeric Latte", price: 400 }
    ],
    "Desi & Premium Teas": [
        { name: "Milk Tea (Cha)", price: 150 },
        { name: "Masala Tea", price: 180 },
        { name: "Ginger Tea", price: 180 },
        { name: "Green Tea", price: 200 },
        { name: "Lemon Honey Tea", price: 220 },
        { name: "Earl Grey / Jasmine Tea", price: 250 }
    ],
    "Bakery & Snacks": [
        { name: "Butter Toast with Jam/Honey", price: 180 },
        { name: "Paratha with Nutella & Banana", price: 250 },
        { name: "Shingara (3 pcs)", price: 120 },
        { name: "Beef/Chicken Patties", price: 200 },
        { name: "Chocolate Brownie", price: 300 },
        { name: "Cheesecake (Slice)", price: 450 },
        { name: "Croissant", price: 320 }
    ],
    "Cold Beverages": [
        { name: "Iced Matcha Latte", price: 450 },
        { name: "Iced Chai Latte", price: 400 },
        { name: "Fresh Lemonade", price: 250 },
        { name: "Iced Peach/Lemon/Mint Tea", price: 300 },
        { name: "Mango/Strawberry Smoothie", price: 450 }
    ]
};

function generateMenu() {
    let menuContainer = document.getElementById("menu");
    Object.keys(menu).forEach(category => {
        let categoryTitle = document.createElement("h3");
        categoryTitle.innerText = category;
        menuContainer.appendChild(categoryTitle);

        menu[category].forEach(item => {
            let div = document.createElement("div");
            div.classList.add("menu-item");
            div.innerHTML = `<span>${item.name}</span><span>৳${item.price}</span>
            <button onclick='updateQuantity("${item.name}", -1)'>-</button>
            <input type='number' id='${item.name}' min='0' value='0'>
            <button onclick='updateQuantity("${item.name}", 1)'>+</button>`;
            menuContainer.appendChild(div);
        });
    });
}

generateMenu();

function updateQuantity(item, change) {
    let input = document.getElementById(item);
    let newValue = parseInt(input.value) + change;
    if (newValue >= 0) {
        input.value = newValue;
    }
}

function calculateTotal() {
    let total = 0;
    let billDetails = "<h2>Coffee Mania Homna</h2><p>Best Coffee in Town - Freshly Brewed for You!</p><h3>Bill Summary</h3>";
    
    Object.keys(menu).forEach(category => {
        billDetails += `<h4>${category}</h4>`;
        menu[category].forEach(item => {
            let qty = document.getElementById(item.name).value;
            if (qty > 0) {
                total += item.price * qty;
                billDetails += `<p>${item.name} x ${qty} = ৳${item.price * qty}</p>`;
            }
        });
    });

    billDetails += `<h3>Total: ৳${total}</h3>`;
    document.getElementById("bill").innerHTML = billDetails;
    document.getElementById("print-btn").style.display = "block";
}

function printBill() {
    let billContent = document.getElementById("bill").innerHTML;
    let newWindow = window.open("", "", "width=600,height=400");
    newWindow.document.write(`<html><head><title>Print Bill</title></head><body>${billContent}</body></html>`);
    newWindow.document.close();
    newWindow.print();
}
