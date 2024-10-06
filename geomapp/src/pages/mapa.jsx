import {React, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/mapa.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoogleMapComponent from '../components/GoogleMap';
import UpdateLocationButton from '../components/MapsButton'

const Mapa = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [selectedPlace, setSelectedPlace] = useState(null);

  const rightPanelStyle = {
    width: '25%', // Ancho del panel lateral
    height: '700px', // Asegúrate de que el alto coincida con el del mapa
    overflowY: 'auto' // En caso de que el contenido sea demasiado largo
  };

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          map.panTo(newLocation);
        });
      }
    };
  return (
    <div id="hello-world-container">
      
            <Navbar />
            
            <div className="content">
            
                <h1>Mapa</h1>
                <GoogleMapComponent></GoogleMapComponent>
                <br></br>
                <UpdateLocationButton className="update-location-btnn" onClick={updateLocation} />
                
                
                
            </div>
            
            
            
            <Footer />
    </div>
  );
};

export default Mapa;
