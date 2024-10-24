import React, { useState } from 'react';
import '../styles/servicios.css';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import deportes from '../assets/deportes.png';
import eventos from '../assets/eventos.png';
import gastronomia from '../assets/gastronomia.png';
import hospedaje from '../assets/hospedaje.png';
import servicios from '../assets/servicios.png';
import turismo from '../assets/turismo.png';
import { useNavigate } from 'react-router-dom';

const Servicios = () => {
  const navigate = useNavigate();  // Inicializa useNavigate
  const [selectedService, setSelectedService] = useState(null);  // Estado para el servicio seleccionado

  const handleIconClick = (serviceName) => {
    setSelectedService(serviceName);  // Actualiza el servicio seleccionado
  };

  const handleClick = () => {
    navigate('/publicar');  // Navega a /publicar
  };

  // Información de cada servicio
  const serviceInfo = {
    deportes: 'Este servicio ofrece una variedad de actividades deportivas, incluyendo fútbol, baloncesto, y más.',
    eventos: 'Organiza y asiste a los mejores eventos locales e internacionales con nuestro servicio.',
    gastronomia: 'Descubre los mejores lugares para disfrutar de la comida local e internacional.',
    hospedaje: 'Encuentra alojamientos cómodos y asequibles en tu destino deseado.',
    servicios: 'Accede a una amplia gama de servicios locales que facilitarán tu vida.',
    turismo: 'Explora las atracciones turísticas más populares y disfruta de tu viaje al máximo.',
  };

  return (
    <div id="hello-world-container">
      <Navbar />
      <div className="content">
        <h1>Servicios</h1>
        <div className="icon-container">
          <img src={deportes} alt="Deportes" onClick={() => handleIconClick('deportes')} />
          <img src={eventos} alt="Eventos" onClick={() => handleIconClick('eventos')} />
          <img src={gastronomia} alt="Gastronomía" onClick={() => handleIconClick('gastronomia')} />
          <img src={hospedaje} alt="Hospedaje" onClick={() => handleIconClick('hospedaje')} />
          <img src={servicios} alt="Servicios" onClick={() => handleIconClick('servicios')} />
          <img src={turismo} alt="Turismo" onClick={() => handleIconClick('turismo')} />
        </div>
        {/* Mostrar la información del servicio seleccionado */}
        {selectedService && (
          <div className="service-info">
            <h2>Información del Servicio</h2>
            <p>{serviceInfo[selectedService]}</p>
          </div>
        )}
        <br />
        <button className="button" onClick={handleClick}>
          Publica tu servicio aquí
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Servicios;