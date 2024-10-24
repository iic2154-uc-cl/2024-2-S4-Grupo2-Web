import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Stepper, Step, StepLabel, Button, Typography, Box, FormHelperText } from '@mui/material';
import { Link } from 'react-router-dom'; // Importa Link para la redirección
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ImageUpload from '../../components/ImageUpload';
import TurismoForm from './zturismo.jsx';
import CentrosDeportivosForm from './zcentros.jsx';
import EventosForm from './zeventos.jsx';
import HospedajeForm from './zhospedaje.jsx';
import GastronomiaForm from './zgastronomia.jsx';
import ServiciosForm from './zservicios.jsx';
import Prueba from './zprueba.jsx';
import '../../styles/users/publicar.css';

const steps = ['Tipo de publicación', 'Información', 'Imágenes', 'Publicar'];
const publicationTypes = [
    { label: 'Turismo', value: 'turismo' },
    { label: 'Centros Deportivos', value: 'centros-deportivos' },
    { label: 'Hospedaje', value: 'hospedaje' },
    { label: 'Eventos', value: 'eventos' },
    { label: 'Gastronomía', value: 'gastronomia' },
    { label: 'Servicios Comunitarios', value: 'servicios-comunitarios' },
    { label: 'Prueba CRUDS', value: 'prueba'}
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
        setError('');  // Limpiar el error al seleccionar
    };

    const handleDetailChange = (field, value) => {
        setDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (activeStep === 0 && !selectedType) {
            setError('Por favor selecciona tu tipo de publicación');
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                <Box className="form-control-container">
                    <FormControl fullWidth sx={{ maxWidth: 300 }} error={!!error}>
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
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                </Box>
                );
            case 1:
                if (selectedType === 'turismo') {
                    return <TurismoForm />;
                } else if (selectedType === 'centros-deportivos') {
                    return <CentrosDeportivosForm />;
                } else if (selectedType === 'hospedaje') {
                    return <HospedajeForm />;
                } else if (selectedType === 'eventos') {
                    return <EventosForm />;
                } else if (selectedType === 'gastronomia') {
                    return <GastronomiaForm />;
                } else if (selectedType === 'servicios-comunitarios') {
                    return <ServiciosForm />;
                } else if (selectedType === 'prueba') {
                    return <Prueba />;
                } else {
                    return 'Vuelve atrás y selecciona tu tipo de publicación.';
                }
            case 2:
                return <ImageUpload files={files} setFiles={setFiles} setError={setError} />;
            case 3:
                return 'Revisa y publica tu anuncio';
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

                            {activeStep === steps.length - 1 ? (
                                <Link to="/publicaciones">
                                    <Button>
                                        Finalizar
                                    </Button>
                                </Link>
                            ) : (
                                <Button onClick={handleNext}>
                                    Siguiente
                                </Button>
                            )}
                        </Box>

                    </div>
                </Box>
            </main>

            <Footer />
        </div>
    );
}

export default Publicar;
