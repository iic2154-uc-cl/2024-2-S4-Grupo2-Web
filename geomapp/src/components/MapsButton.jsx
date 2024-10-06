// UpdateLocationButton.js
import React from 'react';

const UpdateLocationButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="update-location-btnn">
      Actualizar ubicación
    </button>
  );
};

export default UpdateLocationButton;
