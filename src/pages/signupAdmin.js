/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function SignUpAdmin() {
  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Ingrese un correo electrónico válido')
      .required('Ingrese un correo electrónico'),
    username: yup.string().required('Ingrese su nombre'),
    phoneNumber: yup
      .string()
      .matches(/^\+?\d+$/, 'Ingrese un número de teléfono válido')
      .length(12, 'Ingrese un número de teléfono válido')
      .required('Ingrese un número de teléfono'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const session = await getSession();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/createAdministrator`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            name: data.username,
            email: data.email,
            phone_number: data.phoneNumber,
          }),
        }
      );
      const response = await res.json();
      window.alert('¡El Administrador se ha creado exitosamente!');
      router.push('/user/profile');
    } catch (error) {
      window.alert(
        'Ocurrió un error durante el registro. Por favor intenta de nuevo más tarde'
      );
    }
  };

  return (
    <div className="mt-16 flex h-screen items-center justify-center">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h1 className=" mb-6 text-center text-6xl font-bold text-gray-700">
          Crear Administrador
        </h1>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="username">
            Nombre de usuario
          </label>
          <input
            className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            id="username"
            type="text"
            placeholder="usuario"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-xs italic text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            id="email"
            type="email"
            placeholder="usuario@correo.cl"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="phoneNumber">
            Teléfono
          </label>
          <input
            className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            id="phone"
            type="phone"
            defaultValue="+569"
            placeholder="Número de teléfono"
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && (
            <p className="text-xs italic text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="mb-10 flex items-center justify-center">
          <button
            className="inline-block w-[200px] rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-blue-500 focus:ring-2 focus:ring-gray-500"
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpAdmin;
