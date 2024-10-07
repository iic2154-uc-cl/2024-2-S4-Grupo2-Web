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
// zeventos.jsx
import '../../styles/users/zeventos.css';
import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

function EventosForm() {
    const [eventDetails, setEventDetails] = useState({
        tipo: '',
        titulo: '',
        descripcion: '',
        ubicacion: '',
        horarioInicio: '',
        horarioFin: '',
        fechasDisponibles: '',
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

    const handleSave = () => {
        // Aquí puedes agregar la lógica para guardar los datos
        console.log("Evento guardado:", eventDetails);
        // Puedes hacer una petición API o guardar en localStorage, etc.
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
                label="Horario de Inicio"
                type="time"
                value={eventDetails.horarioInicio}
                onChange={handleChange('horarioInicio')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Horario de Fin"
                type="time"
                value={eventDetails.horarioFin}
                onChange={handleChange('horarioFin')}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Fechas Disponibles"
                value={eventDetails.fechasDisponibles}
                onChange={handleChange('fechasDisponibles')}
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

            {/* Botón para guardar */}
            <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
            </Button>
        </div>
    );
}

export default EventosForm;
