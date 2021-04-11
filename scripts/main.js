//var
const dropDownContainer = document.querySelector('.dropdown');
const recipeOutput = document.querySelector('.recipe-output');
const searchBtn = document.querySelector('.search-btn');
const noResultMessage = document.querySelector('.no-results');
const resultsContainer = document.querySelector('.results');

// adding recipe categories on window load
const getCategories = async () => {
    const categoriesFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const categoriesConvertJson = await categoriesFetch.json();
    const categories = await categoriesConvertJson.categories;

    categories.forEach(category => {
        dropDownContainer.innerHTML += 
        `<li class="category">${category.strCategory}</li>`;
    })
}
window.addEventListener('load', getCategories);

//dropdown script
const showCategoryBtn = document.querySelector('.show-category');
let listDropped = false;

showCategoryBtn.addEventListener('click', () => {
    if (listDropped === false) {
        dropDownContainer.style.opacity = 1;
        dropDownContainer.style.pointerEvents = 'all';
        listDropped = true;
    }
    else {
        dropDownContainer.style.opacity = 0;
        dropDownContainer.style.pointerEvents = 'none';
        listDropped = false;
    }
})



// deleting "no result" style
const deleteStyle = () => {
    noResultMessage.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultsContainer.style.justifyContent = 'unset';
    resultsContainer.style.alignItems = 'unset';
    recipeOutput.style.display = 'grid';
    recipeOutput.innerHTML = '';
}



//adding selected category to results
const addCategoryToResults = async e => {

    deleteStyle();
    const selectedRecipeCategory = e.target.innerHTML;

    //fetching data
    const fetchFilteredCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedRecipeCategory}`);
    const convertFilteredCategories = await fetchFilteredCategories.json();
    const filteredCategories = await convertFilteredCategories.meals;
    
    // adding recipes on results
    filteredCategories.forEach(recipe => {
       setTimeout(() => {
        recipeOutput.innerHTML += 
        `<div class="recipe">
                <div class="recipe-image">
                    <img height="100%" width="100%" src="${recipe.strMealThumb}"></img>
                </div>
                <div class="recipe-description">
                    <p class="recipe-category">${selectedRecipeCategory}</p>
                    <p class="recipe-name">${recipe.strMeal}</p>
                </div>
        </div>`;
       }, 500);
    })

}
dropDownContainer.addEventListener('click', addCategoryToResults);




//showing recipes on search
const searchRecipe = async () => {
    const searchInput = document.querySelector('.search-input');
    const keyWord = searchInput.value;

    deleteStyle();

    //fetching data
    const recipeFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyWord}`);
    const recipeConverted = await recipeFetch.json();
    const recipes = await recipeConverted.meals;

    // adding recipes on results
    recipes.forEach(recipe => {
        setTimeout(() => {
            recipeOutput.innerHTML += 
        `<div class="recipe">
                <div class="recipe-image">
                    <img height="100%" width="100%" src="${recipe.strMealThumb}"></img>
                </div>
                <div class="recipe-description">
                    <p class="recipe-category">${recipe.strCategory}</p>
                    <p class="recipe-name">${recipe.strMeal}</p>
                </div>
        </div>`;
        }, 500)
    })
}
searchBtn.addEventListener('click', searchRecipe);