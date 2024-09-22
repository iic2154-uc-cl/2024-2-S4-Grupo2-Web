/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DynamicDatepicker from 'react-tailwindcss-datepicker';
import ReservationsList from '../../components/ReservationsList';
import ImageIndicator from '../../components/ImageIndicator';
import FormField from '../../components/FormField';

export default function postDetail(props) {
  const { post, reservations, session } = props;
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Ingrese un correo electrónico válido')
      .required('Ingrese un correo electrónico'),
    name: yup.string().required('Ingrese su nombre'),
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

  const disabledDates = reservations.map((reservation) => ({
    startDate: reservation.initial_day,
    endDate: reservation.last_day,
  }));

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const onSubmit = async (data) => {
    const requestBody = {
      post: post.id,
      initial_day: date.startDate,
      last_day: date.endDate,
      tenant: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });
      await res.json();
      window.alert('¡La reserva se ha creado exitosamente!');
    } catch (error) {
      window.alert(
        'Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente más tarde.'
      );
    }
    location.reload();
  };

  const getConfirmation = () => {
    const retVal = confirm('¿Estás seguro que deseas eliminar esta reserva?');
    if (retVal === true) {
      return true;
    }
    return false;
  };

  const handleDeleteReservation = async (reservationId) => {
    if (getConfirmation()) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/delete/${reservationId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (response.status === 204) {
          window.alert('¡La reserva se ha eliminado exitosamente!');
        } else {
          window.alert('Ocurrió un error al eliminar la reserva');
        }
      } catch (error) {
        window.alert(
          'Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente más tarde.'
        );
      }
      location.reload();
    }
  };

  return (
    <div id="main_container" className="mx-auto h-full justify-center px-4 xl:container">
      <div
        id="postDetail_container"
        className="mx-10 mt-2 flex h-full flex-row gap-10 bg-gray-100"
      >
        <div
          id="image_&_contact_container"
          className="ml-20 mt-5 flex h-auto w-80 flex-col items-center gap-6"
        >
          <div
            id="image_container"
            className="relative flex h-auto w-80 items-center justify-center bg-gray-200"
          >
            <ImageIndicator
              totalImages={post.images.length}
              useState={useState}
              post={post}
            />
          </div>
          <div
            id="contact_container"
            className="flex h-fit w-full flex-col rounded-2xl border border-blue-500 bg-gray-200 p-3"
          >
            <div id="title" className="">
              <h1 className="text-center text-base font-medium leading-10">
                Información de contacto
              </h1>
            </div>
            <div id="name_owner" className="flex w-fit flex-row items-center">
              <PersonIcon className="mr-3" />
              <p className="w-fit text-sm font-medium leading-10">{post.user_name}</p>
            </div>
            <div id="address" className="flex w-fit flex-row items-center">
              <LocationOnIcon className="mr-3" />
              <p className="w-fit text-sm font-medium leading-10">{post.address}</p>
            </div>
            <div id="call_phone" className="flex w-fit flex-row items-center">
              <CallIcon className="mr-3" />
              <p className="w-fit text-sm font-medium leading-10">{post.phone_number}</p>
            </div>
            <div id="wsp_phone" className="flex w-fit flex-row items-center">
              <WhatsAppIcon className="mr-3" />
              <p className="w-fit text-sm font-medium leading-10">{post.phone_number}</p>
            </div>
            <div id="email" className="flex w-fit flex-row items-center">
              <MailOutlineIcon className="mr-3" />
              <p className="w-fit text-sm font-medium leading-10">{post.email}</p>
            </div>
          </div>
        </div>
        <div
          id="postDetail_&_report_container"
          className="mb-10 ml-8 mr-20 flex flex-col items-center justify-start"
        >
          <div id="postDetail" className="flex flex-col">
            <div id="post_name" className="mt-2">
              <h1 className="text-base font-medium leading-10">{post.name}</h1>
            </div>
            <div id="post_description" className="mb-5">
              <p className="text-xs font-light">{post.description}</p>
            </div>
            <div id="post_details" className="flex flex-row justify-center gap-20">
              {post.type === 'PROPERTY' && (
                <div id="beds_&_rooms" className="flex flex-col">
                  <div id="rooms" className="flex flex-row items-center">
                    <MeetingRoomIcon className="mr-3" />
                    <p id="rooms" className="text-sm font-medium leading-10">
                      Dormitorios: {post.rooms}
                    </p>
                  </div>
                  <div id="beds" className="flex flex-row items-center">
                    <BedroomChildIcon className="mr-3" />
                    <p id="simple_beds" className="text-sm font-medium leading-10">
                      Camas simples: {post.simple_beds}
                    </p>
                  </div>
                  <div id="beds" className="flex flex-row items-center">
                    <BedroomParentIcon className="mr-3" />
                    <p id="double_beds" className="text-sm font-medium leading-10">
                      Camas dobles: {post.double_beds}
                    </p>
                  </div>
                </div>
              )}
              {post.type !== 'SERVICE' && (
                <div id="price" className="items-start justify-start">
                  <div id="price_title" className="flex flex-row items-center">
                    <MonetizationOnIcon className="mr-1" />
                    <p id="price" className="text-sm font-medium leading-10">
                      Precio: ${post.price} CLP/día
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {post.type !== 'SERVICE' && (
            <div id="button_container" className="mt-3 h-full w-full">
              <div className="grid gap-4 sm:grid-cols-9 sm:gap-2">
                <div className="sm:col-span-8">
                  <DynamicDatepicker
                    primaryColor="blue"
                    placeholder="Calendario de Disponibilidad"
                    popoverDirection="down"
                    value={date}
                    onChange={handleDateChange}
                    disabledDates={disabledDates}
                    readOnly
                    showFooter
                    configs={{
                      footer: {
                        cancel: 'Cancelar',
                        apply: 'Aceptar',
                      },
                    }}
                  />
                </div>
                <div className="sm:col-span-1">
                  <button
                    className="inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-blue-500 focus:ring-2 focus:ring-gray-500"
                    type="button"
                    onClick={handleToggleForm}
                  >
                    +
                  </button>
                </div>
              </div>
              {showForm ? (
                <form action="#" className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 sm:grid-cols-9 sm:gap-2">
                    <div className="sm:col-span-9">
                      <FormField
                        type="text"
                        label="Arrendatario"
                        name="name"
                        placeholder=""
                        required=""
                        register={register}
                        error={errors}
                      />
                      <FormField
                        type="email"
                        label="Email"
                        name="email"
                        placeholder=""
                        required=""
                        register={register}
                        error={errors}
                      />
                      <FormField
                        type="phone"
                        label="Teléfono"
                        name="phoneNumber"
                        defaultValue="+569"
                        required=""
                        register={register}
                        error={errors}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      className="inline-block w-[200px] rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-blue-500 focus:ring-2 focus:ring-gray-500"
                      type="submit"
                    >
                      Crear reserva
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  {reservations.length > 0 && (
                    <ReservationsList
                      reservations={reservations}
                      handleDeleteReservation={handleDeleteReservation}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const post = await res.json();
  const reserv = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const reservations = await reserv.json();
  return {
    props: {
      post,
      reservations,
      session,
    },
  };
}
