document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results');
    const showAllBtn = document.getElementById('show-all-btn');
    let allMeals = [];

    const renderMeals = (meals, showAll = false) => {
        resultsContainer.innerHTML = '';
        const mealsToShow = showAll ? meals : meals.slice(0, 5);

        mealsToShow.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'border rounded-lg overflow-hidden shadow-lg';
            mealCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-auto" />
                <div class="p-4">
                    <h5 class="text-lg font-bold">${meal.strMeal}</h5>
                    <p class="text-sm text-gray-600"><strong>ID:</strong> ${meal.idMeal}</p>
                    <p class="text-gray-700">${meal.strInstructions.slice(0, 100)}...</p>
                </div>
            `;
            resultsContainer.appendChild(mealCard);
        });

        if (meals.length > 5 && !showAll) {
            showAllBtn.style.display = 'block';
        } else {
            showAllBtn.style.display = 'none';
        }
    };

    const fetchMeals = async (query) => {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            allMeals = data.meals || [];
            renderMeals(allMeals);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchMeals(query);
        }
    });

    showAllBtn.addEventListener('click', () => {
        renderMeals(allMeals, true);
    });
});

