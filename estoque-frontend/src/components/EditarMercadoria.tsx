import React, { useState } from "react";

const EditarCategoria: React.FC = () => {

    const [descricao, setDescricao] = useState("Smartphone 5\"");
    const [preco, setPreco] = useState("999,99");

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-4">
                <h1 className="text-2xl font-semibold mb-6 text-center">Edição de mercadoria</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codigo">
                            Código
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="codigo"
                            type="text"
                            value="000004"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao">
                            Descrição
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="descricao"
                            rows={2}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preco">
                            Preço unitário
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                R$
                            </span>
                            <input
                                className="shadow appearance-none border rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="preco"
                                type="text"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Editar mercadoria
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarCategoria;
