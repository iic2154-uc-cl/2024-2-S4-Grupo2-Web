/*import '../../styles/users/zhospedaje.css';
import React, { useState, useRef, useEffect } from 'react';

function HospedajeForm() {
  return (
    <div>
    <h1>Titulo</h1>
    <h1>Descripcion</h1>
    <h1>Fecha de inicio</h1>
    <h1>Fecha de fin</h1>
    <h1>Hora de inicio</h1>
    <h1>Hora de fin</h1>
    <h1>Subcategorias del evento</h1>
    </div>
  );
}
export default HospedajeForm;*/
import '../../styles/users/zhospedaje.css';
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

function HospedajeForm() {
  const [details, setDetails] = useState({
    tipo: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    disponible: false,
    dormitorios: '',
    camasSimples: '',
    camasDobles: '',
    incluyeDesayuno: false,
    incluyeToallasSabanas: false,
    cantidadMinima: '',
    cantidadMaxima: '',
    nombreContacto: '',
    numeroCelular: '',
    mailContacto: '',
    instagram: '',
    facebook: '',
    paginaWeb: '',
    precioPorNoche: ''
  });

  const handleChange = (field, value) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const typesOfAccommodation = [
    { label: 'Hotel', value: 'hotel' },
    { label: 'Cabaña', value: 'cabana' },
    { label: 'Camping', value: 'camping' }
  ];

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los datos
    console.log('Datos guardados:', details);
    alert('Datos guardados correctamente!');
  };

  return (
    <div className="form-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Hospedaje</h1>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="tipo-acomodacion-label">Tipo de Acomodación</InputLabel>
        <Select
          labelId="tipo-acomodacion-label"
          id="tipo-acomodacion"
          value={details.tipo}
          label="Tipo de Acomodación"
          onChange={(e) => handleChange('tipo', e.target.value)}
        >
          {typesOfAccommodation.map((type) => (
            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Título"
        value={details.titulo}
        onChange={(e) => handleChange('titulo', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Descripción"
        value={details.descripcion}
        onChange={(e) => handleChange('descripcion', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Ubicación"
        value={details.ubicacion}
        onChange={(e) => handleChange('ubicacion', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Dormitorios"
        type="number"
        value={details.dormitorios}
        onChange={(e) => handleChange('dormitorios', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Camas Simples"
        type="number"
        value={details.camasSimples}
        onChange={(e) => handleChange('camasSimples', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Camas Dobles"
        type="number"
        value={details.camasDobles}
        onChange={(e) => handleChange('camasDobles', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Cantidad Mínima de Personas"
        type="number"
        value={details.cantidadMinima}
        onChange={(e) => handleChange('cantidadMinima', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Cantidad Máxima de Personas"
        type="number"
        value={details.cantidadMaxima}
        onChange={(e) => handleChange('cantidadMaxima', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Nombre de Contacto"
        value={details.nombreContacto}
        onChange={(e) => handleChange('nombreContacto', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Número de Celular de Contacto"
        value={details.numeroCelular}
        onChange={(e) => handleChange('numeroCelular', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Mail de Contacto"
        value={details.mailContacto}
        onChange={(e) => handleChange('mailContacto', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Instagram"
        value={details.instagram}
        onChange={(e) => handleChange('instagram', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Facebook"
        value={details.facebook}
        onChange={(e) => handleChange('facebook', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Página Web"
        value={details.paginaWeb}
        onChange={(e) => handleChange('paginaWeb', e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Precio por Noche"
        type="number"
        value={details.precioPorNoche}
        onChange={(e) => handleChange('precioPorNoche', e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={details.disponible}
            onChange={(e) => handleChange('disponible', e.target.checked)}
          />
        }
        label="Actualmente Disponible"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={details.incluyeDesayuno}
            onChange={(e) => handleChange('incluyeDesayuno', e.target.checked)}
          />
        }
        label="Incluye Desayuno"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={details.incluyeToallasSabanas}
            onChange={(e) => handleChange('incluyeToallasSabanas', e.target.checked)}
          />
        }
        label="Incluye Toallas y Sábanas"
      />
      <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        Guardar
      </Button>
      </div>
    </div>
  );
}

export default HospedajeForm;
