import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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
    horarioInicio: null,
    horarioFin: null,
    fechaInicio: null,
    fechaFin: null,
    nombreContacto: '',
    celularContacto: '',
    mailContacto: '',
    instagram: '',
    facebook: '',
    paginaWeb: '',
    precio: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="form-container">
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

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha de inicio"
          value={formData.fechaInicio}
          onChange={(value) => handleInputChange('fechaInicio', value)}
          renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
        />
        <DatePicker
          label="Fecha de fin"
          value={formData.fechaFin}
          onChange={(value) => handleInputChange('fechaFin', value)}
          renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
        />

        <TimePicker
          label="Horario de inicio"
          value={formData.horarioInicio}
          onChange={(value) => handleInputChange('horarioInicio', value)}
          renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
        />

        <TimePicker
          label="Horario de fin"
          value={formData.horarioFin}
          onChange={(value) => handleInputChange('horarioFin', value)}
          renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
        />
      </LocalizationProvider>

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
        label="Precio"
        value={formData.precio}
        onChange={(e) => handleInputChange('precio', e.target.value)}
        margin="normal"
      />
    </div>
  );
}

export default TurismoForm;
