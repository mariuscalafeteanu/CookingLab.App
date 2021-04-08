// showing recipe categories in the dropdown list
const dropDownContainer = document.querySelector('.dropdown');

const getCategories = async () => {
    const categoriesFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const categoriesConvertJson = await categoriesFetch.json();
    const categories = categoriesConvertJson.categories;

    categories.forEach(category => {
        dropDownContainer.innerHTML += 
        `<li class="category">${category.strCategory}</li>`;
    })
}

window.addEventListener('load', getCategories);