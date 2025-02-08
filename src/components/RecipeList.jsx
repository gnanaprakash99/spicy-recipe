import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/slices/RecipeSlice';
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredRecipes, status } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes({ query: '' })); // Fetch all recipes on mount
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching recipes.</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center">Recipes</h1>
      <div className="row">
        {filteredRecipes.map((recipe) => (
          <div className="col-md-4 mb-3" key={recipe.idMeal}>
            <div className="card">
              <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
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
    </div>
  );
};

export default RecipeList;
