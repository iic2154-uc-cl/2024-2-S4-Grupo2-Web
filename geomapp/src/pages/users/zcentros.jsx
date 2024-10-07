/*import '../../styles/users/zcentros.css';
import React, { useState, useRef, useEffect } from 'react';
function CentrosDeportivosForm() {
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
export default CentrosDeportivosForm;*/
import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const subcategories = [
    { label: 'Estadios', value: 'estadios' },
    { label: 'Centros de Sky', value: 'centros-sky' },
    { label: 'Canchas de Tenis', value: 'canchas-tenis' },
    { label: 'Canchas de Padel', value: 'canchas-padel' },
    { label: 'Canchas de Fútbol', value: 'canchas-futbol' },
    { label: 'Club de Golf', value: 'club-golf' },
    { label: 'Piscina', value: 'piscina' },
];

function CentrosDeportivosForm() {
    const [formData, setFormData] = useState({
        subcategoria: '',
        titulo: '',
        descripcion: '',
        reglas: '',
        ubicacion: '',
        horarioInicio: '',
        horarioFin: '',
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
                label="Reglas"
                value={formData.reglas}
                onChange={(e) => handleInputChange('reglas', e.target.value)}
                margin="normal"
                multiline
                rows={3}
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
            </LocalizationProvider>

            <TextField
                fullWidth
                label="Horario de inicio"
                type="time"
                value={formData.horarioInicio}
                onChange={(e) => handleInputChange('horarioInicio', e.target.value)}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Horario de fin"
                type="time"
                value={formData.horarioFin}
                onChange={(e) => handleInputChange('horarioFin', e.target.value)}
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
                label="Precio"
                value={formData.precio}
                onChange={(e) => handleInputChange('precio', e.target.value)}
                margin="normal"
            />

            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Enviar
            </Button>
        </div>
    );
}

export default CentrosDeportivosForm;
