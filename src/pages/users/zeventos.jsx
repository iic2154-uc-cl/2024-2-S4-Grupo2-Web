import '../../styles/users/zeventos.css';
import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const subcategories = [
    { label: 'Deportivos', value: 'deportivos' },
    { label: 'Música', value: 'musica' },
    { label: 'Talleres', value: 'talleres' },
    { label: 'Otros', value: 'otros' },
  ]; 

function EventosForm({ handleNext }) {
    const [eventDetails, setEventDetails] = useState({
        tipo: '',
        titulo: '',
        descripcion: '',
        ubicacion: '',
        fechasDisponibles: [],
        nombreContacto: '',
        numeroCelular: '',
        mailContacto: '',
        instagram: '',
        facebook: '',
        paginaWeb: '',
        precio: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (event) => {
        setEventDetails({
            ...eventDetails,
            [field]: event.target.value
        });
        setErrors(prev => ({ ...prev, [field]: '' })); // Reset error when value changes
    };

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            fechasDisponibles: [
                ...prevDetails.fechasDisponibles,
                { fecha: formattedDate, horarioInicio: '', horarioFin: '' }
            ]
        }));
    };

    const handleTimeChange = (index, field) => (event) => {
        const updatedFechas = [...eventDetails.fechasDisponibles];
        updatedFechas[index][field] = event.target.value;
        setEventDetails({
            ...eventDetails,
            fechasDisponibles: updatedFechas
        });
    };

    // Nueva función para eliminar fechas
    const handleDeleteDate = (index) => {
        const updatedFechas = eventDetails.fechasDisponibles.filter((_, i) => i !== index);
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            fechasDisponibles: updatedFechas
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!eventDetails.tipo) newErrors.tipo = 'Selecciona un tipo de evento.';
        if (!eventDetails.titulo) newErrors.titulo = 'Escribe un título.';
        if (!eventDetails.descripcion) newErrors.descripcion = 'Escribe una descripción.';
        if (!eventDetails.ubicacion) {
            newErrors.ubicacion = 'Escribe una ubicación (Ej: Calle 123, Comuna, Ciudad).';
        } else if (!/^[\w\s,.-]+$/.test(eventDetails.ubicacion)) { // Simple regex for address format
            newErrors.ubicacion = 'Debes seguir el formato de dirección: Calle 123, Comuna, Ciudad.';
        }

        if (!eventDetails.numeroCelular && !eventDetails.mailContacto) {
            newErrors.contacto = 'Debes incluir al menos el número de celular de contacto o el mail de contacto.';
        } else {
            if (eventDetails.numeroCelular && !/^\d+$/.test(eventDetails.numeroCelular)) { // Validar que solo incluya números
                newErrors.numeroCelular = 'El número de celular debe contener solo números. Ej: 9 8765 4321.';
            }
            if (eventDetails.mailContacto && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(eventDetails.mailContacto)) { // Simple regex for email
                newErrors.mailContacto = 'Escribir el email en su debido formato. Ej: usuario@dominio.com';
            }
        }

        if (!eventDetails.precio) newErrors.precio = 'Escribe un precio.';

        if (eventDetails.paginaWeb && !/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,4}(\/[\w\-\.]*)*$/.test(eventDetails.paginaWeb)) {
            newErrors.paginaWeb = 'Debes escribir en el formato indicado de página web. Ej: https://www.ejemplo.com';
        }

        // Validate fechasDisponibles for horarioInicio and horarioFin
        eventDetails.fechasDisponibles.forEach((fecha, index) => {
            if (!fecha.horarioInicio || !fecha.horarioFin) {
                newErrors[`horario_${index}`] = 'Debes especificar la hora de inicio y fin para cada fecha.';
            }
        });

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
            <h1>Eventos</h1>
            <FormControl fullWidth>
                <InputLabel id="event-type-label">Tipo de Evento</InputLabel>
                <Select
                    labelId="event-type-label"
                    id="event-type"
                    value={eventDetails.tipo}
                    label="Tipo de Evento"
                    onChange={handleChange('tipo')}
                >
                    {subcategories.map(sub => (
                        <MenuItem key={sub.value} value={sub.value}>{sub.label}</MenuItem>
                    ))}
                </Select>
                {errors.tipo && <Typography color="error">{errors.tipo}</Typography>||'Campo obligatorio'}
            </FormControl>

            <TextField
                fullWidth
                label="Título"
                value={eventDetails.titulo}
                onChange={handleChange('titulo')}
                margin="normal"
                error={Boolean(errors.titulo)}
                helperText={errors.titulo||'Campo obligatorio'}
            />
            <TextField
                fullWidth
                label="Descripción"
                value={eventDetails.descripcion}
                onChange={handleChange('descripcion')}
                margin="normal"
                multiline
                rows={4}
                error={Boolean(errors.descripcion)}
                helperText={errors.descripcion||'Campo obligatorio'}
            />
            <TextField
                fullWidth
                label="Ubicación: Calle 123, Comuna, Ciudad"
                value={eventDetails.ubicacion}
                onChange={handleChange('ubicacion')}
                margin="normal"
                error={Boolean(errors.ubicacion)}
                helperText={errors.ubicacion||'Campo obligatorio'}
            />

            <TextField
                fullWidth
                label="Nombre de Contacto"
                value={eventDetails.nombreContacto}
                onChange={handleChange('nombreContacto')}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Número de Celular de Contacto: 9 1122 3344"
                value={eventDetails.numeroCelular}
                onChange={handleChange('numeroCelular')}
                margin="normal"
                type="number"
                error={Boolean(errors.numeroCelular)}
                helperText={errors.numeroCelular}
            />
            <TextField
                fullWidth
                label="Mail de Contacto: usuario@dominio.com"
                value={eventDetails.mailContacto}
                onChange={handleChange('mailContacto')}
                margin="normal"
                error={Boolean(errors.mailContacto)}
                helperText={errors.mailContacto}
            />

            {errors.contacto && <Typography color="error">{errors.contacto}</Typography>|| 'Incluir al menos el número de celular o mail de contacto'} {/* Mensaje de error de contacto */}

            <TextField
                fullWidth
                label="Instagram: usuario"
                value={eventDetails.instagram}
                onChange={handleChange('instagram')}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Facebook: usuario"
                value={eventDetails.facebook}
                onChange={handleChange('facebook')}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Página Web: https://www.ejemplo.com"
                value={eventDetails.paginaWeb}
                onChange={handleChange('paginaWeb')}
                margin="normal"
                error={Boolean(errors.paginaWeb)}
                helperText={errors.paginaWeb}
            />

            <TextField
                fullWidth
                label="Precio Entrada"
                type="number"
                value={eventDetails.precio}
                onChange={handleChange('precio')}
                margin="normal"
                error={Boolean(errors.precio)}
                helperText={errors.precio||'Campo obligatorio'}
            />

            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Seleccionar Fechas Disponibles"
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
                    />
                </LocalizationProvider>
            </div>

            <div>
                <h3>Fechas seleccionadas:</h3>
                <p>A continuación se mostrarán las fechas selecciondas por usted. Por favor, ingresa hora de inicio y fin.</p>
                {eventDetails.fechasDisponibles.map((fecha, index) => (
                    <div key={index}>
                        <Typography variant="body1">
                            {`Fecha: ${fecha.fecha}`} 
                            <Button onClick={() => handleDeleteDate(index)} style={{ marginLeft: '10px', color: 'red' }}>X</Button>
                        </Typography>
                        <TextField
                            label="Horario de Inicio"
                            type="time"
                            onChange={handleTimeChange(index, 'horarioInicio')}
                            margin="normal"
                        />
                        <TextField
                            label="Horario de Fin"
                            type="time"
                            onChange={handleTimeChange(index, 'horarioFin')}
                            margin="normal"
                        />
                        {errors[`horario_${index}`] && <Typography color="error">{errors[`horario_${index}`]}</Typography>}
                    </div>
                ))}
            </div>

            <Button variant="contained" color="primary" type="submit">
                Enviar
            </Button>
        </form>
    );
}

EventosForm.propTypes = {
    handleNext: PropTypes.func.isRequired,
};

export default EventosForm;