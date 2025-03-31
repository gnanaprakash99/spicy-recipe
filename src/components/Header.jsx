import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterRecipes } from '../redux/slices/RecipeSlice';
import Favorite from './Favorite';
import { useNavigate } from 'react-router-dom';
import useRecipeItems from '../redux/hooks/useRecipe';
import { setRecipeItems, resetFilters } from '../redux/slices/RecipeSlice';

const Header = () => {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { refetch } = useRecipeItems()

    const handleMealTypeFilter = (mealType) => {
        dispatch(filterRecipes({ mealType, dietType: null, query: searchQuery }));
    };

    const handleDietTypeFilter = (dietType) => {
        dispatch(filterRecipes({ mealType: null, dietType, query: searchQuery }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(filterRecipes({ query: searchQuery, mealType: null, dietType: null }));
        setSearchQuery('');
    };

    const handleHomeClick = async () => {
        dispatch(resetFilters()); // ✅ Reset filters

        try {
            const { data } = await refetch(); // ✅ Fetch fresh data
            if (data) {
                dispatch(setRecipeItems(data)); // ✅ Restore all recipes
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }

        navigate('/'); // ✅ Ensure Home reloads
    };
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <a className="navbar-brand" href="#">Spicy Recipe</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleHomeClick}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setIsFavorite(true)}>Favorites</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Meal Type
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleMealTypeFilter('Breakfast')}>Breakfast</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleMealTypeFilter('Lunch')}>Lunch</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleMealTypeFilter('Dinner')}>Dinner</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Diet Type
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleDietTypeFilter('Vegetarian')}>Veg</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleDietTypeFilter('Non-Vegetarian')}>Non-Veg</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search Dishes"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <Favorite isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
        </div>
    );
};

export default Header;
