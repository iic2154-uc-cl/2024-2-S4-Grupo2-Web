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
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const lugares = [
    {
        nombre: 'Costanera Center',
        lat: -33.4175,
        lng: -70.6067,
        tipo: 'tiendas',
        descripcion: 'Centro comercial más grande de Santiago y torre más alta de Latinoamérica.',
        precio: 'Entrada libre',
        contacto: '+56 2 2916 9200',
        direccion: 'Avenida Andrés Bello 2425, Providencia',
        categoria: 'Centro Comercial',
        horario_apertura: '10:00 AM',
        horario_cierre: '09:00 PM'
    },
    {
        nombre: 'Parque Bicentenario',
        lat: -33.3989,
        lng: -70.6001,
        tipo: 'alojamientos',
        descripcion: 'Un hermoso parque en Vitacura, ideal para actividades al aire libre.',
        precio: 'Entrada libre',
        contacto: '+56 2 2216 9121',
        direccion: 'Avenida Bicentenario 3236, Vitacura',
        categoria: 'Parque',
        horario_apertura: '07:00 AM',
        horario_cierre: '08:00 PM'
    },
    {
        nombre: 'Restaurante El Buen Sabor',
        lat: -33.4372,
        lng: -70.6506,
        tipo: 'restaurantes',
        descripcion: 'Un restaurante con deliciosa comida local.',
        precio: 'Precio promedio: $15,000 CLP',
        contacto: '+56 2 2234 5678',
        direccion: 'Calle Falsa 123, Santiago Centro',
        categoria: 'Restaurante',
        horario_apertura: '12:00 PM',
        horario_cierre: '11:00 PM'
    },
    {
        nombre: 'Museo Nacional de Bellas Artes',
        lat: -33.4367,
        lng: -70.6417,
        tipo: 'cultura',
        descripcion: 'Museo con una impresionante colección de arte chileno y latinoamericano.',
        precio: '$1,000 CLP',
        contacto: '+56 2 2496 1224',
        direccion: 'José Miguel de La Barra 650, Santiago Centro',
        categoria: 'Museo',
        horario_apertura: '10:00 AM',
        horario_cierre: '06:00 PM'
    },
    {
        nombre: 'Cerro San Cristóbal',
        lat: -33.4299,
        lng: -70.6344,
        tipo: 'turismo',
        descripcion: 'Uno de los cerros más grandes de Santiago, con vistas panorámicas de la ciudad.',
        precio: 'Entrada libre',
        contacto: '+56 2 2738 8600',
        direccion: 'Pio Nono 450, Recoleta',
        categoria: 'Turismo',
        horario_apertura: '08:30 AM',
        horario_cierre: '08:00 PM'
    },
    {
        nombre: 'Mercado Central',
        lat: -33.4361,
        lng: -70.6483,
        tipo: 'comida',
        descripcion: 'Famoso mercado donde se puede disfrutar de mariscos frescos y cocina local.',
        precio: 'Precio varía por restaurante',
        contacto: '+56 2 2698 1719',
        direccion: 'San Pablo 967, Santiago Centro',
        categoria: 'Mercado',
        horario_apertura: '09:00 AM',
        horario_cierre: '05:00 PM'
    }
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
      <div className="info-panel">
        <h2>{selectedPlace.nombre}</h2>
        <p className="description">{selectedPlace.descripcion}</p>
        <div className="details">
          <p><strong>Precio:</strong> {selectedPlace.precio}</p>
          <p><strong>Categoría:</strong> {selectedPlace.categoria}</p>
          <p><strong>Horario de Apertura:</strong> {selectedPlace.horario_apertura}</p>
          <p><strong>Horario de Cierre:</strong> {selectedPlace.horario_cierre}</p>
          <p><strong>Dirección:</strong> {selectedPlace.direccion}</p>
          <p><strong>Contacto:</strong> {selectedPlace.contacto}</p>
          <br></br>
          <button className="update-location-btnn">Más información</button>
        </div>
      </div>)}
      

       
    </div>
  );
};

export default GoogleMapComponent;
