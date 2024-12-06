import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ModalAlert from './modais/modalAlert';
import i18n from '../i18nextConfig';

const Navbar = ({ onLogout }) => {
    const { t } = useTranslation();
    const [showExitModal, setShowExitModal] = useState(false); // Estado para o modal
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para menu móvel

    const handleLogout = () => {
        // Chama a função de logout passada como prop
        onLogout();
        setShowExitModal(false);
        setIsMobileMenuOpen(false);
    };

    const closeModal = () => {
        setShowExitModal(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo e Links de Navegação */}
                    <div className="flex">
                        {/* Espaço para Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <NavLink to="/home" className="text-xl font-bold text-cyan-600">
                                {/* Substitua pelo seu logo ou nome da aplicação */}
                                {t('Gerência')}
                            </NavLink>
                        </div>
                        {/* Links de Navegação (Ocultos em dispositivos móveis) */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink
                                to="/home"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                                        ? 'border-cyan-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-cyan-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                {t('Home')}
                            </NavLink>
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                                        ? 'border-cyan-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-cyan-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                {t('Produtos')}
                            </NavLink>
                        </div>
                    </div>

                    {/* Botões à Direita */}
                    <div className="flex items-center space-x-6">
                        {/* Seletor de Idioma */}
                        <div className="hidden sm:block">
                            <select
                                onChange={(e) => {
                                    const selectedLang = e.target.value;
                                    localStorage.setItem('language', selectedLang);
                                    i18n.changeLanguage(selectedLang); // Atualiza o idioma sem recarregar a página
                                }}
                                defaultValue={localStorage.getItem('language') || 'pt'}
                                className="..."
                                aria-label={t('Selecione o idioma')}
                            >
                                <option value="pt">{t('Português')}</option>
                                <option value="en">{t('Inglês')}</option>
                                <option value="ru">{t('Russo')}</option>
                            </select>
                        </div>

                        {/* Botão de Logout */}
                        <button
                            onClick={() => setShowExitModal(true)} // Abrir o modal ao clicar
                            className="hidden sm:flex items-center bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-300"
                            aria-label={t('Sair')}
                        >
                            {t('Sair')}
                        </button>

                        {/* Botão de Menu Móvel */}
                        <div className="sm:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">{isMobileMenuOpen ? t('Fechar menu') : t('Abrir menu')}</span>
                                {isMobileMenuOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Móvel */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="pt-2 pb-3 space-y-1">
                            <NavLink
                                to="/home"
                                onClick={() => setIsMobileMenuOpen(false)} // Fechar menu ao clicar
                                className={({ isActive }) =>
                                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                                        ? 'bg-cyan-50 border-cyan-500 text-cyan-700'
                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-cyan-500 hover:text-cyan-700'
                                    }`
                                }
                            >
                                {t('Home')}
                            </NavLink>
                            <NavLink
                                to="/products"
                                onClick={() => setIsMobileMenuOpen(false)} // Fechar menu ao clicar
                                className={({ isActive }) =>
                                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                                        ? 'bg-cyan-50 border-cyan-500 text-cyan-700'
                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-cyan-500 hover:text-cyan-700'
                                    }`
                                }
                            >
                                {t('Produtos')}
                            </NavLink>
                            {/* Seletor de Idioma no Menu Móvel */}
                            <div className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                <select
                                    onChange={(e) => {
                                        const selectedLang = e.target.value;
                                        localStorage.setItem('language', selectedLang);
                                        window.location.reload();
                                    }}
                                    defaultValue={localStorage.getItem('language') || 'pt'}
                                    className="w-full bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                    aria-label={t('Selecione o idioma')}
                                >
                                    <option value="pt">{t('Português')}</option>
                                    <option value="en">{t('Inglês')}</option>
                                    <option value="ru">{t('Russo')}</option>
                                </select>
                            </div>
                            {/* Botão de Logout no Menu Móvel */}
                            <button
                                onClick={() => {
                                    setShowExitModal(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-cyan-500 hover:text-cyan-700"
                                aria-label={t('Sair')}
                            >
                                {t('Sair')}
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal de Confirmação de Logout */}
                <ModalAlert
                    isOpen={showExitModal}
                    onClose={closeModal}
                    onConfirm={handleLogout}
                    message={t('Você realmente deseja sair e voltar para a tela de login?')}
                    modalType="CONFIRMACAO"
                />
            </div>
        </nav>
    );
};

export default Navbar;
