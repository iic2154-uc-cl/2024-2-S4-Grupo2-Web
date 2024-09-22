import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';

const ReservationItem = ({ reservation, handleDeleteReservation, handleEditReservation }) => {
  const {
    reservation_id,
    initial_day,
    last_day,
    tenant = 'Sin nombre',
    email = 'Sin email',
    phone_number = 'Sin teléfono',
    money_total = 0,
    money_advance = 0,
    observations = 'Sin observaciones',
  } = reservation;

  const getFormattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const shortYear = newDate.getFullYear().toString().slice(2);
    return `${day}/${month}/${shortYear}`;
  };
  
  const formatMoney = (value) => {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <li className="rounded bg-white p-4 shadow">
      <p className="text-sm">Desde: {getFormattedDate(initial_day)}</p>
      <p className="text-sm">Hasta: {getFormattedDate(last_day)}</p>
      <p className="text-sm">Nombre: {tenant}</p>
      <p className="text-sm">Email: {email}</p>
      <p className="text-sm">Teléfono: {phone_number}</p>
      <p className="text-sm">Total de arriendo: {formatMoney(money_total)}</p>
      <p className="text-sm">Avance de arriendo: {formatMoney(money_advance)}</p>
      <p className="text-sm">Observaciones: {observations}</p>
      <div id="actions_container" className="flex flex-row justify-between ">
        <div className="flex flex-col items-center">
          <Tooltip title="Editar reserva">
            <IconButton aria-label="delete" size="large" onClick={() => handleEditReservation(reservation_id)}>
              <EditIcon
                style={{ cursor: 'pointer', height: 'auto' }}
                className="hover:text-gray-500"
                sx={{color: 'black'}}
              />
            </IconButton>
          </Tooltip>
          <p className="text-xs text-black">Editar</p>
        </div>

        <div className="flex flex-col items-center">
          <a href={`tel:${phone_number}`} className="cursor-pointer">
            <IconButton size="large">
              <CallIcon
                style={{ height: 'auto' }}
                sx={{color: 'blue'}}
              />
            </IconButton>
          </a>
          <p className="text-xs text-black">Llamar</p>
        </div>

        <div className="flex flex-col items-center">
          <a href={`https://wa.me/${phone_number}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            <IconButton size="large">
              <WhatsAppIcon
                style={{ height: 'auto' }}
                sx={{color: 'green'}}
              />
            </IconButton>
          </a>
          <p className="text-xs text-black">Mensaje</p>
        </div>

        <div className="flex flex-col items-center">
          <Tooltip title="Borrar reserva">
            <IconButton aria-label="delete" size="large" onClick={() => handleDeleteReservation(reservation_id)}>
              <DeleteIcon
                style={{ cursor: 'pointer', height: 'auto' }}
                className="hover:text-gray-500"
                sx={{color: 'black'}}
              />
            </IconButton>
          </Tooltip>
          <p className="text-xs text-black">Eliminar</p>
        </div>
      </div>
    </li>    
  );
};

const ReservationsList = ({ reservations, handleDeleteReservation, handleEditReservation }) => {
  return (
    <div
      id="report_list"
      className="h-auto max-h-[36rem] w-full overflow-y-auto rounded-xl shadow-2xl"
    >
      {reservations.length > 0 ? (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.reservation_id}
              reservation={reservation}
              handleDeleteReservation={handleDeleteReservation}
              handleEditReservation={handleEditReservation}
            />
          ))}
        </ul>
      ) : (
        <p>No hay reservas disponibles.</p>
      )}
    </div>
  );
};

export default ReservationsList;
