import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToFavorites } from '../redux/slices/FavoriteSlice';
import toast from 'react-hot-toast';

const RecipeDetails = () => {
    const { idMeal } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recipes = useSelector((state) => state.recipes.filteredRecipes);
    const favorites = useSelector((state) => state.favorites.favorites);
    const recipe = recipes.find((r) => r.idMeal === idMeal);

    useEffect(() => {
        if (!recipe) {
            toast.error('Recipe not found.');
        }
    }, [recipe]);

    if (!recipe) {
        return <p>Loading...</p>;
    }

    const handleAddToFavorites = () => {
        const isAlreadyFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    
        if (isAlreadyFavorite) {
            toast.error('This recipe is already added to favorites.');
        } else {
            dispatch(addToFavorites(recipe));
            toast.success('Recipe added to favorites!');
        }
    };
    

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div className="recipe-details">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>Ingredients:</h3>
            <ul>
                {Object.keys(recipe)
                    .filter((key) => key.startsWith('strIngredient') && recipe[key])
                    .map((key, index) => (
                        <li key={index}>{recipe[key]}</li>
                    ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{recipe.strInstructions}</p>
            <button className="btn btn-warning m-2" onClick={handleAddToFavorites}>Add to Favorites</button>
            <button className="btn btn-danger m-2" onClick={handleClose}>Close</button>
        </div>
    );
};

export default RecipeDetails;
