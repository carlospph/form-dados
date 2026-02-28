import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import PasswordResetModal from '../components/PasswordResetModal';
import Header from '../components/Header';

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

    // Variáveis para TailwindCss

    const styledBody = "flex flex-col items-center justify-center min-h-screen bg-gray-100 p-3 pt-[5em]";

    const styleContainerForm = "bg-white shadow-md rounded-lg px-2 pt-8 pb-10 w-full max-w-sm";

    const styleTitle = "text-2xl font-bold text-center mb-4 md:text-5xl";

    const styleTema = "text-center text-gray-600 mb-6 md:text-2xl";

    const styleMsgErro = "text-red-500 text-center mb-4";

    const styleButton = "w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200";

    const styleContainerLinks = "flex flex-col items-center mt-5";

    const styleLink = "text-blue-600 hover:underline m-3";

    const styleFiel = "border-2 border-gray-200 block mt-2 py-3 px-2 w-full rounded-lg md:text-[20px]";

    return (
        <>
            <Header />
            <div className={styledBody}>
                <div className={styleContainerForm}>
                    <h2 className={styleTitle}>Área de Login</h2>
                    <p className={styleTema}>Acesse seu painel para gerenciar seus orçamentos.</p>

                    {error && <p className={styleMsgErro}>{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/*Campo email */}
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styleFiel}
                            />
                        </div>
                        {/* Campo senha */}
                        <div>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className={styleFiel}
                            />
                        </div>

                        <button type="submit" className={styleButton}>Entrar</button>
                    </form>
                    <div className={styleContainerLinks}>
                        <p>Não tem uma conta? <Link to="/register" className={styleLink}>Cadastre-se</Link></p>
                        <p>
                            <a href="#" onClick={() => setModalIsOpen(true)} className={styleLink}>Esqueci minha senha</a>
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
