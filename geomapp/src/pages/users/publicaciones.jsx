import React from 'react';
import '../../styles/users/publicaciones.css';  // Importa el archivo CSS donde aplicarás estilos
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


function Publicaciones() {
  return (
    
    <div className="publicaciones-container">
        <Navbar></Navbar>
      <header className="publicaciones-header">
        <h1>Tus Publicaciones</h1>
        <p>Aquí puedes ver y gestionar tus publicaciones.</p>
      </header>

      <main className="publicaciones-content">
        {/* Aquí puedes agregar una lista de publicaciones, formularios, etc. */}
        <div className="publicaciones-list">
          <p>No tienes publicaciones aún. ¡Crea una nueva publicación para empezar!</p>
          {/* Puedes reemplazar esto con una lista de publicaciones si ya las tienes */}
        </div>
        
        <button className="publicaciones-button">
          Crear nueva publicación
        </button>
        
      </main>
      

      

    
    </div>
    
  );
}

export default Publicaciones;
