import React, { useState } from 'react';
import Header from './components/Header';
import Tops from './components/Tops/Tops';
import { TituloSessao } from './components/Utils/TituloSessao.jsx';

function HomeTintas() {
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', tipoServico: '', mensagem: ''
  });

  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefone) {
      setFormStatus({ submitted: true, success: false, message: 'Por favor, preencha os campos obrigatórios.' });
      return;
    }
    // Lógica de envio simulada
    setFormStatus({ submitted: true, success: true, message: 'Obrigado! Retornaremos em breve.' });
  };

  const servicosDetalhados = [
    { id: 1, titulo: "Pintura Residencial", descricao: "Transformamos sua casa com cores e qualidade profissional.", beneficios: ["Proteção contra umidade", "Valorização do imóvel"], icone: "🏠", cor: "bg-blue-500" },
    { id: 2, titulo: "Pintura Comercial", descricao: "Ambientes corporativos com acabamento impecável.", beneficios: ["Trabalho pós-horário", "Tintas secagem rápida"], icone: "🏢", cor: "bg-red-500" },
    { id: 3, titulo: "Pintura de Fachadas", descricao: "Renove a aparência com equipe especializada em altura.", beneficios: ["Trabalho em altura", "Impermeabilização"], icone: "🏛️", cor: "bg-green-600" },
    { id: 4, titulo: "Pintura Industrial", descricao: "Soluções para galpões e estruturas metálicas.", beneficios: ["Tintas epóxi", "Anticorrosiva"], icone: "🏭", cor: "bg-orange-500" },
    { id: 5, titulo: "Texturas e Efeitos", descricao: "Acabamentos especiais como Grafiatos e efeito madeira.", beneficios: ["Estética exclusiva", "Personalização"], icone: "🎨", cor: "bg-purple-500" },
    { id: 6, titulo: "Isolamento Hídrico", descricao: "Proteção completa contra infiltrações e mofo.", beneficios: ["Garantia de 5 anos", "Fim da umidade"], icone: "💧", cor: "bg-teal-500" }
  ];

  const projetos = [
    { id: 1, titulo: "Apartamento Moderno", categoria: "Residencial", imagem: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", descricao: "Pintura completa com textura" },
    { id: 2, titulo: "Fachada Comercial", categoria: "Comercial", imagem: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", descricao: "Tinta impermeabilizante" },
    { id: 3, titulo: "Escritório Corporativo", categoria: "Comercial", imagem: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", descricao: "Cores institucionais" }
  ];

  const inputStyle = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Transformamos suas paredes em <span className="text-blue-600">obras de arte</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Há mais de 10 anos oferecendo serviços de pintura residencial e comercial com qualidade, pontualidade e limpeza.
            </p>
            <div className="flex gap-8 border-t border-gray-200 pt-8">
              <div><h3 className="text-3xl font-bold text-blue-600">500+</h3><p className="text-sm text-gray-500">Projetos</p></div>
              <div><h3 className="text-3xl font-bold text-blue-600">150+</h3><p className="text-sm text-gray-500">Clientes</p></div>
              <div><h3 className="text-3xl font-bold text-blue-600">10+</h3><p className="text-sm text-gray-500">Anos</p></div>
            </div>
          </div>

          {/* Card de Formulário */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
            <TituloSessao text="Orçamento Grátis" />
            <p className="mb-6 text-gray-500">Receba uma proposta em até 2 horas.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="nome" placeholder="Nome Completo *" className={inputStyle} required onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <input type="email" name="email" placeholder="E-mail *" className={inputStyle} required onChange={handleChange} />
                <input type="tel" name="telefone" placeholder="WhatsApp *" className={inputStyle} required onChange={handleChange} />
              </div>
              <select name="tipoServico" className={inputStyle} onChange={handleChange}>
                <option value="">Tipo de Serviço</option>
                <option value="residencial">Pintura Residencial</option>
                <option value="comercial">Pintura Comercial</option>
              </select>
              <textarea name="mensagem" placeholder="Sua mensagem (opcional)" rows="3" className={inputStyle} onChange={handleChange}></textarea>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                Solicitar Orçamento Agora
              </button>
            </form>
            {formStatus.submitted && (
              <p className={`mt-4 text-center font-medium ${formStatus.success ? 'text-green-600' : 'text-red-500'}`}>{formStatus.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Seção de Serviços Detalhados */}
      <section id="servicos" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <TituloSessao text="Nossos Serviços Especializados" />
            <p className="text-gray-500 mt-2">Soluções completas com os melhores materiais do mercado.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicosDetalhados.map(servico => (
              <div key={servico.id} className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className={`${servico.cor} w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                  {servico.icone}
                </div>
                <h3 className="text-2xl font-bold mb-4">{servico.titulo}</h3>
                <p className="text-gray-600 mb-6">{servico.descricao}</p>
                <ul className="space-y-2 mb-8">
                  {servico.beneficios.map((b, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <span className="text-green-500 mr-2">✓</span> {b}
                    </li>
                  ))}
                </ul>
                <button className="text-blue-600 font-bold hover:underline">Ver detalhes →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos Recentes */}
      <section id="projetos" className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <TituloSessao text="Portfólio" />
              <h2 className="text-3xl font-bold mt-2">Nossos últimos trabalhos</h2>
            </div>
            <button className="hidden md:block border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-all">Ver todos</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projetos.map(p => (
              <div key={p.id} className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
                <img src={p.imagem} alt={p.titulo} className="object-cover w-full h-full group-hover:scale-110 transition-duration-500 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-all">
                  <span className="text-blue-400 text-sm font-bold mb-2 uppercase tracking-widest">{p.categoria}</span>
                  <h3 className="text-2xl font-bold">{p.titulo}</h3>
                  <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{p.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Tops />

      {/* Footer Profissional */}
      <footer id="contato" className="bg-gray-100 pt-20 pb-10 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black text-blue-600 mb-4 uppercase tracking-tighter">Pinturas & Cia</h2>
            <p className="text-gray-500 max-w-sm">Leve cor e vida para sua estrutura com quem entende de acabamento de alto padrão.</p>
            <div className="flex gap-4 mt-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-all">FB</div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-pink-600 hover:text-white transition-all">IG</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-500">
              <li>📞 (11) 99999-9999</li>
              <li>📧 contato@pinturascia.com.br</li>
              <li>📍 Av. Paulista, 1000, SP</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Horários</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Seg - Sex: 08h às 18h</li>
              <li>Sábado: 08h às 12h</li>
              <li className="text-blue-600 font-bold">Emergências: 24h</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-200 mt-16 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Pinturas & Cia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomeTintas;