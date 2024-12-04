import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAlert from './modais/modalAlert';
import { useTranslation } from 'react-i18next';
import i18n from '../i18nextConfig';


const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('login');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const showModal = () => {
    setShowSuccessModal(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setTab('login');
  };

  // Função para navegar para a página de recuperação de senha
  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail()) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    const url = tab === 'login' ? '/login' : '/signup';
    const body = tab === 'login' ? { email, senha } : { nome, email, senha };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        if (tab === 'signup') {
          showModal();
          setEmail('');
          setSenha('');
          setNome('');
        } else {
          navigate('/home');
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer a requisição.');
    }
  };

  const goToSignUp = () => {
    setTab('signup');
    setEmail('');
    setSenha('');
    setNome('');
    setError('');
  };

  const goToLogin = () => {
    setTab('login');
    setEmail('');
    setSenha('');
    setNome('');
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-600 to-cyan-400 flex items-center justify-center p-4">
      {/* Botão de Seleção de Idioma */}
      <div className="absolute top-4 right-4">
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        >
          <option value="pt">{t('Português')}</option>
          <option value="en">{t('Inglês')}</option>
          <option value="ru">{t('Russo')}</option>
        </select>
      </div>
      {/* Restante do código */}
      <div className="relative rounded-lg w-full max-w-md p-8 sm:p-12">
        {/* Fundo Gradient Curvo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold center text-gray-800 mb-8">
                {tab === 'login' ? t('Entrar') : t('Cadastrar')}
              </h1>
              <div className="flex justify-center mb-3">
                <button
                  onClick={goToSignUp}
                  className={`px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-300 ${tab === 'signup' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {t('Cadastrar')}
                </button>
                <button
                  onClick={goToLogin}
                  className={`px-6 py-2 rounded-r-lg focus:outline-none transition-colors duration-300 ${tab === 'login' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {t('Entrar')}
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 space-y-6">
                {tab === 'signup' && (
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition duration-300 pr-10"
                      placeholder="Nome Completo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-indigo-600 peer-focus:text-sm"
                    >
                      {t('Nome Completo')}
                    </label>
                  </div>
                )}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition duration-300 pr-10"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-indigo-600 peer-focus:text-sm"
                  >
                    {t('Email')}
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition duration-300 pr-10"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-indigo-600 peer-focus:text-sm"
                  >
                    {t('Senha')}
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 top-0 mt-3 mr-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {/* Ícones de mostrar/ocultar senha */}
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-2.07.503-4.009 1.376-5.653M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div className="relative flex justify-end">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                  >
                    {tab === 'login' ? t('Entrar') : t('Cadastrar')}
                  </button>
                </div>

                {/* Botão "Esqueceu a senha?" centralizado abaixo do botão de login */}
                {tab === 'login' && (
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={goToForgotPassword}
                      className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      {t('Esqueceu a senha?')}
                    </button>
                  </div>
                )}
              </form>

              {/* Divisor */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t('Ou')}
                  </span>
                </div>
              </div>
              {/* Botões de Login Social */}
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => window.location.href = "/login/google"}
                  className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  <svg
                    className="w-6 h-6 mr-2" // Aumentado para w-6 h-6
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.44 0 6.58 1.17 9.07 3.31l6.76-6.76C35.52 2.49 30.02 0 24 0 14.99 0 7.26 5.48 3.74 13.38l7.78 6.04C13.07 13.46 18.19 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.45 24.49c0-1.56-.14-3.07-.39-4.54H24v9.13h12.69c-.55 3.01-2.2 5.57-4.73 7.28l7.55 5.85C42.47 38.09 46.45 31.77 46.45 24.49z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M13.52 29.42c-.65-1.94-1.02-4.02-1.02-6.16s.36-4.22 1.02-6.16L5.74 13.38C3.9 16.9 2.98 20.81 2.98 24.49s.92 7.59 2.76 11.11l7.78-6.18z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 43.98c5.81 0 10.72-1.92 14.29-5.22l-7.55-5.85c-2.09 1.41-4.76 2.23-7.74 2.23-5.81 0-10.77-3.95-12.55-9.22l-7.78 6.18C7.26 42.5 14.99 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  {t('Continuar com o Google')}
                </button>

                <button
                  onClick={() => window.location.href = "/login/github"}
                  className="flex items-center justify-center bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  <svg
                    className="w-6 h-6 mr-2" // Aumentado para w-6 h-6
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.372 0 0 5.373 0 12a12 12 0 008.207 11.418c.6.112.793-.26.793-.577v-2.18c-3.338.725-4.042-1.607-4.042-1.607-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.082-.73.082-.73 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.492.997.108-.775.418-1.304.76-1.605-2.665-.303-5.467-1.333-5.467-5.932 0-1.31.468-2.38 1.235-3.22-.124-.304-.535-1.527.117-3.182 0 0 1.007-.322 3.3 1.23a11.5 11.5 0 016 0c2.292-1.552 3.298-1.23 3.298-1.23.653 1.655.242 2.878.118 3.182.769.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.814 1.102.814 2.222v3.293c0 .32.192.694.801.576A12.003 12.003 0 0024 12c0-6.627-5.373-12-12-12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t('Continuar com o GitHub')}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal de Sucesso */}
        <ModalAlert
          isOpen={showSuccessModal}
          onClose={closeModal}
          onConfirm={closeModal}
          message={t("Sua conta foi criada com sucesso!")}
          modalType="SUCESSO"
        />
      </div>
    </div>
  );
};


export default Login;