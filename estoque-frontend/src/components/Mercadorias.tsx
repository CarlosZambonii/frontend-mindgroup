import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import axios, { AxiosError } from "axios";

interface Mercadoria {
    id_mercadoria: number;
    codigo: string;
    descricao: string;
    preco_unitario: number;
    quantidade: number;
    imagens: string | null; 
}

interface ErrorResponse {
    message: string;
}

const Mercadorias: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [codigo, setCodigo] = useState("");
    const [valor, setValor] = useState("");
    const [quantidade, setQuantidade] = useState<string | number>(0);
    const [imagem, setImagem] = useState<File | null>(null);
    const [mercadorias, setMercadorias] = useState<Mercadoria[]>([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentMercadoriaId, setCurrentMercadoriaId] = useState<number | null>(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        resetForm();
    };

    const resetForm = () => {
        setDescricao("");
        setCodigo("");
        setValor("");
        setEditMode(false);
        setCurrentMercadoriaId(null);
        setSuccessMessage("");
        setErrorMessage("");
    };

    const fetchMercadorias = async () => {
        try {
          const response = await api.get('/api/mercadorias'); 
          setMercadorias(response.data); // Armazena os dados no estado
          console.log("Dados das mercadorias:", response.data);
        } catch (error) {
          console.error("Erro ao buscar mercadorias:", error);
        }
      };
      

    useEffect(() => {
        fetchMercadorias();
    }, []);

    const handleCadastrarMercadoria = async () => {
        try {
          // Formatação do valor
          const valorFormatado = parseFloat(valor.replace(',', '.'));
          if (isNaN(valorFormatado)) {
            setErrorMessage("Valor inválido.");
            return;
          }
      
          // Validação da quantidade
          const quantidadeFormatada = Number(quantidade); // Converte para número
          if (isNaN(quantidadeFormatada) || quantidadeFormatada < 0) { // Verifica se a quantidade é válida
            setErrorMessage("Quantidade inválida.");
            return;
          }
      
          const formData = new FormData();
          formData.append("codigo", codigo);
          formData.append("descricao", descricao);
          formData.append("preco_unitario", valorFormatado.toString());
          formData.append("quantidade", quantidadeFormatada.toString()); // Garantir que quantidade é uma string
      
          if (imagem && imagem instanceof File) {
            formData.append("imagem", imagem); // Adicione a imagem ao FormData
          }
      
          // Envio dos dados para a API
          await api.post<Mercadoria>('/api/mercadorias', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          await fetchMercadorias(); // Atualiza a lista de mercadorias
          togglePopup(); // Fecha o popup
          setSuccessMessage("Mercadoria cadastrada com sucesso!");
        } catch (error) {
          console.error("Erro ao cadastrar mercadoria:", error);
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            setErrorMessage(`Erro: ${axiosError.response?.data.message || "Erro ao cadastrar mercadoria."}`);
          } else {
            setErrorMessage("Erro desconhecido ao cadastrar mercadoria.");
          }
        }
      };
      
      
      const handleEditarMercadoria = async () => {
        if (currentMercadoriaId === null) return;
    
        try {
            const valorFormatado = parseFloat(valor.replace(',', '.'));
            if (isNaN(valorFormatado)) {
                setErrorMessage("Valor inválido.");
                return;
            }
    
            // Faz a requisição para atualizar a mercadoria
            await api.put<Mercadoria>(`/api/mercadorias/${currentMercadoriaId}`, { 
                descricao, 
                codigo, 
                preco_unitario: valorFormatado,
                quantidade: quantidade // Adicione a quantidade aqui
            });
    
            // Recarrega as mercadorias
            await fetchMercadorias(); // Chame a função que busca as mercadorias
            togglePopup();
            setSuccessMessage("Mercadoria editada com sucesso!");
        } catch (error) {
            console.error("Erro ao editar mercadoria:", error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                setErrorMessage(`Erro: ${axiosError.response?.data.message || "Erro ao editar mercadoria."}`);
            } else {
                setErrorMessage("Erro desconhecido ao editar mercadoria.");
            }
        }
    };
    
    

    const handleExcluirMercadoria = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir esta mercadoria?")) return;

        try {
            await api.delete(`/api/mercadorias/${id}`);
            setMercadorias((prev) => prev.filter((mercadoria) => mercadoria.id_mercadoria !== id));
            setSuccessMessage("Mercadoria excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir mercadoria:", error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                setErrorMessage(`Erro: ${axiosError.response?.data.message || "Erro ao excluir mercadoria."}`);
            } else {
                setErrorMessage("Erro ao excluir mercadoria. Verifique a conexão com o servidor.");
            }
        }
    };

    const handleOpenEditPopup = (mercadoria: Mercadoria) => {
        setCodigo(mercadoria.codigo);
        setDescricao(mercadoria.descricao);
        setValor(mercadoria.preco_unitario.toString());
        setCurrentMercadoriaId(mercadoria.id_mercadoria);
        setEditMode(true);
        setIsOpen(true);
    };

    return (
        <div>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <i className="fas fa-box-open mr-2"></i>
                    <h1 className="text-xl font-bold">Sistema de Estoque</h1>
                </div>
                <nav>
                    <a href="/mercadorias" className="mr-4">Mercadorias</a>
                </nav>
            </header>

            <main className="p-4 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Mercadorias</h2>
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
    <thead>
        <tr>
            <th className="py-2 px-4 border-b">Código</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">Valor</th>
            <th className="py-2 px-4 border-b">Quantidade</th>
            <th className="py-2 px-4 border-b">Imagem</th> {/* Coluna de imagem posicionada antes da coluna de ações */}
            <th className="py-2 px-4 border-b">Ações</th>
        </tr>
    </thead>
    <tbody>
        {mercadorias.map((mercadoria) => (
            <tr key={mercadoria.id_mercadoria}>
                <td className="py-2 px-4 border-b text-center">{mercadoria.codigo}</td>
                <td className="py-2 px-4 border-b text-center">{mercadoria.descricao}</td>
                <td className="py-2 px-4 border-b text-center">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(mercadoria.preco_unitario)}
                </td>
                <td className="py-2 px-4 border-b text-center">{mercadoria.quantidade}</td>
                <td className="py-2 px-4 border-b text-center">
                    {mercadoria.imagens ? (
                        <img 
                            src={mercadoria.imagens} 
                            alt="Imagem da mercadoria" 
                            className="w-16 h-16 object-cover mx-auto"
                        />
                    ) : (
                        <span>Sem imagem</span>
                    )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center">
                        <button 
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 mx-1" 
                            onClick={() => handleOpenEditPopup(mercadoria)}>
                            Editar
                        </button>
                        <button 
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 mx-1" 
                            onClick={() => handleExcluirMercadoria(mercadoria.id_mercadoria)}>
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>

</div>


                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={togglePopup}>
                    Cadastrar Mercadoria
                </button>

                {isOpen && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{editMode ? "Editar Mercadoria" : "Cadastro de Mercadoria"}</h2>
                <button className="text-gray-500" onClick={togglePopup}>
                    &times;
                </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); editMode ? handleEditarMercadoria() : handleCadastrarMercadoria(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Código:</label>
                    <input
                        type="text"
                        placeholder="0000"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Descrição:</label>
                    <input
                        type="text"
                        placeholder="Descrição da mercadoria"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Valor:</label>
                    <input
                        type="text"
                        placeholder="R$ 0,00"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Quantidade:</label>
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={typeof quantidade === 'number' ? quantidade.toString() : ''}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Imagem:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setImagem(e.target.files[0]);
                            }
                        }}
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    {editMode ? "Salvar Alterações" : "Cadastrar"}
                </button>
            </form>
        </div>
    </div>
)}

            </main>
        </div>
    );
};

export default Mercadorias;
