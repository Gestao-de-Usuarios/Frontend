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

    // Define the URL and request body based on the active tab (login/signup)
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

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold center">{tab === 'login' ? 'Login' : 'Cadastro'}</h1>
              <div className="flex justify-center  mt-5">
                <button
                  onClick={goToSignUp}
                  className={`px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-300 ${tab === 'signup' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Cadastrar
                </button>
                <button
                  onClick={goToLogin}
                  className={`px-4 py-2 rounded-r-md focus:outline-none transition-colors duration-300 ${tab === 'login' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {tab === 'signup' && (
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Full Name"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Senha
                  </label>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="relative flex justify-end">
                  <button
                    className="bg-cyan-500 text-white rounded-md px-4 py-2"
                    onClick={handleSubmit}
                  >
                    {tab === 'login' ? 'Login' : 'Cadastrar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usa o ModalAlert no lugar do modal simples */}
      <ModalAlert
        isOpen={showSuccessModal}
        onClose={closeModal}
        onConfirm={closeModal}
        message="Sua conta foi criada com sucesso!"
        modalType="SUCESSO"
      />
    </div>
  );
};

export default Login;
