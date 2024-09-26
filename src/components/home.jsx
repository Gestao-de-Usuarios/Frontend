import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import ModalAlert from './modais/modalAlert';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal de confirmação de exclusão
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal de sucesso após exclusão
  const [showExitModal, setShowExitModal] = useState(false); // Modal de atenção para sair
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
        method: 'POST',
      });

      if (response.ok) {
        setUsers(users.map(user => user.id === selectedUserId ? { ...user, status: 'bloqueado' } : user));
        setShowSuccessModal(true); // Exibe o modal de sucesso após a exclusão
      } else {
        setError('Erro ao bloquear o usuário.');
      }
    } catch (err) {
      setError('Erro ao bloquear o usuário.');
    } finally {
      setShowConfirmModal(false); // Fecha o modal de confirmação
    }
  };

  // Função para abrir o modal de confirmação e definir o usuário
  const confirmDeleteUser = (userId) => {
    setSelectedUserId(userId); // Define o ID do usuário a ser excluído
    setShowConfirmModal(true); // Abre o modal de confirmação
  };

  // Função para fechar os modais
  const closeModal = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(false);
    setShowExitModal(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center ">
        {/* Botão de voltar */}
        <button
          className="absolute top-4 left-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={setShowExitModal(true)}
        >
          Voltar
        </button>

        <h1 className="text-4xl font-bold mb-6">Página Inicial</h1>
        <p className="text-lg mb-6">Lista de usuários cadastrados no sistema.</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Data de Criação</th>
              <th className="px-4 py-2 border">Ação</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.status !== 'bloqueado')  // Filtra os usuários com status diferente de "bloqueado"
              .map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.nome}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.status}</td>
                  <td className="px-4 py-2 border">{user.data_criacao}</td>
                  <td className="px-4 py-2 border">
                    {user.status === 'ativo' ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
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

      {/* Modal de confirmação de exclusão */}
      <ModalAlert
        isOpen={showConfirmModal}
        onClose={closeModal}
        onConfirm={deleteUser} // Função de exclusão
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
        onConfirm={navigate('/login')} // Confirma a saída e redireciona para o login
        message={'Você realmente deseja sair e voltar para a tela de login?'}
        modalType="ALERTA" 
      />
    </div>
  );
};

export default Home;
