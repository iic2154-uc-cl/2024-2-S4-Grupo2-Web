import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Stepper, Step, StepLabel, Button, Typography, Box, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ImageUpload from '../../components/ImageUpload';
import '../../styles/users/publicar.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const steps = ['Tipo de publicación', 'Información', 'Imágenes', 'Publicar'];
const publicationTypes = [
    { label: 'Turismo', value: 'turismo' },
    { label: 'Centros Deportivos', value: 'centros-deportivos' },
    { label: 'Hospedaje', value: 'hospedaje' },
    { label: 'Eventos', value: 'eventos' },
    { label: 'Gastronomía', value: 'gastronomia' },
    { label: 'Servicios Comunitarios', value: 'servicios-comunitarios' }
];

function Publicar() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedType, setSelectedType] = useState('');
    const [details, setDetails] = useState({
        titulo: '',
        descripcion: '',
        horarioInicio: '',
        horarioFin: ''
    });
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleDetailChange = (field, value) => {
        setDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <FormControl fullWidth sx={{ maxWidth: 300}}>
                        <InputLabel id="type-select-label">Tipo de Publicación</InputLabel>
                        <Select
                            labelId="type-select-label"
                            id="type-select"
                            value={selectedType}
                            label="Tipo de Publicación"
                            onChange={handleTypeChange}
                        >
                            {publicationTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case 1:
                if (selectedType === 'turismo') {
                    return (
                        <Box className="publicar-form-container">
                            <Box className="publicar-form-row">
                                <TextField
                                    fullWidth
                                    className="publicar-form-input"
                                    label="Título"
                                    variant="outlined"
                                    onChange={(e) => handleDetailChange('titulo', e.target.value)}
                                    value={details.titulo}
                                />
                            </Box>
                            <Box className="publicar-form-row">
                                <TextField
                                    fullWidth
                                    className="publicar-form-input"
                                    label="Descripción"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    onChange={(e) => handleDetailChange('descripcion', e.target.value)}
                                    value={details.descripcion}
                                />
                            </Box>
                            
                            {/* <Box className="publicar-form-row">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                    label="Fecha de inicio"
                    value={startDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="Fecha de fin"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>




                            </Box> */}
                            
                
                            <Box className="publicar-form-row">
                                <TextField
                                    type="time"
                                    className="publicar-form-time"
                                    
                                   
                                    onChange={(e) => handleDetailChange('horarioInicio', e.target.value)}
                                    value={details.horarioInicio}
                                />
                                <TextField
                                    type="time"
                                    className="publicar-form-time"
                                    
                              
                                    onChange={(e) => handleDetailChange('horarioFin', e.target.value)}
                                    value={details.horarioFin}
                                />
                            </Box>
                        </Box>

                        
                    );
                } else {
                    return 'Completa la información de la publicación.';
                }
            case 2:
                return <ImageUpload files={files} setFiles={setFiles} setError={setError} />;
            case 3:
                return 'Revisa y publica tu anuncio.';
            default:
                return 'Paso desconocido';
        }
    }

    return (
        <div id="publicar-container">
            <Navbar />
            <header className="publicar-header">
                <h1>Publicar</h1>
            </header>

            <main className="publicar-content">
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                                Atrás
                            </Button>

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </Box>

                    </div>
                </Box>
            </main>

            <Footer />
        </div>
    );
}

export default Publicar;