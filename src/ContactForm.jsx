import './ContactForm.css';

function ContactForm() {
  return (
    <div className="contact-form-container">
      <form name="contact" method="POST" data-netlify="true" className="contact-form">
        <h2>Entre em Contato</h2>
        <input type="text" name="name" placeholder="Nome" required />
        <input type="text" name="phone" placeholder="Telefone" required />
        <textarea name="message" placeholder="Mensagem" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ContactForm;
