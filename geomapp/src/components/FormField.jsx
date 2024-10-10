import React from 'react';

function FormField({ error, register, name, textarea, label, type, ...rest }) {
  
  const formatMoney = (value) => {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e) => {
    if (type === 'number' && e.target.value < 0) {
      e.target.value = ''; // Limpiar el valor del input si no es válido
    } else if (type === 'money') {
      const numericValue = e.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
      if (numericValue === '') {
        e.target.value = '$';
      } else if (numericValue === '0') {
        e.target.value = '$0';
      }
      else if (numericValue.startsWith('0')) {
        e.target.value = '$0'; // Limpiar el valor del input si comienza con cero, pero no es solo '0'
      } else {
        e.target.value = formatMoney(numericValue);
      }
    }
  };  

  return (
    <div className='mb-3'>
      <label
        htmlFor={name}
        className="mb-1 block text-xxs font-medium text-black sm:text-sm"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 text-xxs leading-tight text-black focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-lg"
          {...register(name)}
          {...rest}
        />
      ) : type === 'money' ? (
         <input
          type={type}
          id={name}
          className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 text-xxs leading-tight text-black focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm md:text-base"
          {...register(name)}
          {...rest}
          min={type === 'number' ? 0 : undefined}
          onChange={handleInputChange}
        />
      ) : (
        <input
          type={type}
          id={name}
          className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 text-xxs leading-tight text-black focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm md:text-base"
          {...register(name)}
          {...rest}
          min={type === 'number' ? 0 : undefined}
          onChange={handleInputChange}
        />
      )}
      {error[name] && (
        <p className="text-xs italic text-red-500">{error[name].message}</p>
      )}
    </div>
  );
}

export default FormField;
