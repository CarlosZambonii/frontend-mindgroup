import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Cadastro: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#0f172a' }}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Cadastro</h2>
        <div className="mb-4">
          <div className="flex items-center bg-gray-700 rounded-md p-2 mb-2">
            <i className="fas fa-user text-gray-400 mr-2"></i>
            <input
              type="text"
              placeholder="Nome"
              className="bg-gray-700 text-gray-400 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center bg-gray-700 rounded-md p-2 mb-2">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-700 text-gray-400 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center bg-gray-700 rounded-md p-2 mb-2">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <input
              type="password"
              placeholder="Senha"
              className="bg-gray-700 text-gray-400 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center bg-gray-700 rounded-md p-2">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <input
              type="password"
              placeholder="Confirmar Senha"
              className="bg-gray-700 text-gray-400 focus:outline-none w-full"
            />
          </div>
        </div>
        <button className="bg-teal-500 text-white w-full py-2 rounded-md mb-4">Cadastrar</button>
        <button className="bg-teal-500 text-white w-full py-2 rounded-md">Voltar ao Login</button>
      </div>
    </div>
  );
};

export default Cadastro;
