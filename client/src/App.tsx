import React, { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './scss/app.scss';

/**
 * Code splitting on chunks
 */
const FullWear = React.lazy(() => import('./pages/FullWear'));
const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const LoginPage = React.lazy(() => import('./pages/auth/Login'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route 
          path='cart'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='wear/:id'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullWear />
            </Suspense>
          }
        />
        <Route 
          path='auth'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route 
          path='*'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>

    </Routes>
  );
}

export default App;
