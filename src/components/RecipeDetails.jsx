import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToFavorites } from "../redux/slices/FavoriteSlice";
import toast from "react-hot-toast";
import useRecipeItems from "../redux/hooks/useRecipe";

const RecipeDetails = () => {
    const { idMeal } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useRecipeItems();
    const recipes = useSelector((state) => state.recipes.items);
    const favorites = useSelector((state) => state.favorites.favorites);
    
    const recipe = recipes.find((r) => r.idMeal === idMeal);

    useEffect(() => {
        if (!recipe && !isLoading) {
            toast.error("Recipe not found.");
        }
    }, [recipe, isLoading]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!recipe) return <p>No recipe found.</p>;

    const handleAddToFavorites = () => {
        const isAlreadyFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

        if (isAlreadyFavorite) {
            toast.error("This recipe is already in favorites.");
        } else {
            dispatch(addToFavorites(recipe));
            toast.success("Recipe added to favorites!");
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-4">
            <div className="card p-3">
                <h2 className="text-center">{recipe.strMeal}</h2>
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="img-fluid mx-auto d-block"
                    style={{ maxWidth: "400px", height: "auto", borderRadius: "10px" }}
                />
                <h3>Ingredients:</h3>
                <ul>
                    {Object.keys(recipe)
                        .filter((key) => key.startsWith("strIngredient") && recipe[key])
                        .map((key, index) => (
                            <li key={index}>{recipe[key]}</li>
                        ))}
                </ul>
                <h3>Instructions:</h3>
                <p>{recipe.strInstructions}</p>
                <div className="text-center">
                    <button className="btn btn-warning m-2" onClick={handleAddToFavorites}>
                        Add to Favorites
                    </button>
                    <button className="btn btn-danger m-2" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
