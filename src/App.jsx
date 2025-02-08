import React from 'react'
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<RecipeList/>}/>
        <Route path="/recipe/:idMeal" element={<RecipeDetails />} />
      </Routes>
    </div>
  )
}

export default App
