import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    // Verificação simples: se o token existe
    const isAuthenticated = !!token;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
