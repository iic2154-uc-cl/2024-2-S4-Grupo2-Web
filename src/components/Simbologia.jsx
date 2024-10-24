import React, { useState } from 'react';
import deportes from '../assets/deportes.png';
import eventos from '../assets/eventos.png';
import gastronomia from '../assets/gastronomia.png';
import hospedaje from '../assets/hospedaje.png';
import servicios from '../assets/servicios.png';
import turismo from '../assets/turismo.png';

const Simbologia = () => {
  const [selectedTitle, setSelectedTitle] = useState('');

  // Definimos un objeto para asociar imágenes con títulos
  const iconos = [
    { src: deportes, title: 'Deportes' },
    { src: eventos, title: 'Eventos' },
    { src: gastronomia, title: 'Gastronomía' },
    { src: hospedaje, title: 'Hospedaje' },
    { src: servicios, title: 'Servicios Comunitarios' },
    { src: turismo, title: 'Turismo' },
  ];

  const handleClick = (title) => {
    setSelectedTitle(title);
  };

  return (
    <div className="simbologia-container">
      <h1>Simbología</h1>
      <div className="icon-container">
        {iconos.map((icono, index) => (
          <div key={index} onClick={() => handleClick(icono.title)}>
            <img src={icono.src} alt={icono.title} className="icon" />
          </div>
        ))}
      </div>
      {selectedTitle && <h2 className="selected-title">{selectedTitle}</h2>}
    </div>
  );
};

export default Simbologia;
