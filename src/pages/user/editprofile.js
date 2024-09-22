/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '../../components/FormField';
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinnerIcon from '../../components/TailwinSvgIcons/LoadingSpinnerIcon';


export default function EditProfile() {
  const router = useRouter();
  const { isAuthenticated } = useAuth0();

  const  getAccessToken = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      return accessToken;
    } catch (error) {
      console.error('Ocurrió un error al obtener accessToken', error);
      window.alert(
        'Ocurrió un error al obtener accessToken. Por favor, intenta nuevamente más tarde.'
      );
    }
  };

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Ingrese su nombre'),
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
    return;
    try {
      const accessToken = getAccessToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: data.username,
          phone_number: data.phoneNumber,
        }),
      });
      const response = await res.json();
      router.push('./profile');
    } catch (error) {
      alert(
        `Ocurrió un error durante la edición de datos. Por favor intenta de nuevo más tarde. Error: ${error}`,
      );
    }
  };

  const user = isAuthenticated ? getUser() : null;

  return (
    <div className="mt-8 md:mt-16 flex h-screen items-center justify-center px-4 bg-gray-50">
      { !user ? (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
          <LoadingSpinnerIcon className="h-12 w-12"/>
          <p>Cargando información de usuario...</p>
       </div>
      ) : (
        <form
        className="w-full max-w-xs sm:max-w-md md:max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl mb-6 font-semibold text-center text-gray-700">
          Guardar Datos
        </h2>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-600"
            htmlFor="username"
          >
            Nombre
          </label>
          <FormField
            type="text"
            name="username"
            placeholder="Introduce tu nombre"
            required=""
            defaultValue={user.name}
            register={register}
            error={errors}
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-600"
            htmlFor="phoneNumber"
          >
            Teléfono
          </label>
          <FormField
            type="phone"
            name="phoneNumber"
            placeholder="Introduce tu teléfono"
            required=""
            defaultValue={'######'}
            register={register}
            error={errors}
          />
        </div>

        <div className="mt-8 flex items-center justify-center">
          <button
            className="w-full md:w-44 rounded-md bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
      )}
    </div>
  );
}

