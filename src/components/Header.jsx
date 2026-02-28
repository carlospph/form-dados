import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../HomeTintas.css';
import RegisterPage from '../pages/RegisterPage';

const Header = () => {
    const [visible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!visible);
    };

    return (
        <header className="header">
            <nav className="navbar">

                <div className="logo">
                    <Link to="/"><h1>Casa & Cores</h1></Link>
                </div>

                {
                    visible && (
                        <ul className="nav-menu" onClick={toggleMenu}>
                             <li><a href="/#servicos" onClick={toggleMenu}>Serviços</a></li>
                            <li><a href="/#servicos-detalhados" onClick={toggleMenu}>Serviços Detalhados</a></li>
                            <li><a href="/#projetos" onClick={toggleMenu}>Projetos</a></li>
                            <li><a href="/#contato" onClick={toggleMenu}>Contato</a></li>
                            <li><a href="/#tops" onClick={toggleMenu}>Os Tops</a></li>
                            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                            <li><Link to="/register" onClick={RegisterPage}>Cadastrar-me</Link></li>
                        </ul>
                    )
                }

                <button className="lg:hidden">
                    <i className="fas fa-bars" onClick={toggleMenu}></i>
                </button>

                <ul className="lg:flex gap-6 hidden">
                    <li><a href="/#servicos">Serviços</a></li>
                    <li><a href="/#servicos-detalhados">Serviços Detalhados</a></li>
                    <li><a href="/#projetos">Projetos</a></li>
                    <li><a href="/#contato">Contato</a></li>
                    <li><a href="/#tops">Os Tops</a></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Cadastrar-me</Link></li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;
