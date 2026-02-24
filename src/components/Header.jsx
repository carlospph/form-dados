import React from 'react';
import { Link } from 'react-router-dom';
import '../HomeTintas.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo">
                     <Link to="/"><h1>Pinturas & Cia</h1></Link>
                </div>
                <ul className="nav-menu">
                    <li><a href="/#home">Home</a></li>
                    <li><a href="/#servicos">Serviços</a></li>
                    <li><a href="/#servicos-detalhados">Serviços Detalhados</a></li>
                    <li><a href="/#projetos">Projetos</a></li>
                    <li><a href="/#contato">Contato</a></li>
                    <li><a href="/#tops">Os Tops</a></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
