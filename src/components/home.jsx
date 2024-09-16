import React, { useState, useEffect } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

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
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/block`, {
        method: 'POST',
      });

      if (response.ok) {
        setUsers(users.map(user => user.id === userId ? { ...user, status: 'bloqueado' } : user));
      } else {
        setError('Erro ao bloquear o usuário.');
      }
    } catch (err) {
      setError('Erro ao bloquear o usuário.');
    }
  };

  // Carregar os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center">
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
              <th className="px-4 py-2 border">Ação</th>
              <th className="px-4 py-2 border">Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.nome}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.status}</td>
                <td className="px-4 py-2 border">
                  {user.status === 'ativo' ? (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => deleteUser(user.id)}
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
  );
};

export default Home;
