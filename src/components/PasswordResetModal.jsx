import React, { useState } from 'react';
import './PasswordResetModal.css';

const PasswordResetModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [email, setEmail] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleSubmit = () => {
        onSubmit(email);
        setEmail(''); // Limpa o campo após o envio
    };

    return (
        <div className="modal-overlay" onClick={onRequestClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Redefinir Senha</h2>
                <p>Digite seu e-mail para receber um link de redefinição de senha.</p>
                <input
                    type="email"
                    className="modal-input"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="modal-actions">
                    <button onClick={onRequestClose} className="modal-button secondary">Cancelar</button>
                    <button onClick={handleSubmit} className="modal-button primary">Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetModal;
