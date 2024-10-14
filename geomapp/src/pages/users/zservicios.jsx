import '../../styles/users/zservicios.css';
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
    { label: 'Gasfiter', value: 'gasfiter' },
    { label: 'Talleres Mecánicos', value: 'talleres-mecanicos' },
    { label: 'Gasolineras', value: 'gasolineras' },
    { label: 'Supermercados', value: 'supermercados' },
    { label: 'Restaurantes', value: 'restaurantes' },
    { label: 'Centros Médicos', value: 'centros-medicos' },
  ];

function ServiciosForm({ handleNext }) {
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
                [day]: {
                    ...prev.horarios[day],
                    [field]: value
                }
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
        
        if (!formData.subcategoria) {newErrors.subcategoria = 'Selecciona una tipo de servicio.';}
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
            <h1>Servicios Comunitarios</h1>
            <FormControl fullWidth>
                <InputLabel id="tipo-servicio-label">Tipo de Servicio</InputLabel>
                <Select
                    labelId="tipo-servicio-label"
                    id="tipo-servicio-select"
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
                margin="normal"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                error={Boolean(errors.titulo)}
                helperText={errors.titulo}
            />
            <TextField
                fullWidth
                label="Descripción"
                margin="normal"
                multiline
                rows={4}
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                error={Boolean(errors.descripcion)}
                helperText={errors.descripcion}
            />
            <TextField
                fullWidth
                label="Ubicación: Calle 123, Comuna, Ciudad"
                margin="normal"
                value={formData.ubicacion}
                onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                error={Boolean(errors.ubicacion)}
                helperText={errors.ubicacion}
            />

            <TextField
                fullWidth
                label="Nombre de Contacto"
                margin="normal"
                value={formData.nombreContacto}
                onChange={(e) => handleInputChange('nombreContacto', e.target.value)}
            />
            <TextField
                fullWidth
                label="Número de Celular de Contacto: 9 1122 3344"
                margin="normal"
                value={formData.celularContacto}
                onChange={(e) => handleInputChange('celularContacto', e.target.value)}
                type = "number"
                error={Boolean(errors.celularContacto)}
                helperText={errors.celularContacto}
            />

            <TextField
                fullWidth
                label="Mail de Contacto: usuario@dominio.com"
                margin="normal"
                value={formData.mailContacto}
                onChange={(e) => handleInputChange('mailContacto', e.target.value)}
                error={Boolean(errors.mailContacto)}
                helperText={errors.mailContacto}
            />

            {errors.contacto && <Typography color="error">{errors.contacto}</Typography>} {/* Mensaje de error de contacto */}

            <TextField
                fullWidth
                label="Instagram: usuario"
                margin="normal"
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
            />
            <TextField
                fullWidth
                label="Facebook: usuario"
                margin="normal"
                value={formData.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
            />
            <TextField
                fullWidth
                label="Página Web: https://www.ejemplo.com"
                margin="normal"
                value={formData.paginaWeb}
                onChange={(e) => handleInputChange('paginaWeb', e.target.value)}
                error={Boolean(errors.paginaWeb)}
                helperText={errors.paginaWeb}
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
                    <h2>Horarios de Apertura por Día</h2>
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
                                            label={`Hora Inicio`}
                                            type="time"
                                            value={formData.horarios[day].inicio}
                                            onChange={(e) => handleHorarioChange(day, 'inicio', e.target.value)}
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label={`Hora Fin`}
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

ServiciosForm.propTypes = {
    handleNext: PropTypes.func.isRequired,
  };
export default ServiciosForm;

