/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Datepicker from 'react-tailwindcss-datepicker';
import { Typography, Button } from '@material-tailwind/react';
import ReservationsList from '../../components/ReservationsList';
import FormField from '../../components/FormField';
import CardPost from '../../components/CardPost';
import { useRouter } from 'next/router';
import EditReservationPopUp from '../../components/PopUps/EditReservationPopUp';

export default function postReservation() {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [dateSelection, setDateSelection] = useState(true);

  

  const getAccessToken = () => {
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

  function moneyStringToInt(moneyString) {
    // Elimina el signo $ y los puntos, y luego convierte la cadena resultante en un número entero
    return parseInt(moneyString.replace(/\D/g, ''), 10);
  }

  const fetchPost = async (id) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const post = await response.json();
      if (!post) {
        return [];
      }
      return post;
    } catch (error) {
      console.error('Ocurrió un error al obtener el post', error);
      window.alert(
        'Ocurrió un error al obtener el post. Por favor, intenta nuevamente más tarde.'
      );
    }
  };

  const fetchReservations = async (post_id) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations/${post_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const reservations = await response.json();
      if (!reservations) {
        return [];
      }
      return reservations;
    } catch (error) {
      console.error('Ocurrió un error al obtener las reservas', error);
      window.alert(
        'Ocurrió un error al obtener las reservas. Por favor, intenta nuevamente más tarde.'
      );
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const postFromServer = await fetchPost(postId);
      setPost(postFromServer);
    };
    if (postId) {
      getPost();
    }
  }, [postId]);
  
  useEffect(() => {
    const getReservations = async () => {
      const reservationsFromServer = await fetchReservations(postId);
      setReservations(reservationsFromServer);
    };
    if (postId) {
      getReservations();
    }
  }, [postId]);
  
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
      .matches(/^\+569\d+$/, 'Ingresar prefijo +569 seguido de 8 dígitos')
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
    if (showForm) {
      setDate(newDate);
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateReservation = async (data) => {
    if (!date.startDate || !date.endDate) {
      window.alert('Por favor, selecciona un rango de fechas');
      return;
    }
    handleToggleForm();
    const requestBody = {
      post: post.id,
      initial_day: date.startDate,
      last_day: date.endDate,
      tenant: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
      money_total: moneyStringToInt(data.money_total),
      money_advance: moneyStringToInt(data.money_advance),
      observations: data.observations,
    };
    if (data.money_total === '$') {
      requestBody.money_total = 0;
    }
    if (data.money_advance === '$') {
      requestBody.money_advance = 0;
    }
    if (data.observations === '') {
      requestBody.observations = 'Sin observaciones';
    }
    
    try {
      const accessToken = getAccessToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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
    const confirmation = getConfirmation();
    if (!confirmation) {
      return;
    }
    try {
      const accessToken = getAccessToken();
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations/delete/${reservationId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      window.alert(
        'Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente más tarde.'
      );
    }
    location.reload();
  };

  const getButtonName = () => {
    if (showForm) {
      return 'Volver';
    }
    return 'Generar Reserva';
  };

  const getCalendarPlaceholder = () => {
    if (showForm) {
      return 'Selecciona inicio y fin de reserva';
    }
    return 'Calendario de Reservas';
  };
  

  const handleEditReservation = (reservationId) => {
    const reservation = reservations.find((r) => r.reservation_id === reservationId);
    setSelectedReservation(reservation);
  };

  const handleClosePopUp = () => {
    setSelectedReservation(null);
  };

  const handleSaveEditedReservation = (editedReservation) => {
    setSelectedReservation(null);
  };

  useEffect(() => {
    // Función para verificar y aplicar la clase al botón si es necesario
    const verifyButton = (button) => {
      if (button.textContent === 'Aceptar') {
        button.classList[button.disabled ? 'add' : 'remove']('boton-aceptar');
      }
    };

    // Seleccionar todos los botones dentro de #calendar_container
    const botones = document.querySelectorAll('#calendar_container button');

    // Verificar y aplicar la clase a los botones desde el inicio
    botones.forEach(verifyButton);

    // Crear un MutationObserver para observar cambios en los botones
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Comprobar si el botón ha cambiado su atributo 'disabled'
        if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
          verifyButton(mutation.target);
        }
      });
    });

    // Iniciar la observación de cambios en los botones
    botones.forEach(boton => observer.observe(boton, { attributes: true }));

    // Limpiar el observer cuando el componente se desmonte
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Seleccionar todos los botones dentro de #calendar_container que su texto son un número
    const botones = document.querySelectorAll('#calendar_container button');
    
    botones.forEach(boton => {
      // Verificar si el texto del botón es un número
      if (!isNaN(boton.textContent) && boton.textContent.trim() !== "") {
        // Si showForm es false, añadir la clase 'button-date-to-disable' y remover 'button-date-enabled'
        if (!showForm) {
          boton.classList.add('button-date-to-disable');
          boton.classList.remove('button-date-enabled');
        } 
        // Si showForm es true, añadir la clase 'button-date-enabled' y remover 'button-date-to-disable'
        else {
          boton.classList.add('button-date-enabled');
          boton.classList.remove('button-date-to-disable');
        }
      }
    });
  }, [showForm]);

  return (
    <div id="grid_container" className="m-4 flex justify-center bg-transparent">
      <div className="grid w-full grid-flow-row-dense grid-cols-1 grid-rows-3 gap-7 md:grid-cols-3">
        <div className="hidden md:col-span-1 md:block">
         <CardPost publication={post} type="sample" />
        </div>
        <div
          id="list_and_calendar_card_container"
          className="col-span-1 w-full rounded-3xl shadow-2xl md:col-span-2"
        >
          <div id="right_card_container" className="flex flex-col gap-7 p-6">
            <div id="post_title_container" className='flex  items-center justify-center' >
              <Typography variant="h3" color="blue-gray">
                {post.name}
              </Typography>
            </div>
            <div className="grid grid-cols-10 items-center">
              <div id="button_container" className="col-span-4 col-start-1">
                {showForm && (
                  <Button
                    size="sm"
                    onClick={handleToggleForm}
                    className="mb-2 scale-75 px-2 py-1 text-xs sm:scale-90 sm:text-base md:scale-75 md:px-4 md:py-2 md:text-xs lg:text-base"
                    variant="filled"
                  >
                    Volver
                  </Button>
                )}
              </div>
              <div
                id="calendar_container"
                className="col-span-10 col-start-1 w-full sm:col-span-6 sm:col-start-3 md:col-span-8 md:col-start-2"
              >
                <Datepicker
                  useRange={true}
                  i18n={"es"} 
                  disabled={false}
                  inputClassName="relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-black bg-gray-100 focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
                  containerClassName={`relative w-full text-black`}
                  toggleClassName="absolute bg-blue-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                  primaryColor="blue"
                  placeholder={getCalendarPlaceholder()}
                  popoverDirection="down"
                  value={date}
                  onChange={handleDateChange}
                  disabledDates={disabledDates}
                  readOnly={true}
                  showFooter
                  startWeekOn="mon"
                  configs={{
                    footer: {
                      cancel: 'Cancelar',
                      apply: 'Aceptar',
                    },
                  }}
                />
              </div>
            </div>
            {showForm ? (
              <form action="#" className="mt-4" onSubmit={handleSubmit(handleCreateReservation)}>
                <div className="grid grid-cols-9 gap-2">
                  <div id="form_container" className="col-span-5 col-start-3">
                    <FormField
                      type="text"
                      label="Arrendatario"
                      name="name"
                      placeholder=""
                      register={register}
                      error={errors}
                    />
                    <FormField
                      type="email"
                      label="Email"
                      name="email"
                      placeholder=""
                      register={register}
                      error={errors}
                    />
                    <FormField
                      type="phone"
                      label="Teléfono de contacto"
                      name="phoneNumber"
                      defaultValue="+569"
                      register={register}
                      error={errors}
                    />
                    <FormField
                      type="money"
                      label="Total de arriendo"
                      name="money_total"
                      defaultValue="$"
                      register={register}
                      error={errors}
                    />
                    <FormField
                      type="money"
                      label="Anticipo"
                      name="money_advance"
                      defaultValue="$"
                      register={register}
                      error={errors}
                    />
                    <FormField
                      textarea
                      label="Observaciones"
                      name="observations"
                      register={register}
                      error={errors}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <Button type="submit">Reservar</Button>
                </div>
              </form>
            ) : (
              <div>
                <div className="mb-5 grid grid-cols-10">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="col-span-5 col-start-1"
                  >
                    Lista de Reservas
                  </Typography>
                  <Button
                    size="sm"
                    onClick={handleToggleForm}
                    className="col-span-4 col-start-7 scale-75 p-2 text-xs sm:col-span-3 sm:col-start-8 sm:scale-75 sm:text-base md:scale-75 md:text-xs lg:text-base"
                    variant="filled"
                    fullWidth={false}
                  >
                    {getButtonName()}
                  </Button>
                </div>
                <ReservationsList
                  reservations={reservations}
                  handleDeleteReservation={handleDeleteReservation}
                  handleEditReservation={handleEditReservation}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedReservation && (
        <EditReservationPopUp
          open={Boolean(selectedReservation)}
          reservation={selectedReservation}
          onClose={handleClosePopUp}
          onSave={handleSaveEditedReservation}
          fetchReservations={fetchReservations}
        />
      )}
    </div>
  );
}
