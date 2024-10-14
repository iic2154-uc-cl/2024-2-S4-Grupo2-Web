import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/navbar.css'; // Asegúrate de que la ruta del CSS es correcta
import '../styles/footer.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import whatsapp from '../assets/whatsapp.png';

function NavBar() {
    const { loginWithRedirect, isAuthenticated } = useAuth0(); // Eliminamos 'logout'

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-links">
                    <Link to="/">
                        <img src={logo} className="navbar-logo" alt="Logo" />
                    </Link>

                    <Link to="/mapa-navegacion" className="footer-link">Mapa de navegación</Link>
                    <Link to="/servicios" className="footer-link">Servicios</Link>

                    {isAuthenticated && (
                        <>
                            <Link to="/mi-perfil" className="footer-link">Mi Perfil</Link>
                            <Link to="/publicaciones" className="footer-link">Mis Publicaciones</Link>
                        </>
                    )}

                    {!isAuthenticated && (
                        <a className="footer-link" onClick={loginWithRedirect}>Iniciar sesión</a>
                    )}
                </div>
            </div>

            <div onClick={() => alert('Connecting to WhatsApp')}>
                <img src={whatsapp} className="navbar-logo" alt="WhatsApp" />
            </div>
        </div>
    );
}

export default NavBar;
