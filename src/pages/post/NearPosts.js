import { useEffect, useState } from 'react';
import PostList from '../../components/PostList';
import LoadingSpinnerIcon from '../../components/TailwinSvgIcons/LoadingSpinnerIcon';
import Pagination from '../../components/Pagination';

export default function NearPosts() {
    const [currentPosts, setCurrentPosts] = useState();
    const [prevPosts, setPrevPosts] = useState(null);
    const [nextPosts, setNextPosts] = useState(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    
    const getUserCurrentLocation = () => {
        return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            }
            );
        } else {
            reject(new Error("La Geolocalización no está disponible en este navegador"));
        }
        });
    };
  
    useEffect(() => {
        getUserCurrentLocation()
        .then((location) => {
            setUserLocation(location);
        })
        .catch((error) => {
            setUserLocation({
            lat: Number(process.env.NEXT_PUBLIC_LAT),
            lng: Number(process.env.NEXT_PUBLIC_LNG),
            });
        });
    }, []);

    const loadNextPagePosts = async (pageNumber) => {
        const nextPostsData = await fetchNearPosts(pageNumber + 1);
        if (nextPostsData.length === 0) {
            setNextPosts(null);
            return;
        }
        setNextPosts(nextPostsData);
    };

    const loadPreviousPagePosts = async (pageNumber) => {
        if (pageNumber === 1) {
            setPrevPosts(null);
            return;
        }
        const previousPostsData = await fetchNearPosts(pageNumber - 1);
        setPrevPosts(previousPostsData);
    };

    const handleNextPage = async () => {
        if (isLoading) {
            return;
        }
        if (nextPosts) {
            const newPageNumber = currentPageNumber + 1;
            setCurrentPageNumber(newPageNumber);
            await updatePosts(newPageNumber);
        }
    };

    const updatePosts = async (newNumber) => {
        setIsLoading(true);
        if (newNumber === 1) {
            console.log('newNumber is 1');
            setCurrentPosts(prevPosts);
            setNextPosts(currentPosts);
            setPrevPosts(null);
        } else if (newNumber > currentPageNumber) {
            console.log("AVANZO");
            setPrevPosts(currentPosts);
            setCurrentPosts(nextPosts);
            await loadNextPagePosts(newNumber);
        } else if (newNumber < currentPageNumber) {
            console.log("RETROCEDO");
            setNextPosts(currentPosts);
            setCurrentPosts(prevPosts);
            await loadPreviousPagePosts(newNumber);
        }
        setIsLoading(false);
        
    }

    const handlePreviousPage = async () => {
        if (isLoading) {
            return;
        }
        if (prevPosts) {
            const newPageNumber = currentPageNumber - 1;
            setCurrentPageNumber(newPageNumber);
            await updatePosts(newPageNumber);
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

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
            * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    const fetchNearPosts = async (pageNumber) => {
        if (!userLocation.lat || !userLocation.lng) {
            return null;
        };
        const accessToken = getAccessToken();
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/post/nearest`;
        let radio;
        if (userLocation.lat === Number(process.env.NEXT_PUBLIC_LAT) && userLocation.lng === Number(process.env.NEXT_PUBLIC_LNG)) {
            radio = process.env.NEXT_PUBLIC_DEFAULT_RADIUS;
        } else {
            radio = process.env.NEXT_PUBLIC_RADIUS;
        }
      
        // Parámetros de la solicitud
        const params = {
          rad: radio,
          lat: userLocation.lat,
          long: userLocation.lng,
          page: pageNumber,
          type: 'PROPERTY,CAMPING,SERVICE',
          order: 'nearest',
          min_rating: 0,
          categories: '',
          single_beds: -1,
          double_beds: -1,
          availability: 'all',
          max_price: -1,
        };
      
        // Construir la URL con los parámetros
        const urlWithParams = new URL(apiUrl);
        Object.keys(params).forEach(key => urlWithParams.searchParams.append(key, params[key]));
      
        try {
          const res = await fetch(urlWithParams, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await res.json();
          if (data.posts.length === 0) {
            return [];
          }

          const postsWithDistance = data.posts.map((post) => ({
            ...post,
            distance: getDistanceFromLatLonInKm(
              location.latitude,
              location.longitude,
              post.latitude,
              post.longitude,
            ),
          }));

          return postsWithDistance;
        } catch (error) {
          console.error('Ocurrió un error al obtener las publicaciones cercanas', error);
          window.alert(
            'Ocurrió un error al obtener las publicaciones cercanas. Por favor, intenta nuevamente más tarde.'
          );
        }
      };
      
    useEffect(() => {
      const getPublications = async () => {
        const publicationsFromServer = await fetchNearPosts(currentPageNumber);
        setCurrentPosts(publicationsFromServer);
        if (currentPosts){
            await loadNextPagePosts(currentPageNumber);
        }
      };
      getPublications();
    }, [userLocation]);

  
    return (
      <>
      { !currentPosts ? (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
          <LoadingSpinnerIcon className="h-12 w-12"/>
        <p>Cargando publicaciones...</p>
      </div>
      ) : (
        <>
          <div id="main_container" className="hidden sm:flex m-1 flex-col justify-center sm:m-4">
            <Pagination
            nextPage={nextPosts}
            previousPage={prevPosts}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            />
              <PostList publications={currentPosts} type="sample" />
          </div>
          <div id="main_container" className="flex sm:hidden m-1 flex-col justify-center sm:m-4">
            <PostList publications={currentPosts} type="sample" />
            <Pagination
            nextPage={nextPosts}
            previousPage={prevPosts}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            />
          </div>
        </>
        )}
      </>
    );
  }
  