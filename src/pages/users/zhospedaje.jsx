import '../../styles/users/zhospedaje.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
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
  { label: 'Hotel', value: 'hotel' },
  { label: 'Cabaña', value: 'cabana' },
  { label: 'Camping', value: 'camping' }
];

function HospedajeForm({ handleNext }) {
  const [formData, setFormData] = useState({
    subcategoria: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    dormitorios: '',
    camasSimples: '',
    camasDobles: '',
    cantidadMinima: '',
    cantidadMaxima: '',
    nombreContacto: '',
    celularContacto: '',
    mailContacto: '',
    instagram: '',
    facebook: '',
    paginaWeb: '',
    precioPorNoche: '',
    disponible: false,
    incluyeDesayuno: false,
    incluyeToallasSabanas: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // Reset error when value changes
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.subcategoria) {newErrors.subcategoria = 'Selecciona un tipo de acomodación.';}
    if (!formData.titulo) {newErrors.titulo = 'Escribe un título.';}
    if (!formData.descripcion) {newErrors.descripcion = 'Escribe una descripción.';}
    if (!formData.ubicacion) {
      newErrors.ubicacion = 'Escribe una ubicación (Ej: Calle 123, Comuna, Ciudad).';
    } else if (!/^[\w\s,.-]+$/.test(formData.ubicacion)) { // Simple regex for address format
      newErrors.ubicacion = 'Debes seguir el formato de dirección: Calle 123, Comuna, Ciudad.';
    }

    if (!formData.dormitorios) {newErrors.dormitorios = 'Ingresa cantidad de dormitorios.';}
    if (!formData.camasSimples) {newErrors.camasSimples = 'Ingresa cantidad de camas simples.';}
    if (!formData.camasDobles) {newErrors.camasDobles = 'Ingresa cantidad de camas dobles.';}
    if (!formData.cantidadMaxima) {newErrors.cantidadMaxima = 'Ingresa cantidad máxima de personas para la acomodación.';}
    if (!formData.cantidadMinima) {newErrors.cantidadMinima = 'Ingresa cantidad mínima de personas para la acomodación.';}

    if (!formData.celularContacto && !formData.mailContacto) {
      newErrors.contacto = 'Debes incluir al menos el número de celular de contacto o el mail de contacto.';
    } else {
      if (formData.celularContacto && !/^\d+$/.test(formData.celularContacto)) { // Validar que solo incluya números
        newErrors.celularContacto = 'El número de celular debe contener solo números. Ej: 9 8765 4321.';
      }
      if (formData.mailContacto && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.mailContacto)) { // Simple regex for email
        newErrors.mailContacto = 'Escribir el email en su debido formato. Ej: usuario@dominio.com';
      }
    }
    if (!formData.precioPorNoche) {
      newErrors.precioPorNoche = 'Se debe escribir un precio por noche.';
    }
    if (formData.paginaWeb && !/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,4}(\/[\w\-\.]*)*$/.test(formData.paginaWeb)) {
      newErrors.paginaWeb = 'Debes escribir en el formato indicado de página web. Ej: https://www.ejemplo.com';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario válido, proceder...');
      handleNext(); 
    } else {
      console.log('Errores en el formulario:', errors);
    }
  };

  

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Hospedaje</h1>
      
      <FormControl fullWidth>
        <InputLabel id="tipo-acomodacion-label">Tipo de Acomodación</InputLabel>
        <Select
          labelId="tipo-acomodacion-label"
          id="tipo-acomodacion"
          value={formData.subcategoria}
          label="Tipo de Acomodación"
          onChange={(e) => handleInputChange('subcategoria', e.target.value)}
        >
          {subcategories.map((type) => (
            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
          ))}
        </Select>
        {errors.subcategoria && <Typography color="error">{errors.subcategoria}</Typography> || 'Campo Obligatorio'}

      </FormControl>

      <TextField
        fullWidth
        label="Título"
        value={formData.titulo}
        onChange={(e) => handleInputChange('titulo', e.target.value)}
        margin="normal"
        error={Boolean(errors.titulo)}
        helperText={errors.titulo|| 'Campo Obligatorio'}
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
        helperText={errors.descripcion|| 'Campo Obligatorio'}
      />

      <TextField
        fullWidth
        label="Ubicación: Calle 123, Comuna, Ciudad"
        value={formData.ubicacion}
        onChange={(e) => handleInputChange('ubicacion', e.target.value)}
        margin="normal"
        error={Boolean(errors.ubicacion)}
        helperText={errors.ubicacion|| 'Campo Obligatorio'}
      />

      <TextField
        fullWidth
        label="Dormitorios"
        type="number"
        margin="normal"
        value={formData.dormitorios}
        onChange={(e) => handleInputChange('dormitorios', e.target.value)}
        error={Boolean(errors.dormitorios)}
        helperText={errors.dormitorios|| 'Campo Obligatorio'}
      />

      <TextField
        fullWidth
        label="Camas Simples"
        type="number"
        value={formData.camasSimples}
        onChange={(e) => handleInputChange('camasSimples', e.target.value)}
        margin="normal"
        error={Boolean(errors.camasSimples)}
        helperText={errors.camasSimples|| 'Campo Obligatorio'}
      />

      <TextField
        fullWidth
        label="Camas Dobles"
        type="number"
        value={formData.camasDobles}
        onChange={(e) => handleInputChange('camasDobles', e.target.value)}
        margin="normal"
        error={Boolean(errors.camasDobles)}
        helperText={errors.camasDobles|| 'Campo Obligatorio'}
      />

      <TextField
        fullWidth
        label="Cantidad Mínima de Personas"
        type="number"
        value={formData.cantidadMinima}
        onChange={(e) => handleInputChange('cantidadMinima', e.target.value)}
        margin="normal"
        error={Boolean(errors.cantidadMinima)}
        helperText={errors.cantidadMinima|| 'Campo Obligatorio'}
      />

      <TextField
        fullWidth
        label="Cantidad Máxima de Personas"
        type="number"
        value={formData.cantidadMaxima}
        onChange={(e) => handleInputChange('cantidadMaxima', e.target.value)}
        margin="normal"
        error={Boolean(errors.cantidadMaxima)}
        helperText={errors.cantidadMaxima|| 'Campo Obligatorio'}
      />

      <TextField
        fullWidth
        label="Nombre de Contacto"
        value={formData.nombreContacto}
        onChange={(e) => handleInputChange('nombreContacto', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Número de Celular de Contacto: 9 1122 3344"
        value={formData.celularContacto}
        onChange={(e) => handleInputChange('celularContacto', e.target.value)}
        margin="normal"
        type = "number"
        error={Boolean(errors.celularContacto)}
        helperText={errors.celularContacto}
      />

      <TextField
        fullWidth
        label="Mail de Contacto: usuario@dominio.com"
        value={formData.mailContacto}
        onChange={(e) => handleInputChange('mailContacto', e.target.value)}
        margin="normal"
        error={Boolean(errors.mailContacto)}
        helperText={errors.mailContacto}
      />
      
      {errors.contacto && <Typography color="error">{errors.contacto}</Typography> || 'Incluir al menos el número de celular o mail de contacto'} {/* Mensaje de error de contacto */}

      <TextField
        fullWidth
        label="Instagram: usuario"
        value={formData.instagram}
        onChange={(e) => handleInputChange('instagram', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Facebook: usuario"
        value={formData.facebook}
        onChange={(e) => handleInputChange('facebook', e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Página Web: https://www.ejemplo.com"
        value={formData.paginaWeb}
        onChange={(e) => handleInputChange('paginaWeb', e.target.value)}
        margin="normal"
        error={Boolean(errors.paginaWeb)}
        helperText={errors.paginaWeb}
      />

      <TextField
        fullWidth
        label="Precio por Noche"
        type="number"
        value={formData.precioPorNoche}
        onChange={(e) => handleInputChange('precioPorNoche', e.target.value)}
        margin="normal"
        error={Boolean(errors.precioPorNoche)}
        helperText={errors.precioPorNoche|| 'Campo Obligatorio'}
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

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.incluyeDesayuno}
            onChange={(e) => handleInputChange('incluyeDesayuno', e.target.checked)}
          />
        }
        label="Incluye Desayuno"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.incluyeToallasSabanas}
            onChange={(e) => handleInputChange('incluyeToallasSabanas', e.target.checked)}
          />
        }
        label="Incluye Toallas y Sábanas"
      />
      <div>
      <Button type="submit" variant="contained" className="submit-button">
          Enviar
      </Button>
      </div>
    </form>
  );
}

HospedajeForm.propTypes = {
  handleNext: PropTypes.func.isRequired,
};
export default HospedajeForm;