/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Image from 'next/image';
import Dropzone from 'react-dropzone';
import CrossDeleteIcon from './TailwinSvgIcons/CrossDeleteIcon';

function ImageUpload({ files, setFiles }) {
  const [error, setError] = useState('');

  const handleMaxFiles = (acceptedFiles) => {
    if (acceptedFiles.length + files.length > 5) {
      setError('Solo se permiten un máximo de 5 imágenes');
    } else {
      setError('');
      setFiles([...files, ...acceptedFiles]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-black">
        Cargar imágenes de publicación
      </label>
      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
        <Dropzone
          onDrop={handleMaxFiles}
          accept={{ 'image/png': '.png', 'image/jpeg': '.jpg' }}
          multiple
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-black"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-xs text-gray-600">
                  <span className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                    Hasta 5 imágenes en formato PNG o JPG
                  </span>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
        <div className="flex flex-wrap">
          {files.map((file, index) => (
            <div className="mb-4 w-1/3 px-2" key={file.name}>
              <div className="relative">
                <Image
                  className="rounded-lg"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={500}
                  height={500}
                />
                <button
                  className="absolute right-0 top-0 rounded-md bg-transparent px-1 py-0.5 hover:bg-gray-500 hover:bg-opacity-50"
                  type="button"
                  onClick={() => {
                    const newFiles = [...files];
                    newFiles.splice(index, 1);
                    setFiles(newFiles);
                    setError('');
                  }}
                >
                  <CrossDeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default ImageUpload;
