import React from 'react'
import { Route, Router, Routes } from 'react-router';
import Home from './pages/home';
import Details from './pages/details';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/details/:city" element={<Details/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
}
