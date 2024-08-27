let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let removeIngredientsBtn = document.getElementById('removeIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', function() {
    let newIngredients = ingredientDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value='';
    ingredientList.appendChild(newIngredients);
});

removeIngredientsBtn.addEventListener('click', function() {
    let ingredients = document.querySelectorAll('.ingredientDiv');
    if (ingredients.length > 1) {
        ingredientList.removeChild(ingredients[ingredients.length - 1]);
    } else {
        alert("You must have at least one ingredient!");
    }
});
