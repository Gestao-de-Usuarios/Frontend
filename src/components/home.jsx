import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAlert from './modais/modalAlert';
import { Pagination } from './pagination';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-600 to-cyan-500 flex flex-col items-center p-4 relative">
      {/* Botão de sair fixo */}
      <button
        className="fixed top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800 transition duration-300 z-50"
        onClick={() => setShowExitModal(true)}
      >
        X
      </button>

      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 relative">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">Usuários Cadastrados</h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-6">Gerenciamento dos usuários do sistema.</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-cyan-600 text-white">
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">Nome</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">Data de Criação</th>
                <th className="px-4 sm:px-6 py-3 text-center font-semibold">Ação</th>
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
                    {user.status === 'ativo' ? (
                      <button
                        className="bg-red-400 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                        onClick={() => confirmDeleteUser(user.id)}
                      >
                        Excluir
                      </button>
                    ) : (
                      <span className="text-gray-500">Bloqueado</span>
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
        message={'Você tem certeza que deseja excluir este usuário?'}
        modalType="APAGAR"
      />

      <ModalAlert
        isOpen={showSuccessModal}
        onClose={closeModal}
        onConfirm={closeModal}
        message={'Usuário excluído com sucesso!'}
        modalType="SUCESSO"
      />

      <ModalAlert
        isOpen={showExitModal}
        onClose={closeModal}
        onConfirm={() => navigate('/login')}
        message={'Você realmente deseja sair e voltar para a tela de login?'}
        modalType="CONFIRMACAO"
      />
    </div>
  );
};

export default Home;
