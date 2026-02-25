import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const priceList = {
    latex: 8,      // R$ 8/m²
    acrilica: 10,   // R$ 10/m²
    esmalte: 12,    // R$ 12/m²
    epoxi: 15,      // R$ 15/m²
};

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
    const [formData, setFormData] = useState({
        paintingType: 'latex',
        colorType: 'solidas',
        area: '',
        environmentType: 'residencial',
        details: ''
    });
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const { paintingType, area } = formData;
        if (paintingType && area > 0) {
            const pricePerMeter = priceList[paintingType];
            const calculatedPrice = pricePerMeter * parseFloat(area);
            setTotalPrice(calculatedPrice);
        } else {
            setTotalPrice(0);
        }
    }, [formData.paintingType, formData.area]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.area || !formData.details.trim()) {
            alert('Por favor, preencha o tamanho do ambiente e os detalhes do orçamento.');
            return;
        }
        const budgetData = {
            ...formData,
            totalPrice: totalPrice,
        };
        onSave(budgetData);
        setFormData({
            paintingType: 'latex',
            colorType: 'solidas',
            area: '',
            environmentType: 'residencial',
            details: ''
        });
        setTotalPrice(0);
    };
    
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
                <option value="latex">Látex (PVA) - R$ 8/m²</option>
                <option value="acrilica">Acrílica - R$ 10/m²</option>
                <option value="epoxi">Epóxi - R$ 15/m²</option>
                <option value="esmalte">Esmalte Sintético - R$ 12/m²</option>
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

            {totalPrice > 0 && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9f5ff', borderRadius: '5px', textAlign: 'center', border: '1px solid #b3d7ff' }}>
                    <h3 style={{ margin: 0, color: '#005fcc' }}>
                        Valor Estimado: {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </h3>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={onRequestClose} style={{ padding: '10px 20px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', background: '#f0f0f0', cursor: 'pointer' }}>Cancelar</button>
                <button onClick={handleSave} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}>Salvar Orçamento</button>
            </div>
        </Modal>
    );
};

export default BudgetModal;
