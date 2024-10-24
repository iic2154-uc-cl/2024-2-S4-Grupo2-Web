import {React, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/newmapa.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoogleMapComponent from '../components/GoogleMap';
import UpdateLocationButton from '../components/MapsButton';
import CenterMapButton from '../components/CenterMapButton'; 
import Filter from '../components/Filter';
import Simbologia from '../components/Simbologia';
import Publicaciones from '../components/NewPublicaciones';
import { sub } from 'date-fns';
import lugares from '../components/lugares';

const NewMapa = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [mapInstance, setMapInstance] = useState(null); // Estado para almacenar el objeto map
    const [filterType, setFilterType] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedSubIndustries, setSelectedSubIndustries] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [rangePrice, setRangePrice] = useState([0, 100000]);
    const [searchTerm, setSearchTerm] = useState('');


    // Filtrar las publicaciones basadas en los filtros seleccionados
    const filteredPublicaciones = lugares.filter(publicacion => {
        // Filtra por categoría
        const matchesCategory = selectedIndustries.length === 0 || selectedIndustries.includes(publicacion.categoria);
        // Filtra por subcategoría
        const matchesSubCategory = selectedSubIndustries.length === 0 || selectedSubIndustries.includes(publicacion.subcategoria);
        // Filtra por valoración mínima
        const matchesRating = selectedRating === 0 || publicacion.rating >= selectedRating;
        // Filtra por rango de precio
        const matchesPrice = publicacion.precio >= rangePrice[0] && publicacion.precio <= rangePrice[1];
        // Filtra por término de búsqueda
        const matchesSearch = searchTerm === '' || publicacion.nombre.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSubCategory && matchesRating && matchesPrice && matchesSearch;
    });


    // obtener la ubicación del usuario
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
    <>
        {/* Navbar */}
        <Navbar />
        <div className='columns'>
            {/* panel de filtros */}
            <Filter 
            onCategoryChange={setSelectedIndustries}
            onSubCategoryChange={setSelectedSubIndustries}
            onRatingChange={setSelectedRating}
            onPriceChange={setRangePrice}
            onSearchChange={setSearchTerm}
            />

            {/* panel de publicaciones */}
            <Publicaciones publicaciones={filteredPublicaciones} />
            
            {/* mapa y botones */}
            <div className="mapa">
                {/* Pasamos la función para establecer el map */}
                <GoogleMapComponent onMapLoad={setMapInstance} filterType={filterType} lugares={filteredPublicaciones}/>
                <div className="buttons-container" >
                <UpdateLocationButton onClick={updateLocation} />
                <CenterMapButton onClick={centerMap} /> {/* Añadimos el nuevo botón para centrar el mapa */}
                    {/*<div className="filter-container">  
                        <select
                            id="filterSelect"
                            onChange={(e) => setFilterType(e.target.value)}
                            value={filterType}
                            className="update-location-btnn">
                            <option value="">Filtrar por tipo</option>
                            <option value="">Todos</option>
                            <option value="turismo">Turismo</option>
                            <option value="centros">Centros Deportivos</option>
                            <option value="hospedaje">Hospedaje</option>
                            <option value="gastronomia">Gastronomia</option>
                            <option value="servicios">Servicios Comunitarios</option>
                            <option value="eventos">Eventos</option>
                        </select>
                    </div>*/}
                </div>
                <br />
                <Simbologia></Simbologia>
            </div>
        </div>
        {/* Footer */}
        <Footer />
    </>
  );
}; 

export default NewMapa;