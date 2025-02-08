import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterRecipes } from '../redux/slices/RecipeSlice';
import Favorite from './Favorite';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredRecipes = useSelector((state) => state.recipes.filteredRecipes);

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleFilter = (mealType, dietType) => {
        dispatch(filterRecipes({ mealType, dietType, query: searchQuery }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(filterRecipes({ query: searchQuery, mealType: null, dietType: null }));
        setSearchQuery('');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <a className="navbar-brand" href="#">Recipe App</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleHomeClick}>home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setIsFavorite(true)}>Favorite</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Meal
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleFilter(null, 'Vegetarian')}>Vegetarian</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleFilter(null, 'Non Vegetarian')}>Non Vegetarian</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleFilter(null, null)}>All Items</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Meal Type
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleFilter('Breakfast', null)}>Breakfast</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleFilter('Lunch', null)}>Lunch</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleFilter('Dinner', null)}>Dinner</a></li>
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
