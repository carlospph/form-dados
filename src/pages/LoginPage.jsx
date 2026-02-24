import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { auth } from '../config/firebase'; // Import auth from your config
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import './LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!formData.email || !formData.password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            alert('Login bem-sucedido!');
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (error) {
            // Handle Firebase authentication errors
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('Nenhum usuário encontrado com este e-mail.');
                    break;
                case 'auth/wrong-password':
                    setError('Senha incorreta.');
                    break;
                case 'auth/invalid-email':
                    setError('O formato do e-mail é inválido.');
                    break;
                default:
                    setError('Falha no login. Por favor, tente novamente.');
                    break;
            }
            console.error("Firebase login error:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="login-page">
                <div className="login-container">
                    <div className="login-header">
                        <h2>Acesse sua Conta</h2>
                        <p>Bem-vindo de volta! Faça login para continuar.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
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
                        <div className="form-options">
                            <label>
                                <input type="checkbox" name="remember" />
                                Lembrar de mim
                            </label>
                            <Link to="/forgot-password">Esqueceu a senha?</Link>
                        </div>
                        <button type="submit" className="login-btn">Entrar</button>
                    </form>
                    <div className="login-footer">
                        <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
