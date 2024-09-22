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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageIndicator from '../../components/ImageIndicator';
import LoadingSpinnerIcon from '../../components/TailwinSvgIcons/LoadingSpinnerIcon';

export default function postReviewDetail() {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const postFromServer = await fetchPost(postId);
      setPost(postFromServer);
    };
    if (postId) {
      getPost();
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
    if (!post) {
      return;
    }
    const accessToken = getAccessToken();
    setLoading(true);
    const newState = getNewState(post.state);
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

      await res.json();
      window.alert(`Publicación ${getActualState(newState)}`);
      router.reload();
    } catch (error) {
      alert('Error al cambiar el estado del post');
    }
    setLoading(false);
  };

  let buttonText;
  let buttonColor;

  if (post) {
    if (post.state === 'ACTIVE' || post.state === 'IN_REVIEW') {
      buttonText = 'Suspender';
      buttonColor =
        'bg-red-500 hover:bg-red-700 focus:outline-red-500 focus:ring-2 focus:ring-gray-500';
    } else if (post.state === 'SUSPENDED') {
      buttonText = 'Activar';
      buttonColor =
        'bg-blue-500 hover:bg-blue-700 focus:outline-blue-500 focus:ring-2 focus:ring-gray-500';
    }
  }

  return (
    <section className="">
    { post ? (
      <div id="main_container" className="mx-auto justify-center px-4 xl:container">
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
              <div id="name_owner" className="flex flex-row items-center">
                <PersonIcon className="mr-3" />
                <p className="text-sm font-medium leading-10">{post.user_name}</p>
              </div>
              <div id="address" className="flex flex-row items-center">
                <LocationOnIcon className="mr-3" />
                <p className="text-sm font-medium leading-10">{post.address}</p>
              </div>
              <div id="call_phone" className="flex flex-row items-center">
                <CallIcon className="mr-3" />
                <p className="text-sm font-medium leading-10">{post.phone_number}</p>
              </div>
              <div id="wsp_phone" className="flex flex-row items-center">
                <WhatsAppIcon className="mr-3" />
                <p className="text-sm font-medium leading-10">{post.phone_number}</p>
              </div>
              <div id="email" className="flex flex-row items-center">
                <MailOutlineIcon className="mr-3" />
                <p className="text-sm font-medium leading-10">{post.email}</p>
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
            <div
              id="report_container"
              className="mt-3 flex h-full w-full items-center justify-center"
            >
              <div id="report_button" className="mt-10 flex items-center justify-center">
                <button
                  type="submit"
                  className={`inline-block w-[150px] rounded px-4 py-2 font-bold text-white ${buttonColor}`}
                  onClick={handleButtonClick}
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : buttonText}
                </button>
              </div>
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