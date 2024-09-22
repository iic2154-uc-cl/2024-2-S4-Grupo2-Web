/* eslint-disable */
import SuspendPostButton from '../../components/SuspendPostButton';
import PostInfo from '../../components/PostInfo';
import ReportsList from '../../components/ReportsList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinnerIcon from '../../components/TailwinSvgIcons/LoadingSpinnerIcon';

export default function postDetail() {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState();
  const [reports, setReports] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const postFromServer = await fetchPost(postId);
      setPost(postFromServer);
    };
    const getReports = async () => {
      const reportsFromServer = await fetchPostReports(postId);
      setReports(reportsFromServer);
    };
    if (postId) {
      setLoadingData(true);
      getPost();
      getReports();
      setLoadingData(false);
    }
  }, [postId]);

  const fetchPost = async (id) => {
    const accessToken = getAccessToken();
    try {
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

  const fetchPostReports = async (id) => {
    const accessToken = getAccessToken();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const reports = await response.json();
      if (!reports) {
        return [];
      }
      return reports;
    } catch (error) {
      console.error('Ocurrió un error al obtener los reportes', error);
      window.alert(
        'Ocurrió un error al obtener los reportes. Por favor, intenta nuevamente más tarde.'
      );
    }
  }

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

  return (
    <section className="">
      { post ? (
        <div id="main_container" className="mx-auto justify-center px-4 xl:container">
          <div
            id="sub_main_container"
            className="mx-10 mt-5 flex h-full flex-col items-center"
          >
            <PostInfo post={post} />
            <div
              id="reports_container"
              className="mt-4 flex h-full w-full flex-row justify-center gap-3"
            >
              <SuspendPostButton post={post} reports={reports} />
              <div id="reports_container" className="h-full max-h-52 w-1/2">
                <label for="message" className="mb-2 block text-sm font-medium">
                  Hay {reports.length} reportes para esta publicación
                </label>
                <ReportsList reports={reports} />
              </div>
            </div>
          </div>
        </div> 
        ) : (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
          <LoadingSpinnerIcon className="h-12 w-12"/>
          <p>Cargando publicación...</p>
        </div>
      )}
     </section>
  );
}
