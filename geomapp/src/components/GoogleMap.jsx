import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UpdateLocationButton from './MapsButton'; // Asegúrate de importar el componente del botón

/* Ajusta los estilos del contenedor principal para eliminar márgenes y padding */
// Ajusta los estilos del contenedor principal para eliminar márgenes y padding
const containerStyle = {
  display: 'flex',       // Continúa usando flex para alinear lado a lado
  alignItems: 'stretch', // Asegura que los elementos hijos llenen el contenedor verticalmente
  height: '700px',
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
  width: '30%',          // Mantiene el 30% del ancho
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

const GoogleMapComponent = ({ onMapLoad, filterType }) => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const lugares = [
    { nombre: 'Costanera Center', lat: -33.4175, lng: -70.6067, tipo: 'tiendas', descripcion: 'Centro comercial más grande de Santiago y torre más alta de Latinoamérica.'},
    { nombre: 'Parque Bicentenario', lat: -33.3989, lng: -70.6001, tipo: 'alojamientos', descripcion: 'Un hermoso parque en Vitacura, ideal para actividades al aire libre.'},
    { nombre: 'Restaurante El Buen Sabor', lat: -33.4372, lng: -70.6506, tipo: 'restaurantes', descripcion: 'Un restaurante con deliciosa comida local.'},
    // Añade más lugares aquí...
  ];

  // Filtrar los lugares según el filtro seleccionado
  const lugaresFiltrados = lugares.filter((lugar) => {
    return filterType === '' || lugar.tipo === filterType;
  });

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

  return (
    <div style={containerStyle}>
      {/* Mapa de Google */}
      <div style={mapStyle}>
        <LoadScript googleMapsApiKey="AIzaSyAJuzF9SX5VP6CU38hq-lgRopJ66jYgb5E">
          <GoogleMap
            mapContainerStyle={mapStyle}
            center={userLocation}
            zoom={12}
            onLoad={(mapInstance) => {
              setMap(mapInstance);
              if (onMapLoad) {
                onMapLoad(mapInstance); // Llamamos a la función onMapLoad cuando el mapa esté listo
              }
            }}
          >
            {/* Marcadores de los lugares filtrados*/}
            {lugaresFiltrados.map((lugar, index) => (
              <Marker
                key={index}
                position={{ lat: lugar.lat, lng: lugar.lng }}
                onClick={() => setSelectedPlace(lugar)}  // Al hacer clic, selecciona el lugar
                title={lugar.nombre}
              />
            ))}

            {/* Marcador para la ubicación actual del usuario */}
            <Marker
              position={userLocation}
              title="Tu ubicación actual"
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Usar un ícono azul para el usuario
            />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Panel de información del lugar seleccionado */}
      {selectedPlace && (
        <div style={infoPanelStyle}>
          <h2>{selectedPlace.nombre}</h2>
          <p>{selectedPlace.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent;
