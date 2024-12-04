// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import '../i18nextConfig';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || data.error))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-600 to-cyan-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {t('Esqueceu a Senha?')}
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {t('Insira seu email para receber uma nova senha.')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer h-12 w-full px-4 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-500 transition duration-300"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sky-500 peer-focus:text-sm"
            >
              {t('Email')}
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition duration-300"
          >
            {t('Enviar Nova Senha')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
