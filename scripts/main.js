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
dropDownContainer.addEventListener('click', (e) => {
    console.log(e.target.innerHTML)
})

