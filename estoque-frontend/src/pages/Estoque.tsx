import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  quantidade: number;
}

const Estoque = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/produtos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(response.data);
    };
    fetchProdutos();
  }, []);

  return (
    <div>
      <h1>Estoque</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p>Valor: {produto.valor}</p>
            <p>Quantidade: {produto.quantidade}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estoque;
