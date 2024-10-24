import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/users/perfil.css';

const Perfil = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div className="loading-screen">Cargando...</div>;
  }

  return (
    isAuthenticated ? (
      <div id="perfil-container">
        <Navbar />
        <div className="perfil-content">
          <div className="perfil-header">
            <h1>Mi Perfil</h1>
            <button
              className="cerrar-sesion-button"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Cerrar sesión
            </button>
          </div>
          <div className="perfil-body">
            <img src={user.picture} alt={user.name} className="perfil-avatar" />
            <h2 className="perfil-name">{user.name}</h2>
            <p className="perfil-email">{user.email}</p>
            <p className="perfil-info"><strong>Dirección:</strong> Calle Sin Salida 987, Santiago, Chile</p>
            <div className="perfil-stats">
              <div className="stat">
                <p>Publicaciones activas</p>
                <span>3</span>
              </div>
              <div className="stat">
                <p>Publicaciones por vencer</p>
                <span>1</span>
              </div>
              <div className="stat">
                <p>Publicaciones Vencidas</p>
                <span>1</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <div>No está autenticado</div>
    )
  );
};

export default Perfil;
