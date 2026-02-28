import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import './RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        const { nome, email, password, confirmPassword } = formData;

        if (!nome || !email || !password || !confirmPassword) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Salva os dados do usuário no Firestore
            await setDoc(doc(db, "users", user.uid), {
                nome: nome,
                email: email
            });

            alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="px-2 pt-[100px] pb-8 bg-gray-200">
                <div className="shadow-md px-3 bg-white rounded-lg py-8">
                    <div className="text-center">
                        <h2 className="text-5xl font-bold">Crie sua Conta</h2>
                        <p className="py-3">É rápido e fácil. Vamos começar!</p>
                    </div>
                    <form onSubmit={handleSubmit} className="register-form">
                        {error && <div className="error-message">{error}</div>}

                <div className="lg:grid lg:grid-cols-2 lg:gap-8 max-w-6xl mx-auto">
                        <div className="form-group">
                            <label htmlFor="nome">Nome Completo</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome completo"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                                placeholder="Crie uma senha"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirme a Senha</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirme sua senha"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        </div>
                        <button type="submit" className="py-3 px-4 bg-green-600 text-white font-semibold text-[20px] mx-auto text-center">Cadastrar</button>
                    </form>
                    <div className="register-footer">
                        <p className="text-center mb-4">Já tem uma conta? <Link to="/login">Faça login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
