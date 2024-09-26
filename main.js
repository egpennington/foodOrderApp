import { menuArray } from "/data.js"

// ======= Food items array =====
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
const orderModal = document.getElementById("order-modal")
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

            foodListEl.querySelector(".remove-el").addEventListener("click", function(){
                foodListEl.remove()

            totalPrice -= item.price
            priceTotalEl.innerText = `$${totalPrice}`             
            })

            // Update total price
            totalPrice += item.price
            priceTotalEl.innerText = `$${totalPrice}`

            orderModal.classList.add("show")
        } else {
            console.error('Item not found in menuArray')
        }
    });
})

// ======== Payment Modal display ========
const orderBtn = document.getElementById("order-btn")
const paymentModal = document.querySelector(".payment-modal")

orderBtn.addEventListener("click", function(){
    paymentModal.style.display= "block"
    console.log("ordered entered")
})

// ======== Payment form data ====
const paymentForm = document.getElementById("paymentForm")

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()

    const paymentFormData = new FormData(paymentForm)
    
    const name = paymentFormData.get("name")

    orderModal.innerHTML = `
       <div id="order-complete" class="order-complete">
         <p>Thanks, ${name}! Your order is on it's way!</p>
       </div>
       `
    paymentModal.style.display= "none"

    paymentForm.reset()

    setTimeout(() => {
        location.reload()
    }, 5000)    
})