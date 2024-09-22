/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import PostList from '../../components/PostList';
import { useEffect, useState } from 'react';
import LoadingSpinnerIcon from '../../components/TailwinSvgIcons/LoadingSpinnerIcon';
import Pagination from '../../components/Pagination';

export default function postsReview() {
  const [publications, setPublications] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [currentPage, setCurrentPage] = useState();

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
    const accessToken = getAccessToken();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/all`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      if (!data.results) {
        return [];
      }
      return data;
    } catch (error) {
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
    };
    getPublications();
  }, []);

  useEffect(() => {
    if (publications.next) {
      setNextPage(publications.next);
    }
    if (publications.previous) {
      setPreviousPage(publications.previous);
    }
    if (publications.results) {
      setCurrentPage(publications.results);
    }
  }, [publications]);

  const handleNextPage = async () => {
    const accessToken = getAccessToken();
    const nextPageHttps = nextPage.replace('http', 'https');
    if (nextPage) {
      const response = await fetch(nextPageHttps, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setNextPage(data.next);
      setPreviousPage(data.previous);
      setCurrentPage(data.results);
    }
  };

  const handlePreviousPage = async () => {
    const accessToken = getAccessToken();
    const previousPageHttps = previousPage.replace('http', 'https');
    if (previousPage) {
      const response = await fetch(previousPageHttps, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setNextPage(data.next);
      setPreviousPage(data.previous);
      setCurrentPage(data.results);
    }
  };

  return (
    <>
    { !currentPage ? (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
        <LoadingSpinnerIcon className="h-12 w-12"/>
      <p>Cargando publicaciones...</p>
    </div>
    ) : (
      <>
        <div id="main_container" className="hidden sm:flex m-1 flex-col justify-center sm:m-4">
          <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          />
            <PostList publications={currentPage} type="postsReview" />
        </div>
        <div id="main_container" className="flex sm:hidden m-1 flex-col justify-center sm:m-4">
          <PostList publications={currentPage} type="postsReview" />
          <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          />
        </div>
      </>
      )}
    </>
  );
}
