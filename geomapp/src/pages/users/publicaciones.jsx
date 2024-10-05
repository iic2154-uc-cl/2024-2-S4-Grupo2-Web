import React from 'react';
import '../../styles/users/publicaciones.css';  // Asegúrate de que el CSS se carga correctamente
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Publicaciones() {
  return (
    <div id="publicaciones-container">
      <Navbar />
      <header className="publicaciones-header">
        <h1>Tus Publicaciones</h1>
        <p>Aquí puedes ver y gestionar tus publicaciones.</p>
      </header>

      <main className="publicaciones-content">
        <div className="publicaciones-list">
          <p>No tienes publicaciones aún. ¡Crea una nueva publicación para empezar!</p>
          {/* Esta sección puede ser reemplazada con una lista dinámica de publicaciones */}
        </div>
        <button className="publicaciones-button">Crear nueva publicación</button>
      </main>

      <Footer />
    </div>
  );
}

export default Publicaciones;