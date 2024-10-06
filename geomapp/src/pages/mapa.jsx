import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/mapa.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Mapa = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <div id="hello-world-container">
            <Navbar />
            <div className="content">
                <h1>Mapa</h1>
            </div>
            <Footer />
    </div>
  );
};

export default Mapa;
