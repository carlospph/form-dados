import React, { useState } from 'react';
import Modal from 'react-modal';

// Estilos para o Modal (não precisam ser alterados)
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

Modal.setAppElement('#root');

const BudgetModal = ({ isOpen, onRequestClose, onSave }) => {
    // Estado para todos os campos do formulário
    const [formData, setFormData] = useState({
        paintingType: 'latex',
        colorType: 'solidas',
        area: '',
        environmentType: 'residencial',
        details: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Validação simples
        if (!formData.area || !formData.details.trim()) {
            alert('Por favor, preencha o tamanho do ambiente e os detalhes do orçamento.');
            return;
        }
        onSave(formData); // Envia o objeto completo
        // Reseta o formulário, exceto os selects que têm valor padrão
        setFormData({
            paintingType: 'latex',
            colorType: 'solidas',
            area: '',
            environmentType: 'residencial',
            details: ''
        });
    };
    
    // Estilos para os componentes do formulário
    const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };
    const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Gerar Novo Orçamento"
        >
            <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>Novo Orçamento</h2>
            
            <label style={labelStyle}>Tipo de Pintura</label>
            <select name="paintingType" value={formData.paintingType} onChange={handleChange} style={inputStyle}>
                <option value="latex">Látex (PVA)</option>
                <option value="acrilica">Acrílica</option>
                <option value="epoxi">Epóxi</option>
                <option value="esmalte">Esmalte Sintético</option>
            </select>

            <label style={labelStyle}>Seleção de Cores</label>
            <select name="colorType" value={formData.colorType} onChange={handleChange} style={inputStyle}>
                <option value="solidas">Cores Sólidas</option>
                <option value="gradientes">Cores em Gradiente</option>
                <option value="mistas">Cores Mistas / Efeitos</option>
            </select>
            
            <label style={labelStyle}>Tipo de Ambiente</label>
            <select name="environmentType" value={formData.environmentType} onChange={handleChange} style={inputStyle}>
                <option value="residencial">Residencial</option>
                <option value="objetos">Móveis e Objetos</option>
                <option value="industrial">Industrial</option>
                <option value="fachadas">Fachadas</option>
                <option value="predial">Predial</option>
            </select>
            
            <label style={labelStyle}>Tamanho do Ambiente (m²)</label>
            <input 
                type="number" 
                name="area"
                value={formData.area} 
                onChange={handleChange} 
                placeholder="Ex: 25" 
                style={inputStyle} 
            />

            <label style={labelStyle}>Detalhes Adicionais</label>
            <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Ex: preparar a parede, pintar o teto de branco, etc."
                style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={onRequestClose} style={{ padding: '10px 20px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', background: '#f0f0f0', cursor: 'pointer' }}>Cancelar</button>
                <button onClick={handleSave} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}>Salvar Orçamento</button>
            </div>
        </Modal>
    );
};

export default BudgetModal;
