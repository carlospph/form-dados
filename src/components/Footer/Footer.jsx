export function Footer() {
    return (
        <>
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
        </>
    )
}