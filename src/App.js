import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Products';
import ForgotPassword from './components/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';

function App() {
  // Função para lidar com o logout
  const handleLogout = () => {
    // Remover tokens e informações de autenticação do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('language'); // Opcional: remover a preferência de idioma

    // Redirecionar para a página de login
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        {/* Rota Pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Rota Pública: Recuperar Senha */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Rotas Protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home onLogout={handleLogout} />} />
          <Route path="/products" element={<Products onLogout={handleLogout} />} />
        </Route>

        {/* Redirecionamento para a página de login em rotas não definidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
