import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoMarca } from './Utils/LogoMarca';

// Estilos para os links do menu mobile
const SlinkMobile = "block py-4 px-6 text-xl border-b border-blue-500 hover:bg-blue-700 transition-colors";
// Estilos para os links do desktop
const SlinkDesktop = "hover:text-blue-600 transition-colors font-medium";

const Header = () => {
    const [visible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!visible);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-md">
            <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
                
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" onClick={() => setMenuVisible(false)}>
                        <LogoMarca />
                    </Link>
                </div>

                {/* Menu Desktop */}
                <ul className="hidden lg:flex items-center gap-8 text-gray-700">
                    <li><a href="/#servicos" className={SlinkDesktop}>Serviços</a></li>
                    <li><a href="/#servicos-detalhados" className={SlinkDesktop}>Detalhes</a></li>
                    <li><a href="/#projetos" className={SlinkDesktop}>Projetos</a></li>
                    <li><a href="/#contato" className={SlinkDesktop}>Contato</a></li>
                    <li><Link to="/login" className={SlinkDesktop}>Login</Link></li>
                    <li>
                        <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all">
                            Cadastrar-me
                        </Link>
                    </li>
                </ul>

                {/* Botão Hamburger (Mobile) */}
                <button 
                    className="lg:hidden text-gray-700 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Abrir menu"
                >
                    <i className={`fas ${visible ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                </button>

                {/* Menu Mobile Fullscreen */}
                <div className={`
                    fixed inset-0 top-[64px] bg-blue-600 text-white transition-transform duration-300 ease-in-out transform lg:hidden
                    ${visible ? 'translate-x-0' : 'translate-x-full'}
                `}>
                    <ul className="flex flex-col w-full h-full" onClick={toggleMenu}>
                        <li><a className={SlinkMobile} href="/#servicos">Serviços</a></li>
                        <li><a className={SlinkMobile} href="/#servicos-detalhados">Serviços Detalhados</a></li>
                        <li><a className={SlinkMobile} href="/#projetos">Projetos</a></li>
                        <li><a className={SlinkMobile} href="/#contato">Contato</a></li>
                        <li><Link className={SlinkMobile} to="/login">Login</Link></li>
                        <li><Link className={`${SlinkMobile} bg-yellow-400 text-blue-900 font-bold`} to="/register">Cadastrar-me</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;