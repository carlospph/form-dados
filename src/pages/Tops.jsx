import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../HomeTintas.css';
import './Tops.css';

const tops = [
    {
        id: 1,
        titulo: "Pintura Externa",
        imagem: "https://plus.unsplash.com/premium_photo-1683140636442-87a7d5794711?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        descricao: "Pintura externa com tinta impermeabilizante",
        detalhes: "A pintura externa é essencial para proteger sua casa das intempéries. Usamos tintas de alta qualidade que garantem a durabilidade e a beleza da sua fachada por muito mais tempo. Além disso, uma boa pintura externa valoriza o seu imóvel.",
        thumbnails: [
            "https://plus.unsplash.com/premium_photo-1683140636442-87a7d5794711?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1600829322384-428ce2a42a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
    },
    {
        id: 2,
        titulo: "Pintura Interna",
        imagem: "https://images.unsplash.com/photo-1596184133584-2a9d81b4d327?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        descricao: "Pintura rústica com efeitos especiais",
        detalhes: "A pintura interna é a alma da sua casa. Com as cores e texturas certas, você pode criar ambientes aconchegantes e cheios de personalidade. Trabalhamos com diversas técnicas, como a pintura rústica, que traz um charme especial para qualquer cômodo.",
        thumbnails: [
            "https://images.unsplash.com/photo-1596184133584-2a9d81b4d327?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
    }
];

const Tops = () => {
    const { id } = useParams();
    const top = tops.find(t => t.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        if (top) {
            setSelectedImage(top.imagem);
        }
    }, [top]);

    if (!top) {
        return <div>Serviço não encontrado!</div>;
    }

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="App">
            <header className="header">
                <nav className="navbar">
                    <div className="logo">
                        <Link to="/"><h1>Pinturas & Cia</h1></Link>
                    </div>
                </nav>
            </header>
            <section className="hero">
                <div className="hero-content">
                    <div className="form-container">
                        <img src={selectedImage} alt={top.titulo} className="main-image" />
                        <div className="thumbnail-gallery">
                            {top.thumbnails.map((thumbnail, index) => (
                                <img
                                    key={index}
                                    src={thumbnail}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail ${selectedImage === thumbnail ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(thumbnail)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="hero-text">
                        <h1>{top.titulo}</h1>
                        <p>{top.detalhes}</p>
                        <Link to="/">
                            <button className="btn-secondary">Voltar</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Tops;
