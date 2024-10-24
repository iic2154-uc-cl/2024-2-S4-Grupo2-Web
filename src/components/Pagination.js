import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

function ImageUpload({ files, setFiles }) {
  const [error, setError] = useState('');

  const handleMaxFiles = (acceptedFiles) => {
    if (acceptedFiles.length + files.length > 5) {
      setError('Solo se permiten un máximo de 5 imágenes');
    } else {
      setError('');
      const newFiles = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, idx) => idx !== index);
    setFiles(updatedFiles);
    URL.revokeObjectURL(files[index].preview); // Clean up
  };

  // Asegura que `files` sea siempre tratado como un arreglo.
  const safeFiles = files || [];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-black">
        Cargar imágenes de publicación
      </label>
      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
        <Dropzone
          onDrop={handleMaxFiles}
          accept="image/*"
          multiple
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Arrastra algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
            </div>
          )}
        </Dropzone>
        {safeFiles.length > 0 && (
          <div className="flex flex-wrap">
            {safeFiles.map((file, index) => (
              <div key={index} className="w-1/4 p-1">
                <div className="relative">
                  <img src={file.preview} alt={`preview ${index}`} />
                  <button type="button" onClick={() => handleRemoveFile(index)}>
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default ImageUpload;
