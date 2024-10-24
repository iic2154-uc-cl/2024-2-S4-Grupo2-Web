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
    { label: 'Estadios', value: 'estadios' },
    { label: 'Centros de Ski', value: 'centros-ski' },
    { label: 'Canchas de Tenis', value: 'canchas-tenis' },
    { label: 'Canchas de Padel', value: 'canchas-padel' },
    { label: 'Canchas de Fútbol', value: 'canchas-futbol' },
    { label: 'Club de Golf', value: 'club-golf' },
    { label: 'Piscina', value: 'piscina' },
];

function CentrosDeportivosForm({ handleNext }) {
    const [formData, setFormData] = useState({
        subcategoria: '',
        titulo: '',
        descripcion: '',
        reglas: '',
        ubicacion: '',
        nombreContacto: '',
        celularContacto: '',
        mailContacto: '',
        instagram: '',
        facebook: '',
        paginaWeb: '',
        precio: '', 
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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.subcategoria) {newErrors.subcategoria = 'Selecciona una subcategoría.';}
        if (!formData.titulo) {newErrors.titulo = 'Escribe un título.';}
        if (!formData.descripcion) {newErrors.descripcion = 'Escribe una descripción.';}
        if (!formData.ubicacion) {
          newErrors.ubicacion = 'Escribe una ubicación (Ej: Calle 123, Comuna, Ciudad).';
        } else if (!/^[\w\s,.-]+$/.test(formData.ubicacion)) { // Simple regex for address format
          newErrors.ubicacion = 'Debes seguir el formato de dirección: Calle 123, Comuna, Ciudad.';
        }
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
        if (!formData.precio) {
          newErrors.precio = 'Se debe escribir un precio.';
        }
        if (formData.paginaWeb && !/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,4}(\/[\w\-\.]*)*$/.test(formData.paginaWeb)) {
          newErrors.paginaWeb = 'Debes escribir en el formato indicado de página web. Ej: https://www.ejemplo.com';
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
          console.log('Formulario válido, proceder...');
          handleNext(); 
        } else {
          console.log('Errores en el formulario:', errors);
        }
      };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h1>Centros Deportivos</h1>
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
                {errors.subcategoria && <Typography color="error">{errors.subcategoria}</Typography> || 'Campo obligatorio'}
            </FormControl>

            <TextField
                fullWidth
                label="Título"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                margin="normal"
                error={Boolean(errors.titulo)}
                helperText={errors.titulo || 'Campo obligatorio'}
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
                helperText={errors.descripcion||'Campo obligatorio'}
            />

            <TextField
                fullWidth
                label="Reglas"
                value={formData.reglas}
                onChange={(e) => handleInputChange('reglas', e.target.value)}
                margin="normal"
                multiline
                rows={3}
            />

            <TextField
                fullWidth
                label="Ubicación: Calle 123, Comuna, Ciudad"
                value={formData.ubicacion}
                onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                margin="normal"
                error={Boolean(errors.ubicacion)}
                helperText={errors.ubicacion||'Campo obligatorio'}
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
                label="Número de Celular Contacto: 9 1122 3344"
                value={formData.celularContacto}
                onChange={(e) => handleInputChange('celularContacto', e.target.value)}
                margin="normal"
                error={Boolean(errors.celularContacto)}
                helperText={errors.celularContacto}
                type = "number"
            />

            <TextField
                fullWidth
                label="Mail Contacto: usuario@dominio.com"
                value={formData.mailContacto}
                onChange={(e) => handleInputChange('mailContacto', e.target.value)}
                margin="normal"
                error={Boolean(errors.mailContacto)}
                helperText={errors.mailContacto}
            />
            {errors.contacto && <Typography color="error">{errors.contacto}</Typography> || 'Incluir al menos el número de celular o mail de contacto'} 
            
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
                label="Precio por Hora" // Aquí cambias el texto
                value={formData.precio}
                onChange={(e) => handleInputChange('precio', e.target.value)}
                margin="normal"
                type="number"
                error={Boolean(errors.precio)}
                helperText={errors.precio||'Campo Obligatorio'}
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
                                        {errors[`horario_${day}`] && <Typography color="error">{errors[`horario_${day}`]}</Typography>}
                                    </>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            <div>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Enviar
            </Button>
            </div>

        </form>
    );
}
CentrosDeportivosForm.propTypes = {
    handleNext: PropTypes.func.isRequired,
  };
export default CentrosDeportivosForm;