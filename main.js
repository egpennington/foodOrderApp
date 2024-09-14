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
            <i class="fa-solid fa-plus add-item"></i>
        </div>
        `
    })
}


document.getElementById('data-input-el').innerHTML = getFoodItemArr(menuArray)