import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import axios from 'axios'; // Importa axios para fazer requisições HTTP
import { AuthContext } from '../context/AuthContext'; // Importe o contexto de autenticação
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Inicializa o useNavigate
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(''); // Estado para mensagens de erro

  const authContext = useContext(AuthContext); // Obtém o contexto de autenticação

  const handleCreateAccount = () => {
    navigate('/cadastro'); // Redireciona para a tela de cadastro
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password: senha, // Use "password" para que o backend reconheça
      });

      if (response.data.success) {
        console.log("Login bem-sucedido, redirecionando...");

        // Armazena o token e atualiza o contexto de autenticação
        localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
        authContext?.login(); // Chama o método de login do contexto

        navigate('/mercadorias'); // Redireciona para a tela de mercadorias
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.'); // Exibe mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.'); // Exibe mensagem de erro
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#0f172a' }}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Mensagem de erro */}
        <form onSubmit={handleSubmit}> {/* Adiciona o evento de submissão */}
          <div className="mb-4">
            <div className="flex items-center bg-gray-700 rounded-md p-2 mb-2">
              <i className="fas fa-user text-gray-400 mr-2"></i>
              <input
                type="text"
                placeholder="Email"
                className="bg-gray-700 text-gray-400 focus:outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
              />
            </div>
            <div className="flex items-center bg-gray-700 rounded-md p-2">
              <i className="fas fa-lock text-gray-400 mr-2"></i>
              <input
                type="password"
                placeholder="Senha"
                className="bg-gray-700 text-gray-400 focus:outline-none w-full"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} // Atualiza o estado
              />
            </div>
          </div>
          <button type="submit" className="bg-teal-500 text-white w-full py-2 rounded-md mb-4">Entrar</button>
          <button 
            type="button"
            className="bg-teal-500 text-white w-full py-2 rounded-md" 
            onClick={handleCreateAccount} // Adiciona o evento de clique
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
