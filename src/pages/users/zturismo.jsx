import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';

const subcategories = [
  { label: 'Cultural', value: 'cultural' },
  { label: 'Aventura', value: 'aventura' },
  { label: 'Balnearios', value: 'balnearios' },
  { label: 'Parques', value: 'parques' },
  { label: 'Entretención', value: 'entretencion' },
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
    precioEntrada: '',
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // Reset error when value changes
  };

  const handleHorarioChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [day]: { ...prev.horarios[day], [field]: value },
      },
    }));
  };

  const handleCheckboxChange = (day) => {
    setFormData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [day]: {
          ...prev.horarios[day],
          abierto: !prev.horarios[day].abierto,
        },
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.subcategoria) newErrors.subcategoria = 'Por favor, selecciona una subcategoría.';
    if (!formData.titulo) newErrors.titulo = 'Escribe un título.';
    if (!formData.descripcion) newErrors.descripcion = 'Escribe una descripción.';
    if (!formData.ubicacion) {
      newErrors.ubicacion = 'Escribe una ubicación.';
    } else if (!/^[\w\s,.-]+$/.test(formData.ubicacion)) { // Simple regex for address format
      newErrors.ubicacion = 'Debes seguir el formato de dirección.';
    }
    if (!formData.celularContacto && !formData.mailContacto) {
      newErrors.contacto = 'Debes incluir al menos el número de celular de contacto o el mail de contacto.';
    } else {
      if (formData.celularContacto && !/^\d+$/.test(formData.celularContacto)) { // Validar que solo incluya números
        newErrors.celularContacto = 'El número de celular debe contener solo números.';
      }
      if (formData.mailContacto && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.mailContacto)) { // Simple regex for email
        newErrors.mailContacto = 'Escribir el email en su debido formato.';
      }
    }
    if (!formData.precioEntrada) newErrors.precioEntrada = 'Se debe escribir un precio de entrada.';
    if (formData.paginaWeb && !/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,4}(\/[\w\-\.]*)*$/.test(formData.paginaWeb)) {
      newErrors.paginaWeb = 'Debes escribir en el formato indicado de página web.';
    }
    if (formData.disponible) {
      Object.keys(formData.horarios).forEach(day => {
        if (formData.horarios[day].abierto && (!formData.horarios[day].inicio || !formData.horarios[day].fin)) {
          newErrors[`horario_${day}`] = `A los días seleccionados abiertos debes ponerle hora de inicio y fin.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí va el código para proceder al siguiente paso
      console.log('Formulario válido, proceder...');
    } else {
      console.log('Errores en el formulario:', errors);
    }
  };

  return (
    <form className="form-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }} onSubmit={handleSubmit}>

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
        {errors.subcategoria && <Typography color="error">{errors.subcategoria}</Typography>}
      </FormControl>

      <TextField
        fullWidth
        label="Título"
        value={formData.titulo}
        onChange={(e) => handleInputChange('titulo', e.target.value)}
        margin="normal"
        error={Boolean(errors.titulo)}
        helperText={errors.titulo}
      />

      <TextField
        fullWidth
        label="Descripción"
        value={formData.descripcion}
        onChange={(e) => handleInputChange('descripcion', e.target.value)}
        margin="normal"
        multiline
        rows={4}
        error={Boolean(errors.descripcion)}
        helperText={errors.descripcion}
      />

      <TextField
        fullWidth
        label="Ubicación"
        value={formData.ubicacion}
        onChange={(e) => handleInputChange('ubicacion', e.target.value)}
        margin="normal"
        error={Boolean(errors.ubicacion)}
        helperText={errors.ubicacion}
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
        error={Boolean(errors.celularContacto)}
        helperText={errors.celularContacto}
      />

      <TextField
        fullWidth
        label="Mail Contacto"
        value={formData.mailContacto}
        onChange={(e) => handleInputChange('mailContacto', e.target.value)}
        margin="normal"
        error={Boolean(errors.mailContacto)}
        helperText={errors.mailContacto}
      />

      {errors.contacto && <Typography color="error">{errors.contacto}</Typography>} {/* Mensaje de error de contacto */}

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
        error={Boolean(errors.paginaWeb)}
        helperText={errors.paginaWeb}
      />

      <TextField
        fullWidth
        label="Precio Entrada"
        type="number"
        value={formData.precioEntrada}
        onChange={(e) => handleInputChange('precioEntrada', e.target.value)}
        margin="normal"
        error={Boolean(errors.precioEntrada)}
        helperText={errors.precioEntrada}
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
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                />
                {formData.horarios[day].abierto && (
                  <>
                    <TextField
                      label="Hora de Inicio"
                      type="time"
                      value={formData.horarios[day].inicio}
                      onChange={(e) => handleHorarioChange(day, 'inicio', e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      label="Hora de Fin"
                      type="time"
                      value={formData.horarios[day].fin}
                      onChange={(e) => handleHorarioChange(day, 'fin', e.target.value)}
                      margin="normal"
                    />
                    {errors[`horario_${day}`] && <Typography color="error">{errors[`horario_${day}`]}</Typography>}
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Enviar
      </Button>
    </form>
  );
}

export default TurismoForm;
