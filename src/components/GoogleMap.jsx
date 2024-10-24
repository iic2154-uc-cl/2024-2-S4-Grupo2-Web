import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import UpdateLocationButton from './MapsButton'; // Asegúrate de importar el componente del botón
import { maxHeight } from '@mui/system';
import lugares from './lugares.js'


/* Ajusta los estilos del contenedor principal para eliminar márgenes y padding */
// Ajusta los estilos del contenedor principal para eliminar márgenes y padding
const containerStyle = {
  display: 'flex',       // Continúa usando flex para alinear lado a lado
  alignItems: 'stretch', // Asegura que los elementos hijos llenen el contenedor verticalmente
  height: '80vh',        // Ajusta la altura del contenedor principal
  margin: 0,             // Elimina márgenes externos
  padding: 0,            // Elimina padding interno
};

// Estilos específicos para el mapa
const mapStyle = {
  flex: 1,               // Permite que el mapa tome el espacio disponible
  minHeight: '100%',     // Asegura que el mapa tenga el alto completo del contenedor
  margin: 0,             // Elimina cualquier margen
};

// Estilos para el panel de información
const infoPanelStyle = {
  width: '50%',          // Mantiene el 30% del ancho
  maxHeight: '100%',        // Asegura que el panel tenga el alto completo
  padding: '20px',       // Ajusta el padding si es necesario
  backgroundColor: '#f9f9f9',
  borderLeft: '1px solid #ccc', // Asegura una línea divisoria sutil
  overflowY: 'auto',     // Permite desplazamiento vertical si es necesario
  boxSizing: 'border-box' // Asegura que el padding no afecte las dimensiones declaradas
};



const center = {
  lat: -33.45694,  // Coordenadas iniciales para Santiago, Chile
  lng: -70.64827,
};

const GoogleMapComponent = ({ onMapLoad, filterType, places }) => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  if (!places) {
    places = lugares;
    }
/*
// Definir íconos para cada tipo de lugar
  const iconos = {
    hospedaje: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    servicio: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    gastronomia: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    eventos: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    centro: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    turismo: 'http://maps.google.com/mapfiles/ms/icons/brown-dot.png',
  };*/

  // Definir íconos para cada tipo de lugar
  const iconos = {
    propiedad: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    camping: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    servicios_y_oficios: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    eventos: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  };

  /*
  // Filtrar los lugares según el filtro seleccionado
  const lugaresFiltrados = lugares.filter((lugar) => {
    return filterType === '' || lugar.tipo === filterType;
  });
*/
  

  // Obtener ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        if (map) {
          map.panTo(newLocation);  // Centrar el mapa en la nueva ubicación
        }
      });
    }
  }, [map]);

  const mapOptions = {
    styles: [
      {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }], // Oculta todas las etiquetas
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }] // Muestra nombres de localidades (ciudades)
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }] // Muestra nombres de calles
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ visibility: 'off' }] // Oculta geometría de las administraciones
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }] // Oculta etiquetas de puntos de interés
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }] // Oculta etiquetas de transporte público
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }] // Muestra cuerpos de agua (opcional)
      }
    ],
  };

  const closeInfoPanel = () => {
    setSelectedPlace(null); // Oculta el panel de información
  };

  return (
    <div style={containerStyle}>
      <div style={mapStyle}>
        <LoadScript googleMapsApiKey="AIzaSyAJuzF9SX5VP6CU38hq-lgRopJ66jYgb5E">
          <GoogleMap
            mapContainerStyle={mapStyle}
            center={userLocation}
            zoom={12}
            options={mapOptions} 
            onLoad={(mapInstance) => {
              setMap(mapInstance);
              if (onMapLoad) {
                onMapLoad(mapInstance);
              }
            }}
          >
            <MarkerClusterer>
              {(clusterer) =>
                places.map((lugar, index) => (
                  <Marker
                    key={index}
                    position={{ lat: lugar.lat, lng: lugar.lng }}
                    onClick={() => setSelectedPlace(lugar)} // Maneja la selección del lugar
                    title={lugar.nombre}
                    clusterer={clusterer} // Asocia el marcador al clusterer
                    icon={iconos[lugar.tipo] || 'http://maps.google.com/mapfiles/ms/icons/black-dot.png'}
                  />
                ))
              }
            </MarkerClusterer>

            {/* Marcador para la ubicación actual del usuario */}
            <Marker
              position={userLocation}
              title="Tu ubicación actual"
              icon="http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Panel de información del lugar seleccionado */}
      {selectedPlace && (
        <div className="info-panel" style={infoPanelStyle}>
            <button className="close-btn" onClick={closeInfoPanel} style={{ float: 'right', cursor: 'pointer' }}>
                Cerrar
            </button>
          <h2>{selectedPlace.nombre}</h2>
          <p className="description">{selectedPlace.descripcion}</p>
          <div className="details">
            <p><strong>Precio:</strong> {selectedPlace.precio}</p>
            <p><strong>Categoría:</strong> {selectedPlace.categoria}</p>
            <p><strong>Horario de Apertura:</strong> {selectedPlace.horario_apertura}</p>
            <p><strong>Horario de Cierre:</strong> {selectedPlace.horario_cierre}</p>
            <p><strong>Dirección:</strong> {selectedPlace.direccion}</p>
            <p><strong>Contacto:</strong> {selectedPlace.contacto}</p>
            <br />
            <button className="update-location-btnn">Más información</button>
          </div>
        </div>
      )}
    </div>
  );
};
  



export default GoogleMapComponent;