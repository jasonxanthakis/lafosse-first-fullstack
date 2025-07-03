const x = require('./script2.js');
const fruitList = document.querySelector("#fruitSection ul")

const fruitForm = document.querySelector("#inputSection form");

fruitForm.addEventListener(
    "submit",
    extractFruit
);

function extractFruit(e) {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}

let cal = 0;
function addFruit(fruit) {
    const li = document.createElement("li");
    li.textContent = fruit.name;
    fruitList.appendChild(li);
    li.addEventListener(
        "click", 
        e => deleteFruit(e, fruit.nutritions.calories)
    );

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}

function deleteFruit(e, cals) {
    e.target.remove()
    //e.target.parentNode.removeChild(e.target)

    cal -= cals;
    fruitNutrition.textContent = cal;
}

function fetchFruitData(fruit) {
    if (fruit.trim() == "") {
        return;
    }
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then((resp) => resp.json())
        .then(data => addFruit(data))
        .catch((e) => console.log(e));
}