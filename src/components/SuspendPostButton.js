/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SuspendPostButton(props) {
  const { post, reports } = props;
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const router = useRouter();

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

  const getNewState = (currentState) => {
    switch (currentState) {
      case 'ACTIVE':
      case 'IN_REVIEW':
        return 'SUSPENDED';
      case 'SUSPENDED':
        return 'ACTIVE';
      default:
        return '';
    }
  };

  const getActualState = (currentState) => {
    switch (currentState) {
      case 'ACTIVE':
        return 'Activa';
      case 'SUSPENDED':
        return 'Suspendida';
      default:
        return '';
    }
  };

  const handleButtonClick = async () => {
    if (!comment) {
      window.alert("Por favor, ingresa un comentario antes de enviar.");
      return;
    }
    setLoading(true);
    const newState = getNewState(post.state);
    await changePostState(newState);
    if (reports.length > 0) {
      await sendReports(reports);
    }
    setLoading(false);
    router.push('/admin/reportedPosts');
  };

  const changePostState = async (newState) => {
    const accessToken = getAccessToken();
    const requestBody = {
      post: post.id,
      action: newState,
    };
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/set_state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const response = await res.json();
  
      if (response.status === 200) {
        window.alert(`Publicación ${getActualState(newState)}`);
        router.reload();
      } else {
        throw new Error(response.message || 'Error cambiando el estado del post.');
      }
  
    } catch (error) {
      setLoading(false);
      console.error('Error al cambiar el estado de la publicación:', error);
      window.alert(`Ocurrió un error al cambiar el estado de la publicación: ${error.message}`);
    }
  };  

  const sendReports = async (reports) => {
    const accessToken = getAccessToken();

    try {
      const uploadPromises = reports.map(async (report) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reports/update/${report.report_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              action_taken: comment,
            }),
          }
        );
          const response = await res.json();
        if (response.status !== 200) {
          throw new Error();
        }
      });
      await Promise.all(uploadPromises);
    } catch (error) {
      setLoading(false);
      window.alert("Ocurrió un error al enviar comentarios de publicación");
    }
  };
  

  return (
    <div id="comment_&_button_container" className=" w-2/5">
      <label htmlFor="message" className="mb-2 block text-sm font-medium">
        Comentario de suspensión
      </label>
      <textarea
        id="message"
        rows="4"
        className="block w-full rounded-lg border border-blue-500 bg-gray-200 p-2.5 text-sm text-black focus:border-blue-500 focus:ring-blue-500 dark:border-blue-500 dark:bg-gray-200 dark:text-black dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Escribe tu comentario aquí..."
        onChange={(e) => setComment(e.target.value)}
      />
      <div id="report_button" className="mt-10 flex flex-row justify-center gap-10">
        <button
          className="inline-block w-[150px] rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-red-500 focus:ring-2 focus:ring-gray-500"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Suspender'}
        </button>
      </div>
    </div>
  );
}
