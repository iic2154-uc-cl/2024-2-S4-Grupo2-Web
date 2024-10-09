import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import '../../styles/users/publicaciones.css';  // Asegúrate de que el CSS se carga correctamente
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Publicaciones() {
  const navigate = useNavigate();  // Inicializa useNavigate

  const handleClick = () => {
    navigate('/publicar');  // Navega a /publicar
  };

  return (
    <div id="publicaciones-container">
      <Navbar />
      <header className="publicaciones-header">
        <h1>Tus Publicaciones</h1>
      </header>

      <main className="publicaciones-content">
        <div className="publicaciones-list">
          <p>No tienes publicaciones aún. ¡Crea una nueva publicación para empezar!</p>
          {/* Esta sección puede ser reemplazada con una lista dinámica de publicaciones */}
          <br></br>
          <br></br>
        </div>
        <button className="image-button" onClick={handleClick}>
          Crear nueva publicación
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default Publicaciones;
