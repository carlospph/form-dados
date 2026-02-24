import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css'; // Import the CSS file

const ContactForm = () => {
  const form = useRef();

  // Estado único para múltiplos campos
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_subject: '',
    service_type: 'Geral',
    message: ''
  });

  // Função para atualizar qualquer campo dinamicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Substitua pelos seus IDs do painel EmailJS
    const SERVICE_ID = 'service_m4gyd3p';
    const TEMPLATE_ID = 'template_b2nnjwg';
    const PUBLIC_KEY = 'QGdLqCftMp1SGZDvK';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          alert('Mensagem enviada com sucesso!');
          setFormData({ user_name: '', user_email: '', user_phone: '', user_subject: '', service_type: 'Geral', message: '' });
      }, (error) => {
          alert('Erro ao enviar: ' + error.text);
      });
  };

  return (
    <div className="contact-form-container">
      <h2>Solicitação de Serviços</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="user_name" placeholder="Nome" value={formData.user_name} onChange={handleChange} required />
        <input type="email" name="user_email" placeholder="E-mail" value={formData.user_email} onChange={handleChange} required />
        <input type="text" name="user_phone" placeholder="Telefone" value={formData.user_phone} onChange={handleChange} />
        <input type="text" name="user_subject" placeholder="Assunto" value={formData.user_subject} onChange={handleChange} />
        
        <select name="service_type" value={formData.service_type} onChange={handleChange}>
          <option value="Suporte">Suporte Técnico</option>
          <option value="Vendas">Vendas</option>
          <option value="Outros">Outros</option>
        </select>

        <textarea name="message" placeholder="Sua mensagem" value={formData.message} onChange={handleChange} required />
        
        <button type="submit">Enviar Formulário</button>
      </form>
    </div>
  );
};

export default ContactForm;