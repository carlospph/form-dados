import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import PasswordResetModal from '../components/PasswordResetModal'; // Importa o modal
import '../HomeTintas.css'; // Estilos gerais
import './LoginPage.css'; // Estilos da página de Login

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para o modal
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate('/dashboard'); // Redireciona para o painel do usuário
        } catch (error) {
            setError("Falha no login. Verifique seu e-mail e senha.");
            console.error("Login error:", error);
        }
    };

    const handlePasswordResetRequest = async (email) => {
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert("Um link para redefinição de senha foi enviado para o seu e-mail.");
                setModalIsOpen(false);
            } catch (error) {
                setError("Erro ao enviar o e-mail de redefinição. Verifique o e-mail digitado.");
                console.error("Password reset error:", error);
            }
        }
    };

    return (
        <>
            <div className="login-background"></div>
            <div className="login-container">
                <div className="login-card">
                    <h2>Login</h2>
                    <p>Acesse seu painel para gerenciar seus orçamentos.</p>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="login-btn">Entrar</button>
                    </form>
                    <div className="login-footer">
                        <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
                        <p><a href="#" onClick={() => setModalIsOpen(true)} style={{color: '#007bff', textDecoration: 'none'}}>Esqueci minha senha</a></p>
                    </div>
                </div>
            </div>
            <PasswordResetModal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onSubmit={handlePasswordResetRequest}
            />
        </>
    );
};

export default LoginPage;
