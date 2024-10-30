import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Certifique-se de que Navigate está importado
import Login from './components/login';
import Home from './components/home';
import ForgotPassword from './components/forgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redireciona para a página de login */}
      </Routes>
    </Router>
  );
}

export default App;
