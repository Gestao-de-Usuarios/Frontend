import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import ModalAlert from './modais/modalAlert';
import { Pagination } from './pagination';
import '../i18nextConfig';
import { useTranslation } from 'react-i18next';
import i18n from '../i18nextConfig';
import Navbar from './Navbar'; // Importar o Navbar

const Products = ({ onLogout }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const pageSize = 10;

    const token = localStorage.getItem('token');

    const currentPageProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return products.slice(startIndex, endIndex);
    }, [products, currentPage, pageSize]);

    const handleUnauthorized = () => {
        // Caso não haja token ou seja inválido, redireciona para o login
        localStorage.removeItem('token');
        localStorage.removeItem('tipo_usuario');
        navigate('/login');
    };

    const fetchProducts = async () => {
        if (!token) {
            handleUnauthorized();
            return;
        }

        try {
            const response = await fetch('/products', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError('Erro ao carregar os produtos.');
        }
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage); // Define o idioma salvo
        }

        // Antes de tudo, verifica se existe token. Se não, redireciona.
        if (!token) {
            handleUnauthorized();
        } else {
            fetchProducts();
        }
    }, []);


    
    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-600 to-cyan-500 flex flex-col items-center p-4">
            {/* Navbar */}
            <Navbar onLogout={onLogout} />

            {/* Restante do conteúdo */}
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mt-8 relative">
                <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">
                    {t('Produtos Disponíveis')}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 text-center mb-6">
                    {t('Aqui você pode visualizar a lista de produtos.')}
                </p>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Tabela de Produtos */}
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-cyan-600 text-white">
                                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('ID')}</th>
                                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Nome')}</th>
                                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Preço')}</th>
                                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Categoria')}</th>
                                <th className="px-4 sm:px-6 py-3 text-left font-semibold">{t('Estoque')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentPageProducts.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-4 sm:px-6 py-3 text-gray-800">{product.id}</td>
                                    <td className="px-4 sm:px-6 py-3 text-gray-800">{product.nome}</td>
                                    <td className="px-4 sm:px-6 py-3 text-gray-800">R$ {product.preco.toFixed(2)}</td>
                                    <td className="px-4 sm:px-6 py-3 text-gray-800">{product.categoria}</td>
                                    <td className="px-4 sm:px-6 py-3 text-gray-800">{product.estoque}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="flex justify-center mt-6">
                    <Pagination
                        totalCount={products.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
