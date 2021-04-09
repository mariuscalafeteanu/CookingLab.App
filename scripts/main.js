//dropdown
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

// showing recipe categories in the dropdown list
const dropDownContainer = document.querySelector('.dropdown');

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


//adding selected category to results
const addCategoryToResults = async e => {
    
    const recipeOutput = document.querySelector('.recipe-output');
    const resultsContainer = document.querySelector('.results');
    const noResultMessage = document.querySelector('.no-results');

    //display none to no-result message
    noResultMessage.style.display = 'none';

    //removing flex display from results container
    resultsContainer.style.display = 'block';
    resultsContainer.style.justifyContent = 'unset';
    resultsContainer.style.alignItems = 'unset';

    //setting the recipe output to grid
    recipeOutput.style.display = 'grid';


    //clearing previous filtering
    recipeOutput.innerHTML = '';

    const selectedRecipeCategory = e.target.innerHTML;

    //fetching recipes based on the category selected
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