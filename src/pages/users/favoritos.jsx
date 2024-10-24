import React, { useState } from 'react';
import '../../styles/users/favoritos.css';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';

// Importa las imágenes
import Centro from '../../assets/centro.jpg';
import Hostal from '../../assets/hostal.jpeg';
import Concierto from '../../assets/concierto.jpg';
import Restaurante from '../../assets/restaurante.jpg';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      titulo: 'Cancha A - Ejemplo Centros Deportivos',
      precio: '$20,000 CLP',
      ubicacion: 'Calle Fútbol 123, Ciudad',
      imagen: Centro,
    },
    {
      id: 2,
      titulo: 'Hostal - Ejemplo Hospedaje',
      precio: '$15,000 CLP',
      ubicacion: 'Av. Hostal 456, Ciudad',
      imagen: Hostal,
    },
    {
      id: 3,
      titulo: 'Concierto - Ejemplo Evento',
      precio: '$10,000 CLP',
      ubicacion: 'Parque Central, Ciudad',
      imagen: Concierto,
    },
    {
      id: 4,
      titulo: 'Restaurante - Ejemplo Gatronomia',
      precio: '$8,000 CLP',
      ubicacion: 'Av. Gastronomía 789, Ciudad',
      imagen: Restaurante,
    },
  ]);

  const eliminarFavorito = (id) => {
    setFavoritos(favoritos.filter(favorito => favorito.id !== id));
  };

  return (
    <div id="favoritos-container">
      <Navbar />
      <h1>Mis Favoritos</h1>
      <div className="favoritos-list">
        {favoritos.map((favorito) => (
          <div className="favoritos-card" key={favorito.id}>
            <img src={favorito.imagen} alt={favorito.titulo} className="favoritos-img" />
            <div className="favoritos-heart" onClick={() => eliminarFavorito(favorito.id)}>
              <FaHeart />
            </div>
            <h2>{favorito.titulo}</h2>
            <p className="precio">{favorito.precio}</p>
            <p className="ubicacion">{favorito.ubicacion}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Favoritos;
