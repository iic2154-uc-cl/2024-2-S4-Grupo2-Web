import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/users/perfil.css'; // Verifica que la ruta al CSS sea correcta

const Perfil = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    isAuthenticated ? (
      <div id="perfil-container">
        <Navbar />
        <div className="perfil-info">
          <h1>Mi Perfil</h1>
          <img src={user.picture} alt={user.name} className="perfil-avatar" />
          <h2>{user.name}</h2>
          <p>Correo: {user.email}</p>
          <p>Dirección: Calle Sin Salida 987, Santiago, Chile</p>
          <p>Publicaciones activas: 3</p>
          <p>Publicaciones por vencer: 1</p>
          <p>Publicaciones vencidas: 1</p>
   
        </div>

        <Footer />
      </div>
    ) : (
      <div>No está autenticado</div>
    )
  );
}

export default Perfil;