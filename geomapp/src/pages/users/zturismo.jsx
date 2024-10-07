import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';

const subcategories = [
  { label: 'Cultural', value: 'cultural' },
  { label: 'Aventura', value: 'aventura' },
  { label: 'Balnearios', value: 'balnearios' },
  { label: 'Parques', value: 'parques' },
  { label: 'Entretención', value: 'entretencion' }
];

function TurismoForm() {
  const [formData, setFormData] = useState({
    subcategoria: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    nombreContacto: '',
    celularContacto: '',
    mailContacto: '',
    instagram: '',
    facebook: '',
    paginaWeb: '',
    precioEntrada: '', // Cambiado el nombre a precioEntrada
    disponible: false,
    horarios: {
      lunes: { inicio: '', fin: '', abierto: false },
      martes: { inicio: '', fin: '', abierto: false },
      miercoles: { inicio: '', fin: '', abierto: false },
      jueves: { inicio: '', fin: '', abierto: false },
      viernes: { inicio: '', fin: '', abierto: false },
      sabado: { inicio: '', fin: '', abierto: false },
      domingo: { inicio: '', fin: '', abierto: false },
    },
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHorarioChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [day]: { ...prev.horarios[day], [field]: value }
      }
    }));
  };

  const handleCheckboxChange = (day) => {
    setFormData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [day]: {
          ...prev.horarios[day],
          abierto: !prev.horarios[day].abierto
        }
      }
    }));
  };

  const handleSubmit = () => {
    // Lógica para guardar los datos
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h1>Turismo</h1>
      <FormControl fullWidth>
        <InputLabel id="subcategoria-label">Subcategoría</InputLabel>
        <Select
          labelId="subcategoria-label"
          id="subcategoria"
          value={formData.subcategoria}
          onChange={(e) => handleInputChange('subcategoria', e.target.value)}
        >
          {subcategories.map(sub => (
            <MenuItem key={sub.value} value={sub.value}>{sub.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Título"
        value={formData.titulo}
        onChange={(e) => handleInputChange('titulo', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Descripción"
        value={formData.descripcion}
        onChange={(e) => handleInputChange('descripcion', e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />

      <TextField
        fullWidth
        label="Ubicación"
        value={formData.ubicacion}
        onChange={(e) => handleInputChange('ubicacion', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Nombre Contacto"
        value={formData.nombreContacto}
        onChange={(e) => handleInputChange('nombreContacto', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Número de Celular Contacto"
        value={formData.celularContacto}
        onChange={(e) => handleInputChange('celularContacto', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Mail Contacto"
        value={formData.mailContacto}
        onChange={(e) => handleInputChange('mailContacto', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Instagram"
        value={formData.instagram}
        onChange={(e) => handleInputChange('instagram', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Facebook"
        value={formData.facebook}
        onChange={(e) => handleInputChange('facebook', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Página Web"
        value={formData.paginaWeb}
        onChange={(e) => handleInputChange('paginaWeb', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Precio Entrada" // Cambiado a "Precio Entrada"
        type="number"
        value={formData.precioEntrada} // Cambiado a precioEntrada
        onChange={(e) => handleInputChange('precioEntrada', e.target.value)} // Cambiado a precioEntrada
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.disponible}
            onChange={(e) => handleInputChange('disponible', e.target.checked)}
          />
        }
        label="Actualmente Disponible"
      />

      {formData.disponible && (
        <>
          <h3>Horarios de Apertura por Día</h3>
          <Grid container spacing={2}>
            {Object.keys(formData.horarios).map(day => (
              <Grid item xs={12} sm={6} md={4} key={day}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.horarios[day].abierto}
                      onChange={() => handleCheckboxChange(day)}
                    />
                  }
                  label={`Abierto ${day.charAt(0).toUpperCase() + day.slice(1)}`}
                />
                {formData.horarios[day].abierto && (
                  <>
                    <TextField
                      fullWidth
                      label="Hora Inicio"
                      type="time"
                      value={formData.horarios[day].inicio}
                      onChange={(e) => handleHorarioChange(day, 'inicio', e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Hora Fin"
                      type="time"
                      value={formData.horarios[day].fin}
                      onChange={(e) => handleHorarioChange(day, 'fin', e.target.value)}
                      margin="normal"
                    />
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <div>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmit}>
          Guardar
        </Button>
      </div>
    </div>
  );
}

export default TurismoForm;
