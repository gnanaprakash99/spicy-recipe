import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRecipeItems from "../redux/hooks/useRecipe";

const RecipeList = () => {
    const navigate = useNavigate();
    const { isLoading, error } = useRecipeItems();
    const recipeItems = useSelector((state) => state.recipes.filteredItems);
    const noResults = useSelector((state) => state.recipes.noResults);

    useEffect(() => {
    }, [recipeItems]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-4">
            {noResults ? (
                <p className="text-center">No recipes found.</p>
            ) : (
                <div className="row">
                    {recipeItems.map((recipe) => (
                        <div className="col-md-4 mb-4" key={recipe.idMeal}>
                            <div className="card">
                                <img
                                    src={recipe.strMealThumb}
                                    className="card-img-top"
                                    alt={recipe.strMeal}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.strMeal}</h5>
                                    <button
                                        className="btn btn-info m-2"
                                        onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;
