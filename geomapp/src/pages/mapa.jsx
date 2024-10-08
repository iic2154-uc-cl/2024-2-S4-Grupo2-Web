import {React, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/mapa.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoogleMapComponent from '../components/GoogleMap';
import UpdateLocationButton from '../components/MapsButton';
import CenterMapButton from '../components/CenterMapButton'; 

const Mapa = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [mapInstance, setMapInstance] = useState(null); // Estado para almacenar el objeto map
    const [filterType, setFilterType] = useState('');


  const rightPanelStyle = {
    width: '25%', // Ancho del panel lateral
    height: '700px', // Asegúrate de que el alto coincida con el del mapa
    overflowY: 'auto' // En caso de que el contenido sea demasiado largo
  };

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log("llegue aca");
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Latitud:", newLocation.lat, "Longitud:", newLocation.lng);
          setUserLocation(newLocation);
          if (mapInstance) {
            mapInstance.panTo(newLocation); // Usamos mapInstance en lugar de map
          }
        });
      }
    };

    const centerMap = () => {
      if (mapInstance && userLocation) {
        mapInstance.panTo(userLocation); // Centramos el mapa en la ubicación del usuario
      }
    };

return (
    <div id="hello-world-container">
      
            <Navbar />
            
            <div className="content">
            
                <h1>Mapa</h1>
                <div className="filter-container">
                    <label htmlFor="filterSelect">Filtrar por tipo:</label>
                    <select
                        id="filterSelect"
                        onChange={(e) => setFilterType(e.target.value)}
                        value={filterType}
                    >
                        <option value="">Todos</option>
                        <option value="alojamientos">Alojamientos</option>
                        <option value="restaurantes">Restaurantes</option>
                        <option value="tiendas">Tiendas</option>
                    </select>
                </div>
                <GoogleMapComponent onMapLoad={setMapInstance} filterType={filterType} /> {/* Pasamos la función para establecer el map */}
                <br />
                <UpdateLocationButton className="update-location-btnn" onClick={updateLocation} />
                <CenterMapButton onClick={centerMap} /> {/* Añadimos el nuevo botón para centrar el mapa */}
                
                
            </div>
            
            
            
            <Footer />
    </div>
  );
}; 

export default Mapa;
