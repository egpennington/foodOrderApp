import { menuArray } from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

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
    document.body.style.backgroundColor = "#939393"

    const emojis = document.getElementsByClassName("emoji");

    for (let i = 0; i < emojis.length; i++) {
    emojis[i].style.opacity = "0.2";
    }
    console.log("ordered entered")
})

// ======== Payment form data ====
const paymentForm = document.getElementById("paymentForm")
const uuid = uuidv4();
const shortUuid = uuid.slice(0, 8);

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()

    const paymentFormData = new FormData(paymentForm)
    
    const name = paymentFormData.get("name")

    orderModal.innerHTML = `
       <div id="order-complete" class="order-complete">
         <p>Thanks, ${name}!  Your order is on it's way!</p>
         <p class="txt-sm">Your total is $${totalPrice}.<p/p>
         <p>Order number <span class="txt-bold">${shortUuid}</span></p>
         <div id="experience-rating" class="experience-rating">
            <p>Please rate your experience today</p>
            <span class="like-detail">
                <i class="fa-solid fa-heart like-class" id="1"></i>
                <i class="fa-solid fa-heart like-class" id="2"></i>
                <i class="fa-solid fa-heart like-class" id="3"></i>
                <i class="fa-solid fa-heart like-class" id="4"></i>
                <i class="fa-solid fa-heart like-class" id="5"></i>                    
                </span>
            </div>
       </div>       
       `
    paymentModal.style.display= "none"

    paymentForm.reset()
   
   orderModal.addEventListener("click", function(e){
            console.log(e.target.id)
            e.target.classList.toggle("like")           

            setTimeout(() => {
                location.reload()
            }, 4000)            
   })
})

