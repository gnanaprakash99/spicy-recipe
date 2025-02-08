import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './slices/RecipeSlice';
import favoritesReducer from './slices/FavoriteSlice';

const store = configureStore({
    reducer: {
        recipes: recipeReducer,
        favorites: favoritesReducer,
    },
});

export default store;