import React, { useState } from "react";

const Mercadorias: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [descricao, setDescricao] = useState("");

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescricao(e.target.value);
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
                <a href="/estoque" className="font-bold">Estoque</a>
                </nav>
            </header>
            <main className="p-4 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Mercadorias</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Código</th>
                                <th className="py-2 px-4 border-b">Descrição</th>
                                <th className="py-2 px-4 border-b">Valor</th>
                                <th className="py-2 px-4 border-b">Quantidade</th>
                                <th className="py-2 px-4 border-b">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4].map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="py-2 px-4 border-b"></td>
                                    <td className="py-2 px-4 border-b"></td>
                                    <td className="py-2 px-4 border-b"></td>
                                    <td className="py-2 px-4 border-b"></td>
                                    <td className="py-2 px-4 border-b"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={togglePopup}>
                    Cadastrar Mercadoria
                </button>

                {/* Popup */}
                {isOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Cadastro de Mercadoria</h2>
                                <button className="text-gray-500" onClick={togglePopup}>
                                    &times;
                                </button>
                            </div>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Código</label>
                                    <input type="text" placeholder="000000" className="w-full px-3 py-2 border rounded" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Descrição</label>
                                    <textarea 
                                        className="w-full px-3 py-2 border rounded" 
                                        rows={2} 
                                        placeholder="Descrição"
                                        value={descricao} 
                                        onChange={handleDescricaoChange} 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Preço unitário</label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 border border-r-0 rounded-l bg-gray-200">R$</span>
                                        <input type="text" placeholder="0,00" className="w-full px-3 py-2 border rounded-r" />
                                    </div>
                                </div>
                                <button type="button" className="w-full bg-blue-600 text-white py-2 rounded">Cadastrar Mercadoria</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Mercadorias;
