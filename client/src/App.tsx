import React, { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* <Route path='' element={} */}
      </Route>

    </Routes>
  );
}

export default App;
