import React from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload({ files, setFiles, setError }) {
  const onDrop = acceptedFiles => {
    if (acceptedFiles.length + files.length > 5) {
      setError('Solo se permiten un máximo de 5 imágenes');
      return;
    }

    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 5,
    maxSize: 5000000
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Arrastra algunas imágenes aquí, o haz clic para seleccionar imágenes .jpeg o .png</p>

      {files.map((file, index) => (
        <div key={index}>
          <img src={file.preview} alt={`preview ${index}`} />
          <button onClick={() => {
            URL.revokeObjectURL(file.preview);
            setFiles(files.filter((_, idx) => idx !== index));
          }}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ImageUpload;

//AWS REKOGNITION
/*
1. Acceder a IAM
2. Crear usuario nuevo
- en panel IAM, seleccionar Users y dps Add User
- Dar nombre usuario
- En access Type seleccionar la opcion Programmatic Acces para q se generen credenciales de acceso
3. asignar permisos 
- set permissions/eligir attack policies directly
- buscar la politica AmazonRekognitionFullAccess y seleccionarla
- si tmb usamos S3 para almacenar imgs, seleccionar AmazonS3FullAccess
4. fin creacion usuario
- revisar permisos y crear usuario
- final de todo esta access key id y secret acces key
5. obtener region aws
- ir a esquina superior derecha del AWS Management Console y hay una region seleccionada como us-east-1, eu-west-1 por ejemplo
6. configurar credenciales en el proyecto en .env
- REACT_APP_AWS_ACCESS_KEY_ID=your_access_key
- REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_key
- REACT_APP_AWS_REGION=your_region
 */

/*import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AWS from 'aws-sdk';

// Configurar AWS Rekognition
AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
});

function ImageUpload({ files, setFiles, setError }) {
    const [previewImages, setPreviewImages] = useState([]);
    const rekognition = new AWS.Rekognition();

    const handleFileUpload = async (event) => {
        const uploadedFiles = Array.from(event.target.files);
        const validFiles = [];
        const invalidFiles = [];

        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];

            const isValid = await validateImage(file);
            if (isValid) {
                validFiles.push(file);
            } else {
                invalidFiles.push(file);
            }
        }

        if (invalidFiles.length > 0) {
            setError('Algunas imágenes no son permitidas. Evita subir contenido inapropiado.');
        }

        const newPreviewImages = validFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviewImages);
        setFiles(validFiles);
    };

    // Función para validar la imagen con AWS Rekognition
    const validateImage = async (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            return false;
        }

        // Convertir archivo a base64 para AWS Rekognition
        const arrayBuffer = await file.arrayBuffer();
        const imageBytes = new Uint8Array(arrayBuffer);

        const params = {
            Image: {
                Bytes: imageBytes
            },
            MinConfidence: 75
        };

        return new Promise((resolve, reject) => {
            rekognition.detectModerationLabels(params, (err, data) => {
                if (err) {
                    console.error('Error en Rekognition', err);
                    reject(false);
                } else {
                    // Verificar si hay etiquetas de moderación que indican desnudez
                    const inappropriateLabels = data.ModerationLabels.filter(label => 
                        label.Name.toLowerCase().includes('nudity') || 
                        label.Name.toLowerCase().includes('explicit') || 
                        label.Name.toLowerCase().includes('suggestive'));

                    if (inappropriateLabels.length > 0) {
                        console.log('Imagen inapropiada detectada:', inappropriateLabels);
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            });
        });
    };

    return (
        <div className="image-upload-container">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="upload-button"
            />
            <label htmlFor="upload-button">
                <Button variant="contained" component="span">
                    Subir Imágenes
                </Button>
            </label>

            <div className="preview-images">
                {previewImages.length > 0 && (
                    previewImages.map((image, index) => (
                        <img key={index} src={image} alt={`preview-${index}`} style={{ width: '100px', height: '100px', margin: '10px' }} />
                    ))
                )}
            </div>

            {error && (
                <Typography color="error">{error}</Typography>
            )}
        </div>
    );
}

export default ImageUpload;*/
