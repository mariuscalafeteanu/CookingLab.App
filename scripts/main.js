//var
const dropDownContainer = document.querySelector('.dropdown');
const recipeOutput = document.querySelector('.recipe-output');
const searchBtn = document.querySelector('.search-btn');
const noResultMessage = document.querySelector('.no-results');
const resultsContainer = document.querySelector('.results');
const searchInput = document.querySelector('.search-input');
const randomRecipe = document.querySelector('.random-recipe');

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

const addStyle = () => {
    noResultMessage.style.display = 'block';
    resultsContainer.style.display = 'flex';
    resultsContainer.style.justifyContent = 'center';
    resultsContainer.style.alignItems = 'center';
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
       dropDownContainer.style.opacity = '0';
       dropDownContainer.style.pointerEvents = 'none';
    })

}
dropDownContainer.addEventListener('click', addCategoryToResults);


//showing recipes on search
const searchRecipe = async () => {

    if (searchInput.value === '') {
        addStyle();
        return;
    }

    const keyWord = searchInput.value;
    deleteStyle();

    //fetching data
    const recipeFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyWord}`);
    const recipeConverted = await recipeFetch.json();
    const recipes = await recipeConverted.meals;

    recipes.forEach(recipe => {
        
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = 
        `<div class="recipe-image">
        <img height="100%" width="100%" src="${recipe.strMealThumb}"></img>
    </div>
    <div class="recipe-description">
        <p class="recipe-category">${recipe.strCategory}</p>
        <p class="recipe-name">${recipe.strMeal}</p>
    </div>`;
    recipeOutput.appendChild(recipeDiv);

    recipeDiv.addEventListener('click', (e) => {
        const recipeProfile = document.querySelector('.recipe-profile');
        const recipeName = document.querySelector('.recipe-name');
        const recipeDescription = document.querySelector('.recipe-description');
        const blackBg = document.querySelector('.black-bg');

        const selectedItem = e.target.innerHTML;

       

        // profileClose.addEventListener('click', () => {
        //     recipeProfile.style.display = 'none';
        //     blackBg.style.display = 'none';
        // })

        if (e.target.className !== 'recipe-name') {
            return;
        }

        //fetching selected recipe to show details
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedItem}`)
        .then(data => data.json())
        .then(data => data.meals)
        .then(data => {
            blackBg.style.display = 'flex';
            recipeProfile.style.display = 'block';

            recipeName.innerHTML = 
            `${data[0].strMeal} (${data[0].strCategory})`;

            recipeDescription.innerHTML = 
            `<p class="instructions-text">${data[0].strInstructions}</p>`;
        })
    })
})
}

//search recipe on click
searchBtn.addEventListener('click', searchRecipe);


//search recipe on enter
searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        searchRecipe();
    }
});


//Random recipe
const outputRandomRecipe = async () => {

    deleteStyle();

    //fetching random recipe
    const randomRecipeFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const convertRandomRecipe = await randomRecipeFetch.json();
    const randomMealRecipe = convertRandomRecipe.meals;

    randomMealRecipe.forEach(recipe => {
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
    })
}
randomRecipe.addEventListener('click', outputRandomRecipe);


//Changing theme
const changeThemeBtn = document.querySelector('.change-theme');

const changeTheme = () => {
    // localStorage.setItem('theme', document.body.classList);
    document.body.classList.toggle('dark');
    
}
changeThemeBtn.addEventListener('click', changeTheme);