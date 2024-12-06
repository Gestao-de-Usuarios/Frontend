import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAlert from './modais/modalAlert';
import { Pagination } from './pagination';
import '../i18nextConfig';
import { useTranslation } from 'react-i18next';
import i18n from '../i18nextConfig';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState(''); // Tipo do usuário: admin ou comum
  const { t } = useTranslation();

  const navigate = useNavigate();
  const pageSize = 10;
  const activatedUsers = users.filter(user => user.status !== 'bloqueado');
  const totalCount = activatedUsers.length;

  const currentPageUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return activatedUsers.slice(startIndex, endIndex);
  }, [activatedUsers, currentPage, pageSize]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/users');
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Erro ao carregar os usuários.');
    }
  };

  const fetchUserType = async () => {
    try {
      const response = await fetch('/api/user-type'); // Backend deve fornecer essa rota
      if (!response.ok) {
        throw new Error('Erro ao obter o tipo de usuário');
      }
      const data = await response.json();
      setUserType(data.tipo_usuario); // 'admin' ou 'comum'
    } catch (err) {
      setError('Erro ao obter o tipo de usuário.');
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`/users/${selectedUserId}/block`, {
        method: 'PUT',
      });

      if (response.ok) {
        setUsers(users.map(user => user.id === selectedUserId ? { ...user, status: 'bloqueado' } : user));
        setShowSuccessModal(true);
      } else {
        setError('Erro ao bloquear o usuário.');
      }
    } catch (err) {
      setError('Erro ao bloquear o usuário.');
    } finally {
      setShowConfirmModal(false);
    }
  };

  const confirmDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(false);
    setShowExitModal(false);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Salva a escolha no localStorage
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage); // Define o idioma salvo
    }
    fetchUsers();
    fetchUserType(); // Obtém o tipo do usuário na montagem
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-600 to-cyan-500 flex flex-col items-center p-4 relative">
      {/* Botão de mudar idioma */}
      <div className="absolute top-4 right-4 z-50">
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          defaultValue={localStorage.getItem('language') || 'pt'}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        >
          <option value="pt">{t('Português')}</option>
          <option value="en">{t('English')}</option>
          <option value="ru">{t('Russo')}</option>
        </select>
      </div>

      {/* Botão de sair fixo */}
      <button
        className="fixed top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800 transition duration-300 z-50"
        onClick={() => setShowExitModal(true)}
      >
        X
      </button>

      {/* Restante do conteúdo */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 relative">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">
          {t('Usuários Cadastrados')}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-6">
          {t('Gerenciamento dos usuários do sistema.')}
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-cyan-600 text-white">
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('ID')}</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Nome')}</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Email')}</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Status')}</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Data de Criação')}</th>
                <th className="px-4 sm:px-6 py-3 text-center font-semibold">{t('Ação')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPageUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-4 sm:px-6 py-3 text-gray-800">{user.id}</td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">{user.nome}</td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">{user.email}</td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">{user.status}</td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">{user.data_criacao}</td>
                  <td className="px-4 sm:px-6 py-3 text-center">
                    {user.status === 'ativo' && userType === 'admin' ? (
                      <button
                        className="bg-red-400 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                        onClick={() => confirmDeleteUser(user.id)}
                      >
                        {t('Excluir')}
                      </button>
                    ) : (
                      <span className="text-gray-500">{userType === 'comum' ? t('Visualizar') : t('Bloqueado')}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex justify-center mt-6">
          <Pagination
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Modais */}
      <ModalAlert
        isOpen={showConfirmModal}
        onClose={closeModal}
        onConfirm={deleteUser}
        message={t('Você tem certeza que deseja excluir este usuário?')}
        modalType="APAGAR"
      />

      <ModalAlert
        isOpen={showSuccessModal}
        onClose={closeModal}
        onConfirm={closeModal}
        message={t('Usuário excluído com sucesso!')}
        modalType="SUCESSO"
      />

      <ModalAlert
        isOpen={showExitModal}
        onClose={closeModal}
        onConfirm={() => navigate('/login')}
        message={t('Você realmente deseja sair e voltar para a tela de login?')}
        modalType="CONFIRMACAO"
      />
    </div>
  );
};

export default Home;
