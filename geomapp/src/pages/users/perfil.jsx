import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../../styles/users/perfil.css'; // Asegúrate de que la ruta del CSS es correcta
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Perfil = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    isAuthenticated && (
      <div className="perfil-container">
        <Navbar></Navbar>
        <h1>Mi Perfil</h1>
        <div className="perfil-info">
          <img src={user.picture} alt={user.name} className="perfil-avatar" />
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          {/* Agrega más información de perfil aquí si es necesario */}
        </div>
      </div>
    )
  );
}

export default Perfil;
