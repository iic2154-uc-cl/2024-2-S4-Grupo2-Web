import React from 'react';
import '../styles/footer.css'; // Asegúrate de que este archivo está correctamente vinculado

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="Terminos.html" className="footer-link">Términos y Condiciones de uso</a>
                <a href="Politicas.html" className="footer-link">Políticas de privacidad</a>
            </div>
        </footer>
    );
}

export default Footer;
