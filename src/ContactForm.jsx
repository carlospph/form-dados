function ContactForm() {
  return (
    <form name="contact" method="POST" data-netlify="true">
      <input type="text" name="name" placeholder="Nome" required />
      <input type="text" name="phone" placeholder="Telefone" required />
      <textarea name="message" placeholder="Mensagem" required></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;