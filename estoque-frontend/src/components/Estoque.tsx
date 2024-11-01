// src/components/Estoque.tsx

import React, { useState } from 'react';

const Estoque: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    <span className="font-bold">Sistema de Estoque</span>
                </div>
                <nav>
                    <a href="/mercadorias" className="mr-4">Mercadorias</a>
                    <a href="/estoque" className="font-bold">Estoque</a>
                </nav>
            </header>
            <main className="p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Estoque</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Cód.</th>
                                <th className="py-2 px-4 border-b">Desc.</th>
                                <th className="py-2 px-4 border-b">Preço unitário</th>
                                <th className="py-2 px-4 border-b">Preço total</th>
                                <th className="py-2 px-4 border-b">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Linhas de dados do estoque */}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={openModal}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    adicionar mercadoria ao estoque
                </button>

                {/* Popup */}
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Adição de mercadoria ao estoque</h2>
                                <button onClick={closeModal} className="text-gray-500">&times;</button>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Mercadoria</label>
                                <select className="w-full p-2 border border-gray-300 rounded">
                                    <option>Selecione</option>
                                    {/* Adicione opções aqui */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Quantidade</label>
                                <input type="number" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <button className="w-full bg-blue-600 text-white p-2 rounded">
                                adicionar mercadoria ao estoque
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Estoque;
