import React from 'react';
import '../styles/servicios.css';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Servicios = () => {
  return (
    <div id="hello-world-container">
    <Navbar />
    <div className="content">
        <h1>Servicios</h1>
        <p>USUARIO VISITANTE</p>
        <p>Si deseas publicar el servicio que ofreces, debes iniciar sesión!</p>
        

    </div>
    <Footer />
</div>

  );
};

export default Servicios;
