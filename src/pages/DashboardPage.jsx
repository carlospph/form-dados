import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, getDoc, collection, addDoc, query, where, onSnapshot, serverTimestamp, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import BudgetModal from '../components/BudgetModal';
import Summary from '../components/Summary';
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);

    const displayOrder = [
        'createdAt',
        'expiresAt',
        'environmentType',
        'area',
        'paintingType',
        'colorType',
        'details',
        'totalPrice',
        'status'
    ];

    useEffect(() => {
        let unsubscribeFromBudgets = () => {};
        const unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userDocPromise = getDoc(doc(db, "users", user.uid));
                    const budgetsQuery = query(collection(db, "budgets"), where("userId", "==", user.uid));
                    
                    unsubscribeFromBudgets = onSnapshot(budgetsQuery, (snapshot) => {
                        const updatedBudgets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setBudgets(updatedBudgets);
                        setLoading(false);
                    }, (error) => {
                        console.error("Error listening to budget changes:", error);
                        setLoading(false);
                    });

                    const userDocSnap = await userDocPromise;
                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    }

                } catch (error) {
                    console.error("Error during initial data fetch:", error);
                    setLoading(false);
                }
            } else {
                navigate('/login');
                setLoading(false);
            }
        });

        return () => {
            unsubscribeFromAuth();
            unsubscribeFromBudgets();
        };
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    const handleSaveBudget = async (formData) => {
        const user = auth.currentUser;
        if (user) {
            try {
                if (editingBudget) {
                    const budgetRef = doc(db, "budgets", editingBudget.id);
                    await updateDoc(budgetRef, formData);
                    setEditingBudget(null);
                } else {
                    if (budgets.length >= 3) {
                        alert("Você pode criar no máximo 3 orçamentos. Apague um existente para criar um novo.");
                        setModalIsOpen(false);
                        return;
                    }
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7);
                    await addDoc(collection(db, "budgets"), {
                        userId: user.uid,
                        ...formData,
                        createdAt: serverTimestamp(),
                        expiresAt: expirationDate,
                        status: 'Pendente'
                    });
                }
                setModalIsOpen(false);
            } catch (error) {
                console.error("Erro ao salvar orçamento:", error);
                alert("Ocorreu um erro ao salvar o orçamento.");
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este orçamento? Esta ação é irreversível.")) {
            try {
                await deleteDoc(doc(db, "budgets", id));
            } catch (error) {
                console.error("Erro ao excluir orçamento: ", error);
                alert("Erro ao excluir orçamento.");
            }
        }
    };

    const handleEdit = (budget) => {
        setEditingBudget(budget);
        setModalIsOpen(true);
    };
    
    const handleApproveBudget = async (id) => {
        if (window.confirm("Tem certeza que deseja aprovar este orçamento? Após a aprovação, ele não poderá mais ser editado.")) {
            try {
                const budgetRef = doc(db, "budgets", id);
                await updateDoc(budgetRef, { status: 'Aprovado' });
            } catch (error) {
                console.error("Erro ao aprovar orçamento: ", error);
                alert("Erro ao aprovar orçamento.");
            }
        }
    };

    const openNewBudgetModal = () => {
        if (budgets.length >= 3) {
            alert("Você pode criar no máximo 3 orçamentos. Apague um existente para criar um novo.");
        } else {
            setEditingBudget(null);
            setModalIsOpen(true);
        }
    };

    if (loading) {
        return <div className="loading-container">Carregando...</div>;
    }

    const formatLabel = (key) => {
        const labels = {
            paintingType: "Tipo de Pintura",
            colorType: "Tipo de Cor",
            environmentType: "Tipo de Ambiente",
            area: "Área (m²)",
            details: "Detalhes Adicionais",
            createdAt: "Criado em",
            expiresAt: "Válido até",
            totalPrice: "Preço Total",
            status: "Status"
        };
        return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Pendente':
                return 'status-pending';
            case 'Aprovado':
                return 'status-approved';
            default:
                return 'status-pending';
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Painel de Controle</h1>
                    <button onClick={handleLogout} className="logout-button">
                        Sair
                    </button>
                </div>
                <p>Bem-vindo à sua área restrita!</p>
            </div>

            <div className="dashboard-content">
                {userData && (
                    <div className="user-info-box">
                        <p><strong>Nome:</strong> {userData.nome}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                    </div>
                )}
                <div className="main-actions-container">
                    <button 
                        onClick={openNewBudgetModal} 
                        className={`new-budget-button ${budgets.length >= 3 ? 'disabled' : ''}`}
                        disabled={budgets.length >= 3}
                        title={budgets.length >= 3 ? "Você atingiu o limite de 3 orçamentos." : "Gerar um novo orçamento"}
                    >
                        + Gerar Novo Orçamento
                    </button>
                    <Summary budgets={budgets} />
                </div>

                <div className="budgets-section">
                    <h2>Meus Orçamentos</h2>
                    {budgets.length > 0 ? (
                        <div className="budgets-grid">
                            {budgets.map(budget => (
                                <div key={budget.id} className="budget-card">
                                    <div className="budget-card-content">
                                        {displayOrder.map(key => {
                                            const value = budget[key];
                                            if (value === undefined && key !== 'status') return null;

                                            if (key === 'status') {
                                                const statusValue = budget.status || 'Pendente';
                                                return (
                                                    <p key={key}><strong>{formatLabel(key)}:</strong> <span className={`status-label ${getStatusClass(statusValue)}`}>{statusValue}</span></p>
                                                );
                                            }
                                            
                                            let displayValue = value;
                                            if (value && typeof value.toDate === 'function') {
                                                displayValue = value.toDate().toLocaleDateString();
                                            } else if (key === 'totalPrice') {
                                                displayValue = (value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                                            }

                                            return (
                                                <p key={key}><strong>{formatLabel(key)}:</strong> {displayValue || '-'}</p>
                                            );
                                        })}
                                    </div>
                                    <div className="budget-card-actions">
                                        {budget.status !== 'Aprovado' ? (
                                            <>
                                                <button onClick={() => handleApproveBudget(budget.id)} className="icon-button approve-button" title="Aprovar">&#x2713;</button>
                                                <button onClick={() => handleEdit(budget)} className="icon-button edit-button" title="Editar">&#x270E;</button>
                                                <button onClick={() => handleDelete(budget.id)} className="icon-button delete-button" title="Excluir">&#x1F5D1;</button>
                                            </>
                                        ) : (
                                            <>
                                                <p className="approved-message">Orçamento Aprovado!</p>
                                                <button onClick={() => handleDelete(budget.id)} className="icon-button delete-button" title="Excluir">&#x1F5D1;</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ marginTop: '20px' }}>Você ainda não tem orçamentos. Clique no botão acima para criar um!</p>
                    )}
                </div>

                <BudgetModal 
                    isOpen={modalIsOpen}
                    onRequestClose={() => {
                        setModalIsOpen(false);
                        setEditingBudget(null);
                    }}
                    onSave={handleSaveBudget} 
                    editingBudget={editingBudget}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
