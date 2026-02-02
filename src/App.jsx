 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Presentation from './components/presentation';
import Formcomponet from './components/Formcomponet';
import Appi from './Appi';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route path="/Formcomponent" element={<Formcomponet />} />
        <Route path="/Appi" element={<Appi/>} />
      </Routes>
    </Router>
  );
}

export default App;