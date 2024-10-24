import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { padding } from '@mui/system';
import { set } from 'date-fns';

const Filter = ({ onCategoryChange, onSubCategoryChange, onRatingChange, onPriceChange, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSubIndustries, setSelectedSubIndustries] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [rangePrice, setRangePrice] = useState([0, 100000]);

  // lista de las categorías
  const industries = [
    'Propiedad',
    'Camping',
    'Servicios y Oficios',
    'Eventos',
  ];

  // diccionario de las subcategorías
  const subindustries = {
    'Propiedad': ['Arriendos', 'Cabañas', 'Departamentos', 'Casas', 'Hospedaje', 'Hostelería'],
    'Camping': ['Camping'],
    'Servicios y Oficios': ['Negocios y tiendas', 'Restaurantes y Comida', 'Cultura', 'Tours y Transporte', 
                            'Tiempo libre y Deporte', 'Entretención', 'Mundo Holístico', 'Mundo Familiar y Salud', 'Mascotas', 'Oficios'],

    'Eventos': ['Eventos']
  };

  // función para manejar el cambio de los checkboxes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const updatedCategories = selectedIndustries.includes(value)
      ? selectedIndustries.filter((item) => item !== value)
      : [...selectedIndustries, value];

    // actualizar las categorías seleccionadas
    setSelectedIndustries(updatedCategories);
    onCategoryChange(updatedCategories);

    // si se deselecciona una categoría, se deseleccionan las subcategorías de esa categoría
    setSelectedSubIndustries((prev) =>
      prev.filter((item) => !subindustries[value].includes(item))
    );
  };
  
  // manejar el cambio de los checkboxes de las subcategorías
  const handleSubCheckboxChange = (event) => {
    const value = event.target.value;
    const updatedSubCategories = selectedSubIndustries.includes(value)
      ? selectedSubIndustries.filter((item) => item !== value)
      : [...selectedSubIndustries, value];

    // actualizar las subcategorías seleccionadas
    setSelectedSubIndustries(updatedSubCategories);
    onSubCategoryChange(updatedSubCategories);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
    };

  // resetea los filtros
  const handleReset = () => {
    setSelectedIndustries([]);
    onCategoryChange([]);
    setSelectedSubIndustries([]);
    onSubCategoryChange([]);
    setSearchTerm('');
    setSelectedRating(0);
    onRatingChange(0);
    setRangePrice([0, 100000]);
    onPriceChange([0, 100000]);
  };

  const handleShowResults = () => {
    console.log('Industrias seleccionadas:', selectedIndustries);
    console.log('Subindustrias seleccionadas:', selectedSubIndustries);
    console.log('Rating seleccionado:', selectedRating);
    console.log('Rango de precio:', rangePrice);
    console.log('Término de búsqueda:', searchTerm);
  };
  
  // Manejar el cambio de rating
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onRatingChange(rating);
  }

  // Manejar el cambio de Precio
    const handlePriceChange = (event, newValue) => {
        setRangePrice(newValue);
        onPriceChange(newValue);
    }

  return (
    <div className="filter">
        <input
            type="text"
            className="search-input"
            placeholder="Búsqueda por contenido"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <h3>Categoría</h3>
        <div className="checkbox-list">
            {industries.map((industry, index) => (
              <div className="checkbox-item" key={industry}>
                <input
                    className="checkbox"
                    type="checkbox"
                    id={`checkbox-${index}`}
                    value={industry}
                    checked={selectedIndustries.includes(industry)}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor={`checkbox-${index}`}>{industry}</label>
                </div>
            ))}
            <div className="no-results-message" style={{ display: industries.length ? 'none' : 'block' }}>
            No results found
            </div>
        </div>
        
        {/* linea de separación */}
        <hr/>

        <h3>Subcategoría</h3>
        <div className="checkbox-list subcategories">
            {selectedIndustries.map((industry) => (
              <div>
                <p className='name-subcategory'>{industry}</p>
                {subindustries[industry].map((subindustry, index) => (
                  <div className="checkbox-item" key={subindustry}>
                    <input
                        className="checkbox"
                        type="checkbox"
                        id={`checkbox-${index}`}
                        value={subindustry}
                        checked={selectedSubIndustries.includes(subindustry)}
                        onChange={handleSubCheckboxChange}
                    />
                    <label htmlFor={`checkbox-${index}`}>{subindustry}</label>
                  </div>
                ))}
              </div>
            ))}
            {selectedIndustries.length === 0 && (
                <div className="no-results-message">Seleccione una categoría</div>
            )}
        </div>

        {/* linea de separación */}
        <hr/>

        <h3>Rating</h3>
        <div className="rating-list">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
              className='rating'
              style={{
                cursor: 'pointer',
                color: selectedRating >= rating ? '#fa7e02' : '#fa7e0270',
                fontSize: `20px`,
              }}
              onClick={() => {
                handleRatingChange(rating);
              }}
            >
              {''}
              ★{''}
            </span>
            ))}
            <span className='rating-text'>
                {selectedRating ? `(${selectedRating} estrellas)` : '(Todos)'}
            </span>
        </div>

        {/* linea de separación */}
        <hr/>

        <h3>Precio</h3>
        <div className="price-list">
            {/* rango de precio: 0 - 100000 */}
            <Slider
                value={rangePrice}
                onChange={handlePriceChange}
                valueLabelDisplay="off"
                min={0}
                max={100000}
                step={1000}
                style={{ width: '100%', color: '#fa7e02' }}
            />
            <span className='price-text'>
                <span>{`$${rangePrice[0]}`}</span>
                <span>{' - '}</span>
                <span>{`$${rangePrice[1]}`}</span>
            </span>
    
        </div>
        
        <div className="buttons">
            <button id="showResultsBtn" className="show-results-btn" onClick={handleReset}>
            Limpiar
            </button>
            {/*<button id="showResultsBtn" className="show-results-btn" onClick={handleShowResults}>
            Buscar
            </button>*/}
        </div>
    </div>
  );
};

export default Filter;
