const API_KEY = require('./key.js');

const fruitList = document.querySelector("#fruitSection ul");

const fruitForm = document.querySelector("#inputSection form");

const style = document.createElement("style");
style.textContent = "img {width:auto;height:150px}";
//document.head.appendChild(style);

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

    img = fetchFruitImage(fruit.name, li, fruit.nutritions.calories);

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}

function deleteFruit(e, cals) {
    e.target.remove();
    //e.target.parentNode.removeChild(e.target)

    cal -= cals;
    fruitNutrition.textContent = cal;
}

function deleteFruitImg(e, cals) {
    // deleteFruit(e.target.parentNode, cals)
    e.target.parentNode.remove();
}

function fetchFruitData(fruit) {
    if (fruit.trim() == "" || ['greenapple'].includes(fruit)) {
        return;
    }
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then((resp) => resp.json())
        .then(data => addFruit(data))
        .catch((e) => console.log(e));
}

function fetchFruitImage(fruit, li, cals) {
    let URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(fruit)+"+fruit&image_type=photo";
    fetch(URL)
        .then((resp) => resp.json())
        .then(data => {
            let imgURL = data.hits[0].largeImageURL;
            const img = document.createElement("img");
            img.setAttribute("src", imgURL);
            li.appendChild(document.createElement("br"))
            li.appendChild(img);

            img.addEventListener(
                "click", 
                e => deleteFruitImg(e, cals)
            );
        })
        .catch((e) => console.log(e));
}