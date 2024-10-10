// UpdateLocationButton.js
import React from 'react';

const UpdateLocationButton = ({ onClick }) => {
  return (
    <button className="update-location-btnn" onClick={onClick}>
      Actualizar ubicación
    </button>
  );
};

export default UpdateLocationButton;
