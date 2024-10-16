import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';

export default function ChangePostStateButton(props) {
  const { post } = props;
  const [loading, setLoading] = useState(false);

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
        return 'SUSPENDED';
      case 'SUSPENDED':
      case 'IN_REVIEW':
        return 'ACTIVE';
      default:
        return '';
    }
  };

  const handleButtonClick = async () => {
    setLoading(true);
    const newState = getNewState(post.state);
    const requestBody = {
      post_id: post.id,
      action: newState,
    };

    try {
      const accessToken = getAccessToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/set_state`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const response = await res.json();
    } catch (error) {
      alert('Error al cambiar el estado del post');
    }

    setLoading(false);
  };

  return (
    <Button
      variant="contained"
      className="rounded-lg bg-red-500 p-1"
      onClick={handleButtonClick}
      disabled={loading}
    >
      {loading ? 'Cargando...' : 'Suspenderr'}
    </Button>
  );
}
