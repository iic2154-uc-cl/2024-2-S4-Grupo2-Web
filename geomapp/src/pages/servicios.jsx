import React from 'react';
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

  const handleClick = () => {
    navigate('/publicar');  // Navega a /publicar
  };

  return (
    <div id="hello-world-container">
    <Navbar />
    <div className="content">
        <h1>Servicios</h1>
        <img src={deportes}></img>
        <br></br>
        <img src={eventos}></img>
        <br></br>
        <img src={gastronomia}></img>
        <br></br>
        <img src={hospedaje}></img>
        <br></br>
        <img src={servicios}></img>
        <br></br>
        <img src={turismo}></img>
        <br></br>
        <br></br>
        <br></br>
        <button className="button" onClick={handleClick}>
          Publica tu servicio aquí
        </button>
        <br></br>
    </div>
    <Footer />
</div>

  );
};

export default Servicios;
