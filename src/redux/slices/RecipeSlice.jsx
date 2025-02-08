import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async ({ query }) => {
        const response = await axios.get(API_URL, {
            params: {
                s: query,
            },
        });
        return response.data.meals;
    }
);

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        filteredRecipes: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        filterRecipes: (state, action) => {
            const { query, mealType, dietType } = action.payload;
            state.filteredRecipes = state.recipes.filter((recipe) => {
                const matchesQuery = query ? recipe.strMeal.toLowerCase().includes(query.toLowerCase()) : true;
                const matchesMealType = mealType ? recipe.strCategory === mealType : true;
                const matchesDietType = dietType ? recipe.strTags && recipe.strTags.includes(dietType) : true;
                return matchesQuery && matchesMealType && matchesDietType;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipes = action.payload;
                state.filteredRecipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { filterRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;