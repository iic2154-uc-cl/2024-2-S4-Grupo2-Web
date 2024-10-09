/*import '../../styles/users/zeventos.css';
import React, { useState, useRef, useEffect } from 'react';

function EventosForm() {
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
export default EventosForm;*/
import '../../styles/users/zeventos.css';
import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

function EventosForm() {
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

    const handleChange = (field) => (event) => {
        setEventDetails({
            ...eventDetails,
            [field]: event.target.value
        });
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



    return (
        <div>
            <h1>Eventos</h1>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="event-type-label">Tipo de Evento</InputLabel>
                <Select
                    labelId="event-type-label"
                    id="event-type"
                    value={eventDetails.tipo}
                    label="Tipo de Evento"
                    onChange={handleChange('tipo')}
                >
                    <MenuItem value="deportivos">Deportivos</MenuItem>
                    <MenuItem value="musica">Música</MenuItem>
                    <MenuItem value="talleres">Talleres</MenuItem>
                    <MenuItem value="otros">Otros</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Título"
                value={eventDetails.titulo}
                onChange={handleChange('titulo')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Descripción"
                value={eventDetails.descripcion}
                onChange={handleChange('descripcion')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Ubicación"
                value={eventDetails.ubicacion}
                onChange={handleChange('ubicacion')}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Nombre de Contacto"
                value={eventDetails.nombreContacto}
                onChange={handleChange('nombreContacto')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Número de Celular de Contacto"
                value={eventDetails.numeroCelular}
                onChange={handleChange('numeroCelular')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Mail de Contacto"
                value={eventDetails.mailContacto}
                onChange={handleChange('mailContacto')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Instagram"
                value={eventDetails.instagram}
                onChange={handleChange('instagram')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Facebook"
                value={eventDetails.facebook}
                onChange={handleChange('facebook')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Página Web"
                value={eventDetails.paginaWeb}
                onChange={handleChange('paginaWeb')}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Precio Entrada"
                type="number"
                value={eventDetails.precio}
                onChange={handleChange('precio')}
                sx={{ mb: 2 }}
            />

            <div>
            {/* Selector de Fechas */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Seleccionar Fechas Disponibles"
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
                />
            </LocalizationProvider>
            </div>

            

            {/* Muestra las fechas seleccionadas con horarios en un contenedor flex */}
            <div>
                <h3>Fechas seleccionadas:</h3>
                <p>A continuación se mostrarán las fechas selecciondas por usted. Por favor, ingresa hora de inicio y fin para cada fecha seleccionada.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {eventDetails.fechasDisponibles.map((fecha, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', width: '30%', marginRight: '5%', marginBottom: '16px' }}>
                            <p style={{ fontWeight: 'bold', marginRight: '8px' }}>{fecha.fecha}</p> {/* Fecha en negrita */}
                            <TextField
                                label="Hora Inicio"
                                type="time"
                                value={fecha.horarioInicio}
                                onChange={handleTimeChange(index, 'horarioInicio')}
                                sx={{ marginRight: '8px' }}
                            />
                            <TextField
                                label="Hora Fin"
                                type="time"
                                value={fecha.horarioFin}
                                onChange={handleTimeChange(index, 'horarioFin')}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default EventosForm;

