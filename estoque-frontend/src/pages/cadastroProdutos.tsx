import React, { useState } from 'react';
import api from '../api/axiosConfig';

const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('valor', valor);
    formData.append('quantidade', quantidade);
    if (imagem) formData.append('imagem', imagem);

    try {
      await api.post('/api/produtos', formData);
      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto", error);
    }
  };

  return (
    <form onSubmit={handleCadastro}>
      <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <input type="number" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
      <input type="number" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
      <input type="file" onChange={e => setImagem(e.target.files ? e.target.files[0] : null)} />
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
};

export default CadastroProduto;
