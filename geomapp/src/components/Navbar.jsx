import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/navbar.css'; // Asegúrate de que la ruta del CSS es correcta
import '../styles/footer.css';
import { Link } from 'react-router-dom';

function NavBar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo navbar-links">
                  <Link to="/inicio">Logo xd</Link>



                </div>
                <div className="navbar-links">
                    <Link to="/mapa-navegacion" className="footer-link">Mapa de navegación</Link>
                    {/* <a href="/publicar">Publicar</a> */}
                    <Link to="/servicios" className="footer-link">Servicios</Link>
                    {isAuthenticated && (
                        <Link to="/mi-perfil" className="footer-link">Mi Perfil</Link>
                    )}
                    {isAuthenticated && (
                        <Link to="/publicaciones" className="footer-link-2">Mis publicaciones</Link>
                    )}
                </div>
                <div className="navbar-login footer-link">
                    {!isAuthenticated ? (
                        <a onClick={loginWithRedirect}>Iniciar sesión</a>
                    ) : (
                        <a onClick={() => logout({ returnTo: window.location.origin })}>Cerrar sesión</a>
                    )}
                </div>
            </div>
            <div onClick={() => alert('Connecting to WhatsApp')}>
                <i className="whatsapp-icon">W</i>
            </div>
        </div>
    );
}

export default NavBar;

