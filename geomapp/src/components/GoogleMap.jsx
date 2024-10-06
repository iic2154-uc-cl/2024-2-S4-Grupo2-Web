import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -33.45694,  // Coordenadas iniciales para Santiago, Chile
  lng: -70.64827,
};

const GoogleMapComponent = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(center);
  const [userMarker, setUserMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const lugares = [
    { nombre: 'Costanera Center', lat: -33.4175, lng: -70.6067, descripcion: 'Centro comercial más grande de Santiago y torre más alta de Latinoamérica.' },
    { nombre: 'Parque Bicentenario', lat: -33.3989, lng: -70.6001, descripcion: 'Un hermoso parque en Vitacura, ideal para actividades al aire libre.' },
    // Otros lugares...
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
      });
    }
  }, []);

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        map.panTo(newLocation); // Centrar el mapa en la nueva ubicación
        if (userMarker) {
          userMarker.setPosition(newLocation); // Actualizar la posición del marcador del usuario
        }
      });
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAJuzF9SX5VP6CU38hq-lgRopJ66jYgb5E">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={12}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <Marker
            position={userLocation}
            onLoad={(marker) => setUserMarker(marker)}
            title="Tu ubicación"
          />

          {lugares.map((lugar, index) => (
            <Marker
              key={index}
              position={{ lat: lugar.lat, lng: lugar.lng }}
              onClick={() => setSelectedPlace(lugar)}
              title={lugar.nombre}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {selectedPlace && (
        <div id="info-lugar" className="info-lugar show">
          <h2>{selectedPlace.nombre}</h2>
          <p>{selectedPlace.descripcion}</p>
        </div>
      )}

      <button
        onClick={updateLocation}
        className="update-location-btn"
      >
        Actualizar ubicación
      </button>
    </div>
  );
};

export default GoogleMapComponent;
