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
import { TextField, MenuItem, FormControl, InputLabel, Select, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';

const subcategories = [
    { label: 'Estadios', value: 'estadios' },
    { label: 'Centros de Ski', value: 'centros-ski' },
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
        nombreContacto: '',
        celularContacto: '',
        mailContacto: '',
        instagram: '',
        facebook: '',
        paginaWeb: '',
        precio: '', // Cambia el nombre de la variable si lo prefieres
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

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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

    return (
        <div className="form-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
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

            <TextField
                fullWidth
                label="Precio por Hora" // Aquí cambias el texto
                value={formData.precio}
                onChange={(e) => handleInputChange('precio', e.target.value)}
                margin="normal"
                type="number"
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
                                    </>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            
            <div>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Guardar
            </Button>
            </div>
        </div>
    );
}

export default CentrosDeportivosForm;
