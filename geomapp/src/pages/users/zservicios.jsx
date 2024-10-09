/*import '../../styles/users/zservicios.css';
import React, { useState, useRef, useEffect } from 'react';

function ServiciosForm() {
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

export default ServiciosForm;*/
import '../../styles/users/zservicios.css';
import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Checkbox, FormControlLabel, Grid } from '@mui/material';

function ServiciosForm() {
    const [details, setDetails] = useState({
        tipoServicio: '',
        titulo: '',
        descripcion: '',
        ubicacion: '',
        disponible: false,
        nombreContacto: '',
        numeroCelular: '',
        emailContacto: '',
        instagram: '',
        facebook: '',
        paginaWeb: '',
        horarios: {
            lunes: { abierto: false, inicio: '', fin: '' },
            martes: { abierto: false, inicio: '', fin: '' },
            miércoles: { abierto: false, inicio: '', fin: '' },
            jueves: { abierto: false, inicio: '', fin: '' },
            viernes: { abierto: false, inicio: '', fin: '' },
            sábado: { abierto: false, inicio: '', fin: '' },
            domingo: { abierto: false, inicio: '', fin: '' },
        },
    });

    const handleDetailChange = (field, value) => {
        setDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleHorarioChange = (day, field, value) => {
        setDetails(prev => ({
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
        setDetails(prev => ({
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



    return (
        <div>
            <h1>Servicios Comunitarios</h1>
            <FormControl fullWidth margin="normal">
                <InputLabel id="tipo-servicio-label">Tipo de Servicio</InputLabel>
                <Select
                    labelId="tipo-servicio-label"
                    id="tipo-servicio-select"
                    value={details.tipoServicio}
                    onChange={(e) => handleDetailChange('tipoServicio', e.target.value)}
                >
                    <MenuItem value="gasfiter">Gasfiter</MenuItem>
                    <MenuItem value="talleres-mecanicos">Talleres Mecánicos</MenuItem>
                    <MenuItem value="gasolineras">Gasolineras</MenuItem>
                    <MenuItem value="supermercados">Supermercados</MenuItem>
                    <MenuItem value="restaurantes">Restaurantes</MenuItem>
                    <MenuItem value="centros-medicos">Centros Médicos</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Título"
                margin="normal"
                value={details.titulo}
                onChange={(e) => handleDetailChange('titulo', e.target.value)}
            />
            <TextField
                fullWidth
                label="Descripción"
                margin="normal"
                multiline
                rows={4}
                value={details.descripcion}
                onChange={(e) => handleDetailChange('descripcion', e.target.value)}
            />
            <TextField
                fullWidth
                label="Ubicación"
                margin="normal"
                value={details.ubicacion}
                onChange={(e) => handleDetailChange('ubicacion', e.target.value)}
            />

            <TextField
                fullWidth
                label="Nombre de Contacto"
                margin="normal"
                value={details.nombreContacto}
                onChange={(e) => handleDetailChange('nombreContacto', e.target.value)}
            />
            <TextField
                fullWidth
                label="Número de Celular de Contacto"
                margin="normal"
                value={details.numeroCelular}
                onChange={(e) => handleDetailChange('numeroCelular', e.target.value)}
            />
            <TextField
                fullWidth
                label="Email de Contacto"
                margin="normal"
                value={details.emailContacto}
                onChange={(e) => handleDetailChange('emailContacto', e.target.value)}
            />
            <TextField
                fullWidth
                label="Instagram"
                margin="normal"
                value={details.instagram}
                onChange={(e) => handleDetailChange('instagram', e.target.value)}
            />
            <TextField
                fullWidth
                label="Facebook"
                margin="normal"
                value={details.facebook}
                onChange={(e) => handleDetailChange('facebook', e.target.value)}
            />
            <TextField
                fullWidth
                label="Página Web"
                margin="normal"
                value={details.paginaWeb}
                onChange={(e) => handleDetailChange('paginaWeb', e.target.value)}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={details.disponible}
                        onChange={(e) => handleDetailChange('disponible', e.target.checked)}
                    />
                }
                label="Actualmente Disponible"
            />

            {details.disponible && (
                <>
                    <h2>Horarios de Apertura por Día</h2>
                    <Grid container spacing={2}>
                        {Object.keys(details.horarios).map(day => (
                            <Grid item xs={12} sm={6} md={4} key={day}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={details.horarios[day].abierto}
                                            onChange={() => handleCheckboxChange(day)}
                                        />
                                    }
                                    label={`Abierto ${day.charAt(0).toUpperCase() + day.slice(1)}`}
                                />
                                {details.horarios[day].abierto && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label={`Hora Inicio`}
                                            type="time"
                                            value={details.horarios[day].inicio}
                                            onChange={(e) => handleHorarioChange(day, 'inicio', e.target.value)}
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label={`Hora Fin`}
                                            type="time"
                                            value={details.horarios[day].fin}
                                            onChange={(e) => handleHorarioChange(day, 'fin', e.target.value)}
                                            sx={{ mb: 2 }}
                                        />
                                    </>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}


        </div>
    );
}

export default ServiciosForm;
