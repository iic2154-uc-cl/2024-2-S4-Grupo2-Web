/*import '../../styles/users/zgastronomia.css';
import React, { useState, useRef, useEffect } from 'react';
function GastronomiaForm() {
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
export default GastronomiaForm;*/
import '../../styles/users/zgastronomia.css';
import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, TextField, Checkbox, FormControlLabel, Grid, Button } from '@mui/material';

function GastronomiaForm() {
    const [details, setDetails] = useState({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        horarios: {
            lunes: { inicio: '', fin: '', abierto: false },
            martes: { inicio: '', fin: '', abierto: false },
            miercoles: { inicio: '', fin: '', abierto: false },
            jueves: { inicio: '', fin: '', abierto: false },
            viernes: { inicio: '', fin: '', abierto: false },
            sabado: { inicio: '', fin: '', abierto: false },
            domingo: { inicio: '', fin: '', abierto: false },
        },
        nombreContacto: '',
        numeroCelular: '',
        mailContacto: '',
        instagram: '',
        facebook: '',
        paginaWeb: '',
        aptoVeganos: false,
        aptoVegetarianos: false,
        aptoCeliacos: false,
        disponible: false,
        abiertoEnFeriados: false,
    });

    const establishmentTypes = [
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Cafetería', value: 'cafeteria' },
        { label: 'Bar', value: 'bar' },
        { label: 'Heladería', value: 'heladeria' }
    ];

    const handleChange = (field, value) => {
        setDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleHorarioChange = (day, field, value) => {
        setDetails(prev => ({
            ...prev,
            horarios: {
                ...prev.horarios,
                [day]: { ...prev.horarios[day], [field]: value }
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

    const handleSubmit = () => {
        console.log(details);
        // Aquí puedes agregar la lógica para guardar los detalles
    };

    return (
        <div>
            <h1>Gastronomía</h1>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="establishment-type-label">Tipo de Establecimiento</InputLabel>
                <Select
                    labelId="establishment-type-label"
                    id="establishment-type"
                    value={details.establishmentType || ''}
                    label="Tipo de Establecimiento"
                    onChange={(e) => handleChange('establishmentType', e.target.value)}
                >
                    {establishmentTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Título"
                value={details.titulo}
                onChange={(e) => handleChange('titulo', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Descripción"
                value={details.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Ubicación"
                value={details.ubicacion}
                onChange={(e) => handleChange('ubicacion', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Nombre de Contacto"
                value={details.nombreContacto}
                onChange={(e) => handleChange('nombreContacto', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Número de Celular de Contacto"
                value={details.numeroCelular}
                onChange={(e) => handleChange('numeroCelular', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Mail de Contacto"
                value={details.mailContacto}
                onChange={(e) => handleChange('mailContacto', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Instagram"
                value={details.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Facebook"
                value={details.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Página Web"
                value={details.paginaWeb}
                onChange={(e) => handleChange('paginaWeb', e.target.value)}
                sx={{ mb: 2 }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={details.abiertoEnFeriados}
                        onChange={(e) => handleChange('abiertoEnFeriados', e.target.checked)}
                    />
                }
                label="Abierto en Feriados"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={details.disponible}
                        onChange={(e) => handleChange('disponible', e.target.checked)}
                    />
                }
                label="Actualmente Disponible"
            />

            {details.disponible && (
                <>
                    <h3>Horarios de Apertura por Día</h3>
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
                                            label="Hora Inicio"
                                            type="time"
                                            value={details.horarios[day].inicio}
                                            onChange={(e) => handleHorarioChange(day, 'inicio', e.target.value)}
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Hora Fin"
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

             
            
            

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={details.aptoVeganos}
                        onChange={(e) => handleChange('aptoVeganos', e.target.checked)}
                    />
                }
                label="Apto para Veganos"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={details.aptoVegetarianos}
                        onChange={(e) => handleChange('aptoVegetarianos', e.target.checked)}
                    />
                }
                label="Apto para Vegetarianos"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={details.aptoCeliacos}
                        onChange={(e) => handleChange('aptoCeliacos', e.target.checked)}
                    />
                }
                label="Apto para Celíacos"
            />
            </div>

            <div>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Guardar
            </Button>
            </div>
        </div>
    );
}

export default GastronomiaForm;
