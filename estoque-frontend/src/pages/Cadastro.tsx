import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa o axios para fazer requisições HTTP

const Cadastro: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação de senha
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert('A senha deve ter pelo menos 6 caracteres, incluindo letras e números.');
      return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido (ex: email@email.com).');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não conferem!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/cadastro', {
        name,
        email,
        password,
      });

      alert(response.data.message);
      navigate('/login'); // Redireciona após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#0f172a' }}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Cadastro</h2>
        <form onSubmit={handleSubmit}> {/* Adiciona o evento de submissão */}
          <div className="mb-4">
            <div className="flex items-center bg-gray-700 rounded-md p-2 mb-2">
              <input
                type="text"
                placeholder="Nome"
                className="bg-gray-700 text-gray-400 focus:outline-none w-full"
                value={name} // Alterado para 'name'
                onChange={(e) => setName(e.target.value)} // Atualiza o estado
              />
            </div>
            <div className="flex items-center bg-gray-700 rounded-md p-2 mb-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-700 text-gray-400 focus:outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
              />
            </div>
            <div className="flex items-center bg-gray-700 rounded-md p-2 mb-2">
              <input
                type="password"
                placeholder="Senha"
                className="bg-gray-700 text-gray-400 focus:outline-none w-full"
                value={password} // Alterado para 'password'
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
              />
            </div>
            <div className="flex items-center bg-gray-700 rounded-md p-2">
              <input
                type="password"
                placeholder="Confirmar Senha"
                className="bg-gray-700 text-gray-400 focus:outline-none w-full"
                value={confirmPassword} // Alterado para 'confirmPassword'
                onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado
              />
            </div>
          </div>
          <button type="submit" className="bg-teal-500 text-white w-full py-2 rounded-md mb-4">Cadastrar</button>
          <button 
            type="button"
            className="bg-teal-500 text-white w-full py-2 rounded-md" 
            onClick={handleBackToLogin}
          >
            Voltar ao Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
