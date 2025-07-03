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

const cal = []
function addFruit(fruit) {
    const li = document.createElement("li");
    li.textContent = fruit.name;
    fruitList.appendChild(li);
    li.addEventListener("click", deleteFruit);

    cal[cal.length] = fruit.nutritions.calories;
    fruitNutrition.textContent = cal.reduce((temp, a) => temp + a);
}

function deleteFruit(e) {
    e.target.remove()
    //e.target.parentNode.removeChild(e.target)
    
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