import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './HomeTintas.css';

function HomeTintas() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoServico: '',
    mensagem: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Por favor, preencha todos os campos obrigatórios.'
      });
      return;
    }

    try {
      // Aqui você pode integrar com seu backend ou serviço de email
      const response = await fetch('sua-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Obrigado! Em breve entraremos em contato.'
        });
        
        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          tipoServico: '',
          mensagem: ''
        });
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Erro ao enviar. Tente novamente ou ligue para (11) 99999-9999'
      });
    }
  };

  // Array de serviços detalhados
  const servicosDetalhados = [
    {
      id: 1,
      titulo: "Pintura Residencial",
      descricao: "Transformamos sua casa com cores e qualidade profissional. Trabalhamos com apartamentos, casas e coberturas.",
      beneficios: [
        "Proteção contra umidade",
        "Valorização do imóvel",
        "Ambientes mais aconchegantes",
        "Durabilidade garantida"
      ],
      icone: "🏠",
      cor: "#3498db"
    },
    {
      id: 2,
      titulo: "Pintura Comercial",
      descricao: "Ambientes corporativos com acabamento impecável. Especialistas em lojas, escritórios, restaurantes e galerias.",
      beneficios: [
        "Trabalho fora do horário comercial",
        "Mínima interferência nos negócios",
        "Tintas de secagem rápida",
        "Acabamento profissional"
      ],
      icone: "🏢",
      cor: "#e74c3c"
    },
    {
      id: 3,
      titulo: "Pintura de Fachadas",
      descricao: "Renove a aparência do seu imóvel com nossa equipe especializada em trabalhos em altura.",
      beneficios: [
        "Equipe treinada para trabalho em altura",
        "Tintas impermeabilizantes",
        "Proteção contra intempéries",
        "Andaimes e balancins seguros"
      ],
      icone: "🏛️",
      cor: "#27ae60"
    },
    {
      id: 4,
      titulo: "Pintura Industrial",
      descricao: "Soluções para galpões, fábricas e estruturas metálicas. Aplicamos tintas epóxi, esmaltes sintéticos e revestimentos especiais para alta performance.",
      beneficios: [
        "Tintas epóxi para pisos",
        "Proteção anticorrosiva",
        "Alta resistência química",
        "Durabilidade em ambientes agressivos"
      ],
      icone: "🏭",
      cor: "#f39c12"
    },
    {
      id: 5,
      titulo: "Texturas e Efeitos",
      descricao: "Acabamentos especiais para ambientes únicos. Grafiatos, texturas acrílicas, efeito madeira.",
      beneficios: [
        "Ampla variedade de texturas",
        "Efeitos decorativos exclusivos",
        "Valorização estética",
        "Personalização completa"
      ],
      icone: "🎨",
      cor: "#9b59b6"
    },
    {
      id: 6,
      titulo: "Isolamento Hídrico",
      descricao: "Proteção completa contra infiltrações e umidade: mantas asfálticas, tinta impermeabilizante e revestimentos.",
      beneficios: [
        "Solução definitiva para infiltrações",
        "Garantia de 5 anos",
        "Prevenção de mofo e bolor",
        "Aumento da vida útil da construção"
      ],
      icone: "💧",
      cor: "#1abc9c"
    }
  ];

  // Array de projetos
  const projetos = [
    {
      id: 1,
      titulo: "Apartamento Moderno",
      categoria: "Residencial",
      imagem: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      descricao: "Pintura completa com textura acrílica"
    },
    {
      id: 2,
      titulo: "Fachada Comercial",
      categoria: "Comercial",
      imagem: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      descricao: "Pintura externa com tinta impermeabilizante"
    },
    {
      id: 3,
      titulo: "Casa de Campo",
      categoria: "Residencial",
      imagem: "https://images.unsplash.com/photo-1512917774080-9mm91f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      descricao: "Pintura rústica com efeitos especiais"
    },
    {
      id: 4,
      titulo: "Escritório Corporativo",
      categoria: "Comercial",
      imagem: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      descricao: "Ambientes corporativos com cores institucionais"
    }
  ];
  const tops = [
    {
      id: 1,
      titulo: "Pintura externa",
      imagem: "https://plus.unsplash.com/premium_photo-1683140636442-87a7d5794711?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Pintura externa com tinta impermeabilizante"
    },
    {
      id: 2,
      titulo: "Pintura interna",
      imagem: "https://images.unsplash.com/photo-1596184133584-2a9d81b4d327?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Pintura rústica com efeitos especiais"
    }
  ]

  return (
    <div className="App">
      <Header />

      {/* Hero Section com Formulário */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Transformamos suas paredes em obras de arte</h1>
            <p>Há mais de 10 anos oferecendo serviços de pintura residencial e comercial com qualidade e pontualidade.</p>
            <div className="hero-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Projetos Entregues</p>
              </div>
              <div className="stat">
                <h3>150+</h3>
                <p>Clientes Satisfeitos</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Anos de Experiência</p>
              </div>
            </div>
          </div>

          {/* Formulário em Destaque */}
          <div className="form-container">
            <h2>Solicite um Orçamento Grátis</h2>
            <p>Preencha o formulário e receba uma proposta personalizada</p>
            
            {formStatus.submitted && (
              <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome Completo *"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Telefone/WhatsApp *"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  name="tipoServico"
                  value={formData.tipoServico}
                  onChange={handleChange}
                >
                  <option value="">Tipo de Serviço</option>
                  <option value="residencial">Pintura Residencial</option>
                  <option value="comercial">Pintura Comercial</option>
                  <option value="fachada">Pintura de Fachada</option>
                  <option value="textura">Textura e Efeitos</option>
                  <option value="impermeabilizacao">Impermeabilização</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  name="mensagem"
                  placeholder="Descreva o serviço desejado (opcional)"
                  rows="4"
                  value={formData.mensagem}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Solicitar Orçamento
              </button>
            </form>

            <div className="form-footer">
              <p>Ou ligue: (11) 99999-9999</p>
              <small>Retornamos em até 2 horas</small>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Serviços (Visão Geral) */}
      <section id="servicos" className="servicos">
        <h2>Nossos Serviços</h2>
        <p className="section-subtitle">Soluções completas para todos os tipos de pintura</p>
        <div className="servicos-grid">
          <div className="servico-card">
            <div className="servico-icon">🏠</div>
            <h3>Pintura Residencial</h3>
            <p>Transformamos sua casa com cores e qualidade profissional.</p>
          </div>
          <div className="servico-card">
            <div className="servico-icon">🏢</div>
            <h3>Pintura Comercial</h3>
            <p>Ambientes corporativos com acabamento impecável.</p>
          </div>
          <div className="servico-card">
            <div className="servico-icon">🏛️</div>
            <h3>Fachadas</h3>
            <p>Renove a aparência do seu imóvel com nossa equipe especializada.</p>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: Serviços Detalhados */}
      <section id="servicos-detalhados" className="servicos-detalhados">
        <h2>Conheça Nossos Serviços em Detalhes</h2>
        <p className="section-subtitle">Soluções personalizadas para cada necessidade</p>
        
        <div className="servicos-detalhados-grid">
          {servicosDetalhados.map(servico => (
            <div className="servico-detalhado-card" key={servico.id}>
              <div className="servico-detalhado-header" style={{ backgroundColor: servico.cor }}>
                <span className="servico-detalhado-icon">{servico.icone}</span>
                <h3>{servico.titulo}</h3>
              </div>
              <div className="servico-detalhado-body">
                <p className="servico-detalhado-descricao">{servico.descricao}</p>
                <h4>Benefícios:</h4>
                <ul className="servico-beneficios">
                  {servico.beneficios.map((beneficio, index) => (
                    <li key={index}>
                      <span className="beneficio-check">✓</span>
                      {beneficio}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-saiba-mais" style={{ borderColor: servico.cor, color: servico.cor }}>
                  Solicitar Orçamento
                </button>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Projetos */}
      <section id="projetos" className="projetos">
        <h2>Nossos Projetos Recentes</h2>
        <p className="section-subtitle">Conheça alguns dos trabalhos que realizamos para nossos clientes</p>
        
        <div className="projetos-grid">
          {projetos.map(projeto => (
            <div className="projeto-card" key={projeto.id}>
              <div className="projeto-image">
                <img src={projeto.imagem} alt={projeto.titulo} loading="lazy" />
                <div className="projeto-overlay">
                  <span className="projeto-categoria">{projeto.categoria}</span>
                  <p className="projeto-descricao">{projeto.descricao}</p>
                </div>
              </div>
              <div className="projeto-info">
                <h3>{projeto.titulo}</h3>
                <span className="projeto-categoria-tag">{projeto.categoria}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projetos-cta">
          <button className="btn-secondary">Ver Mais Projetos</button>
        </div>
      </section>

      <section id="tops" className="projetos">
        <h2>Os Tops</h2>
        <p className="section-subtitle">Conheça os serviços mais pedidos</p>
        <div className="projetos-grid">
          {tops.map(top => (
            <Link to={`/tops/${top.id}`} key={top.id} className="projeto-card">
              <div className="projeto-image">
                <img src={top.imagem} alt={top.titulo} loading="lazy" />
                <div className="projeto-overlay">
                  <p className="projeto-descricao">{top.descricao}</p>
                </div>
              </div>
              <div className="projeto-info">
                <h3>{top.titulo}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Pinturas & Cia</h3>
            <p>Excelência em pintura há mais de 10 anos</p>
            <div className="footer-social">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📷</a>
            </div>
          </div>
          <div className="footer-contact">
            <h4>Contato Rápido</h4>
            <p>📞 (11) 99999-9999</p>
            <p>📧 contato@pinturascia.com.br</p>
            <p>📍 Av. Paulista, 1000 - São Paulo, SP</p>
          </div>
          <div className="footer-hours">
            <h4>Horário de Atendimento</h4>
            <p>Segunda a Sexta: 8h às 18h</p>
            <p>Sábado: 8h às 12h</p>
            <p>Emergência: 24h</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Pinturas & Cia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomeTintas;
