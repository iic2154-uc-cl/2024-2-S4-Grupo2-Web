import React from 'react';

const CenterMapButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="center-map-btn">
        Centrar Mapa
        </button>
    );
};

export default CenterMapButton;
