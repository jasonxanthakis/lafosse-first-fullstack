(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const API_KEY = "51162602-6f98114165846c3f1144f02d1";

module.exports = API_KEY;
},{}],2:[function(require,module,exports){
const API_KEY = require('./key.js');
const fruitList = document.querySelector("#fruitSection ul");

const fruitForm = document.querySelector("#inputSection form");

const style = document.createElement("style");
style.textContent = "img {width:100px;height:100px}";
document.head.appendChild(style);

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

    img = fetchFruitImage(fruit.name, li);

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

function fetchFruitImage(fruit, li) {
    let URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(fruit);
    fetch(URL)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data.hits[0]);
            let imgURL = data.hits[0].largeImageURL;
            const img = document.createElement("img");
            img.setAttribute("src", imgURL);
            li.appendChild(img);
        })
        .catch((e) => console.log(e));
}
},{"./key.js":1}]},{},[2]);
