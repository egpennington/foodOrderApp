import { menuArray } from "/data.js"
const message = 'Hello World'

function getFoodItemArr(foodArr) {
    return menuArray.map(foodItem => {
        const { name, ingredients, id, price, emoji } = foodItem

        return `
        <div class="food-display">
            <div class="emoji">${emoji}</div>
                <div class="food-item">
                    <h2>${name}</h2>
                    <p>${ingredients}</p>
                    <h3>$${price}</h3>
                </div>
            <i class="fa-solid fa-plus add-item" id="${id}"></i>
        </div>
        `
    }).join('')
}

document.getElementById('data-input-el').innerHTML = getFoodItemArr(menuArray)

const addItemEls = document.querySelectorAll(".add-item")
const modalEl = document.getElementById("modal-el")
const foodListContainer = document.getElementById("food-list-container")
const priceTotalEl = document.getElementById("price-total-el")

let totalPrice = 0;

addItemEls.forEach(addItemEl => {
    addItemEl.addEventListener("click", function(e) {
        console.log(e.target.id)

        const item = menuArray.find(menuItem => menuItem.id === e.target.id)

        if (item) {
            const foodListEl = document.createElement("div")
            foodListEl.className = "food-list"

            foodListEl.innerHTML = `
                <h2>${item.name}</h2> 
                <p class="remove-el">Remove</p>
                <h2 class="price">$${item.price}</h2>
            `

            foodListContainer.appendChild(foodListEl)

            // Update total price
            totalPrice += item.price
            priceTotalEl.innerText = `$${totalPrice}`

            modalEl.classList.add("show");
        } else {
            console.error('Item not found in menuArray')
        }
    });
});