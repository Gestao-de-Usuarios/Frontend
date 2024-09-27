import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAlert from './modais/modalAlert';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Armazena o usuário a ser excluído
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar os usuários cadastrados
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Erro ao carregar os usuários.');
    }
  };

  // Função para "excluir" (bloquear) um usuário
  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${selectedUserId}/block`, {
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
    
    <div className="min-h-screen bg-gradient-to-r from-sky-600 to-cyan-500 flex items-center justify-center p-4">
       {/* Botão de voltar */}
       <button
          className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800 transition duration-300"
          onClick={() => setShowExitModal(true)}
        >
          X
        </button>

      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 relative">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Usuários Cadastrados</h1>
        <p className="text-lg text-gray-600 text-center mb-8">Gerenciamento dos usuários do sistema.</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-cyan-600  text-white">
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Nome</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Data de Criação</th>
                <th className="px-6 py-4 text-center font-semibold">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users
                .filter(user => user.status !== 'bloqueado')  // Filtra os usuários com status diferente de "bloqueado"
                .map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 text-gray-800">{user.id}</td>
                    <td className="px-6 py-4 text-gray-800">{user.nome}</td>
                    <td className="px-6 py-4 text-gray-800">{user.email}</td>
                    <td className="px-6 py-4 text-gray-800">{user.status}</td>
                    <td className="px-6 py-4 text-gray-800">{user.data_criacao}</td>
                    <td className="px-6 py-4 text-center">
                      {user.status === 'ativo' ? (
                        <button
                          className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
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
      </div>

      {/* Modal de confirmação de exclusão */}
      <ModalAlert
        isOpen={showConfirmModal}
        onClose={closeModal}
        onConfirm={deleteUser}
        message={'Você tem certeza que deseja excluir este usuário?'}
        modalType="APAGAR" 
      />

      {/* Modal de sucesso após exclusão */}
      <ModalAlert
        isOpen={showSuccessModal}
        onClose={closeModal}
        onConfirm={closeModal}
        message={'Usuário excluído com sucesso!'}
        modalType="SUCESSO" 
      />

      {/* Modal de atenção para sair */}
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
