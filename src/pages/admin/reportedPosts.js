/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import PostList from '../../components/PostList';
import { useEffect, useState } from 'react';
import LoadingSpinnerIcon from '../../components/TailwinSvgIcons/LoadingSpinnerIcon';

export default function reportedPosts() {
  const [publications, setPublications] = useState([]);
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

  const fetchAllPosts = async () => {
    setLoading(true);
    const accessToken = getAccessToken();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/reported`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      setLoading(false);
      console.error('Ocurrió un error al obtener las publicaciones', error);
      window.alert(
        'Ocurrió un error al obtener las publicaciones del usuario. Por favor, intenta nuevamente más tarde.'
      );
    }
  };

  useEffect(() => {
    const getPublications = async () => {
      const publicationsFromServer = await fetchAllPosts();
      setPublications(publicationsFromServer);
      setLoading(false);
    };
    getPublications();
  }, []);

  return (
     <>
     { loading ? (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
        <LoadingSpinnerIcon className="h-12 w-12"/>
       <p>Cargando publicaciones...</p>
     </div>
     ) : (
        <div id="main_container" className="mx-auto h-full justify-center px-4 xl:container">
          <PostList publications={publications} type="reportedPost" />
        </div>
       )}
     </>
  );
}