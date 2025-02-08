import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/slices/FavoriteSlice';
import toast from 'react-hot-toast';

const Favorite = ({ isFavorite, setIsFavorite }) => {
    const { favorites } = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFavorites = (recipe) => {
        dispatch(removeFromFavorites(recipe));
        toast.success('Recipe removed from favorites!');
    };

    if (!isFavorite) return null;

    return (
        <div className="favorite-overlay">
            <div className="favorite-container">
                <h2>Favorites</h2>
                {favorites.length === 0 ? (
                    <p>Your favorites list is empty.</p>
                ) : (
                    <ul>
                        {favorites.map((recipe) => (
                            <li key={recipe.idMeal} className="favorite-item">
                                <img
                                    src={recipe.strMealThumb}
                                    alt={recipe.strMeal}
                                    className="favorite-item-image"
                                />
                                <span className="favorite-item-name">{recipe.strMeal}</span>
                                <button
                                    onClick={() => handleRemoveFavorites(recipe)}
                                    className="favorite-item-remove"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button className="btn btn-danger m-2" onClick={() => setIsFavorite(false)}>Close</button>
            </div>
        </div>
    );
};

export default Favorite;
