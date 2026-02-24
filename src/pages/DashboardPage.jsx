import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, getDoc, collection, addDoc, query, where, onSnapshot, serverTimestamp, getDocs } from "firebase/firestore";
import BudgetModal from '../components/BudgetModal';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        let unsubscribeFromBudgets = () => {};
        const unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userDocPromise = getDoc(doc(db, "users", user.uid));
                    const budgetsQuery = query(collection(db, "budgets"), where("userId", "==", user.uid));
                    const initialBudgetsPromise = getDocs(budgetsQuery);

                    const [userDocSnap, initialBudgetsSnapshot] = await Promise.all([
                        userDocPromise,
                        initialBudgetsPromise,
                    ]);

                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    }
                    const initialBudgets = initialBudgetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setBudgets(initialBudgets);

                    unsubscribeFromBudgets = onSnapshot(budgetsQuery, (snapshot) => {
                        const updatedBudgets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setBudgets(updatedBudgets);
                    });
                } catch (error) {
                    console.error("Error during initial data fetch:", error);
                } finally {
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
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7);

                await addDoc(collection(db, "budgets"), {
                    userId: user.uid,
                    ...formData, // Salva todos os dados do formulário
                    createdAt: serverTimestamp(),
                    expiresAt: expirationDate,
                });
                setModalIsOpen(false);
            } catch (error) {
                console.error("Erro ao salvar orçamento:", error);
                alert("Ocorreu um erro ao salvar o orçamento.");
            }
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>;
    }

    // Helper para capitalizar e formatar os nomes dos campos
    const formatLabel = (key) => {
        const labels = {
            paintingType: "Tipo de Pintura",
            colorType: "Tipo de Cor",
            environmentType: "Tipo de Ambiente",
            area: "Área (m²)",
            details: "Detalhes Adicionais",
            createdAt: "Criado em",
            expiresAt: "Válido até"
        };
        return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Painel de Controle</h1>
            <p>Bem-vindo à sua área restrita!</p>

            {userData && (
                <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginTop: '20px', marginBottom: '20px' }}>
                    <p><strong>Nome:</strong> {userData.nome}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            )}

            <button onClick={() => setModalIsOpen(true)} style={{ padding: '12px 25px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                + Gerar Novo Orçamento
            </button>

            <div className="budgets-section" style={{ marginTop: '30px' }}>
                <h2>Meus Orçamentos</h2>
                {budgets.length > 0 ? (
                    budgets.map(budget => (
                        <div key={budget.id} style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            {Object.entries(budget).map(([key, value]) => {
                                if (['userId', 'id'].includes(key)) return null; // Não exibe o ID do usuário ou do orçamento
                                
                                let displayValue = value;
                                if (value && typeof value.toDate === 'function') { // Formata datas do Firestore
                                    displayValue = value.toDate().toLocaleDateString();
                                }

                                return (
                                    <p key={key}><strong>{formatLabel(key)}:</strong> {displayValue}</p>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <p style={{ marginTop: '20px' }}>Você ainda não tem orçamentos. Clique no botão acima para criar um!</p>
                )}
            </div>

            <button onClick={handleLogout} style={{ marginTop: '30px', padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Sair
            </button>

            <BudgetModal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                onSave={handleSaveBudget} 
            />
        </div>
    );
};

export default DashboardPage;
