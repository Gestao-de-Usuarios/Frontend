import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAlert from './modais/modalAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('login');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail()) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    // Define a URL e o corpo da requisição com base na aba ativa (login/signup)
    const url = tab === 'login' ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';
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

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-600 to-cyan-400 flex items-center justify-center p-4">
      <div className="relative rounded-lg w-full max-w-md p-8 sm:p-12">
        {/* Fundo Gradient Curvo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold center text-gray-800 mb-8">
                {tab === 'login' ? 'Login' : 'Cadastro'}
              </h1>
              <div className="flex justify-center mb-3">
                <button
                  onClick={goToSignUp}
                  className={`px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-300 ${
                    tab === 'signup' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cadastrar
                </button>
                <button
                  onClick={goToLogin}
                  className={`px-6 py-2 rounded-r-lg focus:outline-none transition-colors duration-300 ${
                    tab === 'login' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Login
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
                      Nome Completo
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
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'} // Alterar o tipo do input com base no estado
                    className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition duration-300 pr-10" // Adicionado pr-10 para padding-right
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-indigo-600 peer-focus:text-sm"
                  >
                    Senha
                  </label>
                  {/* Botão para alternar a visibilidade da senha */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 top-0 mt-3 mr-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? (
                      // Ícone de olho fechado (Ocultar senha)
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
                      // Ícone de olho aberto (Mostrar senha)
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
                    {tab === 'login' ? 'Login' : 'Cadastrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal de Sucesso */}
        <ModalAlert
          isOpen={showSuccessModal}
          onClose={closeModal}
          onConfirm={closeModal}
          message="Sua conta foi criada com sucesso!"
          modalType="SUCESSO"
        />
      </div>
    </div>
  );
};

export default Login;
