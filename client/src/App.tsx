import React, { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import FullWear from './pages/FullWear';
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route 
          path='cart'
          element={
            <Cart />
          }
        />
        <Route
          path='wear/:id'
          element={
            <FullWear />
          }
        />
      </Route>

    </Routes>
  );
}

export default App;
