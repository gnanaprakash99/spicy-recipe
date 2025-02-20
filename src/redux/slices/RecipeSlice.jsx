import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.edamam.com/search';
const APP_ID = 'a5de3521';
const APP_KEY = '28f8a20bd89362740e68d4bbb349b977';

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async ({ query }) => {
        const response = await axios.get(API_URL, {
            params: {
                q: query,
                app_id: APP_ID,
                app_key: APP_KEY,
                from: 0,
                to: 50,
            },
        });
        console.log('data',response.data)
        return response.data.hits.map(hit => hit.recipe); 
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
                const matchesQuery = query ? recipe.label.toLowerCase().includes(query.toLowerCase()) : true;
                const matchesMealType = mealType ? recipe.mealType === mealType : true;
                const matchesDietType = dietType ? recipe.healthLabels.includes(dietType) || recipe.dietLabels.includes(dietType) : true;
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