import React from 'react';
import './Summary.css';

const Summary = ({ budgets }) => {
    const approvedBudgets = budgets.filter(b => b.status === 'Aprovado');
    const pendingBudgets = budgets.filter(b => b.status !== 'Aprovado');

    const approvedTotal = approvedBudgets.reduce((acc, budget) => acc + (budget.totalPrice || 0), 0);
    const pendingTotal = pendingBudgets.reduce((acc, budget) => acc + (budget.totalPrice || 0), 0);

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="summary-container">
            <div className="summary-card approved-card">
                <h4>Aprovados</h4>
                <p className="summary-count">{approvedBudgets.length}</p>
                <p className="summary-total">{formatCurrency(approvedTotal)}</p>
            </div>
            <div className="summary-card pending-card">
                <h4>Pendentes</h4>
                <p className="summary-count">{pendingBudgets.length}</p>
                <p className="summary-total">{formatCurrency(pendingTotal)}</p>
            </div>
        </div>
    );
};

export default Summary;
