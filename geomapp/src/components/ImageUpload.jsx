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