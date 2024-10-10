import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormField from '../FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';


export default function EditReservationPopUp({ open, reservation, onClose, onSave, fetchReservations }) {

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Ingrese un correo electrónico válido')
      .required('Ingrese un correo electrónico'),
    tenant: yup.string().required('Ingrese su nombre'),
    phone_number: yup
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

  const updateReservation = async (data) => {
    const requestBody = {
        post: reservation.post,
        initial_day: reservation.initial_day,
        last_day: reservation.last_day,
        tenant: data.tenant,
        email: data.email,
        phone_number: data.phone_number,
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations/edit/${reservation.reservation_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
          });
        const response = await res.json();
        window.alert('¡Reserva se actualizada con éxito!');
        location.reload();
      } catch (error) {
        window.alert(
            'Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente más tarde.'
          );
      }
  };

  const formatMoney = (value) => {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  return (
    <div className='z-50'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Reserva</DialogTitle>
        <DialogContent>
        <form id="edited_data_form" onSubmit={handleSubmit(updateReservation)}>
          <FormField
            type="text"
            label="Arrendatario"
            name="tenant"
            placeholder=""
            defaultValue={reservation ? reservation.tenant : ""}
            register={register}
            error={errors}
          />
          <FormField
            type="email"
            label="Email"
            name="email"
            placeholder=""
            defaultValue={reservation ? reservation.email : ""}
            register={register}
            error={errors}
          />
          <FormField
            type="phone"
            label="Teléfono de contacto"
            name="phone_number"
            defaultValue={reservation ? reservation.phone_number : "+569"}
            register={register}
            error={errors}
          />
          <FormField
            type="money"
            label="Total de arriendo"
            name="money_total"
            defaultValue={reservation ? formatMoney(reservation.money_total) : ""}
            register={register}
            error={errors}
          />
          <FormField
            type="money"
            label="Anticipo"
            name="money_advance"
            defaultValue={reservation ? formatMoney(reservation.money_advance) : ""}
            register={register}
            error={errors}
          />
          <FormField
            textarea
            label="Observaciones"
            name="observations"
            defaultValue={reservation ? reservation.observations : ""}
            register={register}
            error={errors}
          />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button 
              form="edited_data_form"
              type="submit" 
              color="primary"
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
