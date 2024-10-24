import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/navbar.css'; // Asegúrate de que la ruta del CSS es correcta
import { Link } from 'react-router-dom';
import logo from '../assets/logoo.png';
import whatsapp from '../assets/whatsapp.png';
import { FaBars } from 'react-icons/fa'; // Importar el icono de hamburguesa

function NavBar() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alternar estado del menú
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <Link to="/">
                    <img src={logo} className="navbar-logo" alt="Logo" />
                </Link>
                <div className="navbar-links">
                    <Link to="/inicio" className="footer-link">Inicio</Link>
                    <Link to="/mapa-navegacion" className="footer-link">Mapa</Link>
                    <Link to="/servicios" className="footer-link">Servicios</Link>
                    <Link to="/cerca" className="footer-link">A mi alrededor</Link>

                    {isAuthenticated && (
                        <>
                            <Link to="/mi-perfil" className="footer-link">Mi Perfil</Link>
                            <Link to="/publicaciones" className="footer-link">Mis Publicaciones</Link>
                            <Link to="/favoritos" className="footer-link">Mis Favoritos</Link>
                            <Link to="/notificaciones" className="footer-link">Enviar notificaciones a usuarios</Link>
                        </>
                    )}

                    {!isAuthenticated && (
                        <a className="footer-link" onClick={loginWithRedirect}>Iniciar sesión</a>
                    )}
                </div>
                <FaBars className="navbar-hamburger" onClick={toggleMenu} /> {/* Icono de hamburguesa */}
            </div>
            <div className="whatsapp-container" onClick={() => alert('Connecting to WhatsApp')}>
                <img src={whatsapp} className="whatsapp-icon" alt="WhatsApp" />
            </div>
            {menuOpen && ( // Mostrar el menú si está abierto
                <div className="navbar-dropdown">
                    <Link to="/inicio" className="footer-link" onClick={toggleMenu}>Inicio</Link>
                    <Link to="/mapa-navegacion" className="footer-link" onClick={toggleMenu}>Mapa</Link>
                    <Link to="/servicios" className="footer-link" onClick={toggleMenu}>Servicios</Link>
                    <Link to="/cerca" className="footer-link" onClick={toggleMenu}>A mi alrededor</Link>

                    {isAuthenticated && (
                        <>
                            <Link to="/mi-perfil" className="footer-link" onClick={toggleMenu}>Mi Perfil</Link>
                            <Link to="/publicaciones" className="footer-link" onClick={toggleMenu}>Mis Publicaciones</Link>
                            <Link to="/favoritos" className="footer-link" onClick={toggleMenu}>Mis Favoritos</Link>
                            <Link to="/notificaciones" className="footer-link" onClick={toggleMenu}>Enviar notificaciones a usuarios</Link>
                        </>
                    )}

                    {!isAuthenticated && (
                        <a className="footer-link" onClick={() => { loginWithRedirect(); toggleMenu(); }}>Iniciar sesión</a>
                    )}
                </div>
            )}
        </div>
    );
}
export default NavBar;