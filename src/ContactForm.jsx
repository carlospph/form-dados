import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    setError("");
    await fetch("https://us-central1-cadastro-simples-9c29e.cloudfunctions.net/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Mensagem enviada!");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input required type="text" placeholder="Nome" onChange={e => setFormData({...formData, name: e.target.value})}/>
      <input required type="text" placeholder="Telefone" onChange={e => setFormData({...formData, phone: e.target.value})}/>
      <textarea required placeholder="Mensagem" onChange={e => setFormData({...formData, message: e.target.value})}/>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;