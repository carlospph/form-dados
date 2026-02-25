import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../HomeTintas.css';

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
                            <li><a href="/#home" onClick={toggleMenu}>Home</a></li>
                            <li><a href="/#servicos" onClick={toggleMenu}>Serviços</a></li>
                            <li><a href="/#servicos-detalhados" onClick={toggleMenu}>Serviços Detalhados</a></li>
                            <li><a href="/#projetos" onClick={toggleMenu}>Projetos</a></li>
                            <li><a href="/#contato" onClick={toggleMenu}>Contato</a></li>
                            <li><a href="/#tops" onClick={toggleMenu}>Os Tops</a></li>
                            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                        </ul>
                    )
                }

                <i className="fas fa-bars" onClick={toggleMenu}></i>
            </nav>
        </header>
    );
};

export default Header;
