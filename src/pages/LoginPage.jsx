import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import PasswordResetModal from '../components/PasswordResetModal';
import Header from '../components/Header';

import { styles } from './LoginPage.styles.js';
import { Button } from '../components/Utils/Button.jsx';
import { Campo } from '../components/Campo/Campo.jsx';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
            navigate('/dashboard');
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
            <Header />
            <div className={styles.body}>
                <div className={styles.containerForm}>
                    <h2 className={styles.title}>Área de Login</h2>
                    <p className={styles.tema}>Acesse seu painel para gerenciar seus orçamentos.</p>

                    {error && <p className={styles.msgErro}>{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <Campo
                                label="E-mail"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>

                            <Campo
                                label="Senha"
                                type="password"
                                name="password"
                                placeholder="Senha"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <Button text="Realizar login" bgcolor="bg-blue-600" color="text-white" />

                    </form>
                    <div className={styles.containerLinks}>
                        <p>Não tem uma conta? <Link to="/register" className={styles.link}>Cadastre-se</Link></p>
                        <p>
                            <a href="#" onClick={() => setModalIsOpen(true)} className={styles.link}>Esqueci minha senha</a>
                        </p>
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
