import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    filteredItems: [],
    mealType: null,
    dietType: null,
    noResults: false // ✅ Add this line
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipeItems: (state, action) => {
            state.items = action.payload;
            state.filteredItems = action.payload; // Default to all items
        },
        filterRecipes: (state, action) => {
            const { mealType, dietType, query } = action.payload;

            state.mealType = mealType !== null ? mealType : state.mealType;
            state.dietType = dietType !== null ? dietType : state.dietType;

            state.filteredItems = state.items.filter((recipe) => {
                const mealMatch = !state.mealType || recipe.mealType === state.mealType;
                const dietMatch = !state.dietType || recipe.dietType === state.dietType;
                const queryMatch = !query || recipe.strMeal.toLowerCase().includes(query.toLowerCase());

                return mealMatch && dietMatch && queryMatch;
            });
            state.noResults = state.filteredItems.length === 0;
        },
        resetFilters: (state) => {
            state.mealType = null;
            state.dietType = null;
            state.filteredItems = [...state.items]; // ✅ Ensure all items are restored
            state.noResults = false;
        },
        
    }
});

export const { setRecipeItems, filterRecipes, resetFilters } = recipeSlice.actions;
export default recipeSlice.reducer;
