import React from 'react';
import { Link } from 'react-router-dom';
import { TituloSessao } from '../Utils/TituloSessao';
 
 const tops = [
  {
    id: 1,
    titulo: "Pintura externa",
    imagem: "https://images.unsplash.com/photo-1641408881526-cd924c665c2d?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Pintura externa com tinta impermeabilizante"
  },
  {
    id: 2,
    titulo: "Pintura interna",
    imagem: "https://plus.unsplash.com/premium_photo-1683120673588-682452cc83a0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Pintura rústica com efeitos especiais"
  }
]

const Tops = () => {
  return (
    <section id="tops" className="projetos">
       <TituloSessao text="...Melhores projetos"/>
      <p className="section-subtitle">Conheça os serviços mais pedidos</p>

         <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-16 max-w-6xl mx-auto">
          {tops.map(top => (
            <Link to={`/detalhesTops/${top.id}`} key={top.id} className="projeto-card">
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
  );
};

export default Tops;