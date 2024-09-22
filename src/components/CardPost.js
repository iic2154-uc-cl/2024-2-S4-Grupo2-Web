import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ContactPopover from './ContactPopover';
import AddressPopover from './AddressPopover';
import SuspendedIcon from './TailwinSvgIcons/SuspendedIcon';
import CheckIcon from './TailwinSvgIcons/CheckIcon';
import ImageIndicator from './ImageIndicator';
import EditPostButton from './EditPostButton';
import DeletePostButton from './DeletePostButton';
import { DateTime } from 'luxon';
import { useAuth0 } from "@auth0/auth0-react";



export default function CardPost(props) {
  const { publication, type } = props;
  const totalImages = publication.images ? publication.images.length : 0;
  const [deleteButtonShouldBeHidden, setDeleteButtonShouldBeHidden] = useState(false);

  const {
    isAuthenticated,
    isLoading,
  } = useAuth0();
  
  const roundDecimalNumber = (number) => {
    return Math.round(number * 10) / 10;
  };

  const addPointsToNumber = (number) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return null;
  };

  const getPostState = () => {
    switch (publication.state) {
      case 'ACTIVE':
        return 'Activa';
      case 'IN_REVIEW':
        return 'En revisión';
      case 'SUSPENDED':
        return 'Suspendida';
      default:
        return '';
    }
  };
  const router = useRouter();
  const handleRedirect = (path) => {
    router.push({
      pathname: path,
      query: {
        id: publication.id,
      },
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (type === 'userPost') {
      handleRedirect('/post/postReservation');
    } else if (type === 'reportedPost') {
      handleRedirect('/admin/reportedPostDetail');
    } else if (type === 'postsReview' || type === 'recourses') {
      handleRedirect('/admin/postReviewDetail');
    }
  };

  const getPostType = () => {
    // PROPERTY CAMPING SERVICE
    switch (publication.type) {
      case 'PROPERTY':
        return 'Propiedad';
      case 'CAMPING':
        return 'Camping';
      case 'SERVICE':
        return 'Servicio';
      default:
        return '';
    }
  };

  const showReservationButton = () => {
    if (type === 'userPost') {
      if (getPostType() !== 'Servicio') return true;
      return false;
    } else if (type === 'sample') {
      return false;
    }
    return true;
  };

  const getButtonText = () => {
    if (type === 'userPost') {
      if (getPostType() !== 'Servicio') return "Generar Reserva";
    }
    if (type === 'reportedPost') {
      return "Ver Reportes";
    }
    if (type === 'postsReview' || type === 'recourses') {
      return "Ver Detalle";
    }
    return "";
  };

  const getPostRating = () => {
    if (publication.rating_average) {
      return roundDecimalNumber(publication.rating_average);
    } else {
      return "SC";
    }
  };

  const getFormattedDate = (dateString) => {
    const date = DateTime.fromISO(dateString, { zone: 'America/Santiago' });
    return date.toFormat('dd/MM/yy');
};

  const getPostCreationdate = () => {
    if(publication.creation_date) {
      return getFormattedDate(publication.creation_date);
    }
    return "";
  }

  const EditButtonShouldBeHidden = () => {
    if (type === 'userPost') {
      return false;
    }
    if (type === 'postsReview') {
      return true;
    }
    return true;
  }

  useEffect(() => {
    CheckIfDeleteButtonShouldBeHidden();
  }, [isAuthenticated]);

  const CheckIfDeleteButtonShouldBeHidden = () => {
    if (type === 'userPost') {
      setDeleteButtonShouldBeHidden(false);
      return;
    }
    try {
      const userTypes = getUserTypes();
      if (userTypes.includes('Administrador')) {
       setDeleteButtonShouldBeHidden(false);
       return;
      }
      setDeleteButtonShouldBeHidden(true);
    } catch (error) {
      setDeleteButtonShouldBeHidden(false);
    }
  };

  const getUserTypes = () => {
    try {
      return JSON.parse(localStorage.getItem('user')).types;
    } catch (error) {
      return null;
    }
  };

  return (
    <Card className="w-auto max-w-[26rem] shadow-2xl sm:h-[50rem] sm:max-h-[55rem] xl:h-[66rem] xl:max-w-[46rem]">
      <CardHeader floated={false} className="blue-gray xl:h-full">
        <ImageIndicator
          totalImages={totalImages}
          useState={useState}
          post={publication}
        />
      </CardHeader>
      <CardBody>
        <div id="delete_&_edit_button_container" className='flex flex-row items-center justify-between'>
          {EditButtonShouldBeHidden() ? null : <EditPostButton publication={publication} />}
          {deleteButtonShouldBeHidden ? null : <DeletePostButton publication={publication} />}
        </div>
        <div id="state_container" className="flex flex-row items-center">
          {getPostState() === 'Suspendida' ? <SuspendedIcon /> : <CheckIcon />}
          <p className="ml-1 text-lg sm:text-base md:text-lg">
            Publicación {getPostState()}
          </p>
        </div>
        <div id="state_container" className="flex flex-row items-center">
          <p>Creada el {getPostCreationdate()}</p>
        </div>
        <div className="mb-4 flex flex-col items-start justify-between gap-3 font-medium">
          <div id="price" className="flex flex-row items-end">
            {getPostType() !== 'Servicio' ? (
              <>
                <Typography
                  color="blue-gray"
                  className="text-5xl font-bold sm:text-4xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                  ${addPointsToNumber(publication.price)}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="text-xs font-bold sm:text-xs md:text-xs"
                >
                  /Noche
                </Typography>
              </>
            ) : (
              <Typography
                color="blue-gray"
                className="text-2xl font-bold text-transparent sm:text-xs"
              >
                $ -
              </Typography>
            )}
          </div>
          <div
            id="valoration_container"
            className="flex flex-row items-center justify-center"
          >
            <StarIcon
              sx={{
                mb: 1 / 2,
                fontSize: {
                  xs: 50,
                  sm: 45,
                  md: 35,
                  lg: 20,
                  xl: 20,
                },
                color: 'orange',
              }}
            />
            <Typography
              color="blue-gray"
              className="text-xs font-bold sm:text-xs md:text-xs"
            >
              {getPostRating()}
            </Typography>
          </div>
        </div>
        <div id="title_container" className="h-15 max-h-15 min-h-15">
          <Typography
            variant="h5"
            color="blue-gray"
            className="h-15 max-h-15 min-h-15 lead font-medium"
          >
            {publication.name}
          </Typography>
        </div>
        <Typography color="gray" className="min-h-32 h-32 max-h-32 overflow-auto">
          {publication.description}
        </Typography>
        {getPostType() === 'Propiedad' && (
          <div className="mt-5 flex flex-row items-center justify-center gap-10">
            <div className="flex items-center justify-center font-medium leading-tight lg:max-w-[7rem]">
              <div id="beds_&_rooms" className="flex flex-col gap-1">
                <div id="rooms" className="flex flex-row items-center lg:ml-4">
                  <MeetingRoomIcon
                    className="mr-3 text-black"
                    sx={{
                      fontSize: {
                        xs: 40,
                        sm: 50,
                        md: 40,
                        lg: 40,
                        xl: 30,
                      },
                      color: 'black',
                    }}
                  />
                  <div className="flex w-full flex-row items-center justify-between gap-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-medium leading-tight sm:text-xs md:text-xs lg:text-sm"
                    >
                      Dormitorios
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="text-sm font-medium leading-tight sm:text-xs md:text-xs lg:text-sm"
                    >
                      {publication.rooms}
                    </Typography>
                  </div>
                </div>
                <div id="beds" className="flex flex-row items-center lg:ml-4">
                  <BedroomChildIcon
                    className="mr-3 text-black"
                    sx={{
                      fontSize: {
                        xs: 40,
                        sm: 50,
                        md: 40,
                        lg: 40,
                        xl: 30,
                      },
                      color: 'black',
                    }}
                  />
                  <div className="flex w-full flex-row items-center justify-between gap-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-medium leading-tight sm:text-xs md:text-xs lg:text-sm"
                    >
                      Camas <br /> simples
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="text-sm font-medium leading-tight sm:text-xs md:text-xs lg:text-sm"
                    >
                      {publication.simple_beds}
                    </Typography>
                  </div>
                </div>
                <div id="beds" className="flex flex-row items-center lg:ml-4">
                  <BedroomParentIcon
                    className="mr-3 text-black"
                    sx={{
                      fontSize: {
                        xs: 40,
                        sm: 50,
                        md: 40,
                        lg: 40,
                        xl: 30,
                      },
                      color: 'black',
                    }}
                  />
                  <div className="flex w-full flex-row items-center justify-between gap-3">
                    <Typography
                      color="blue-gray"
                      className="text-sm font-medium leading-tight sm:text-xs md:text-xs lg:text-sm"
                    >
                      Camas <br /> dobles
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="text-sm font-medium leading-tight sm:text-xs md:text-xs lg:text-sm"
                    >
                      {publication.double_beds}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="contact_&_address_container"
              className="flex flex-col justify-between"
            >
              <ContactPopover publication={publication} />
              <AddressPopover publication={publication} />
            </div>
          </div>
        )}
        {getPostType() === 'Camping' ||
          (getPostType() === 'Servicio' && (
            <div className="mt-5 gap-10">
              <div className="flex flex-row justify-around">
                <ContactPopover publication={publication} />
                <AddressPopover publication={publication} />
              </div>
            </div>
          ))}
      </CardBody>
      <CardFooter className="w-full sm:absolute sm:bottom-0">
          { showReservationButton() && (
            <Button
            size="lg"
            fullWidth
            onClick={handleClick}
            sx={{
              fontSize: {
                xs: 60,
                sm: 55,
                md: 50,
                lg: 40,
                xl: 30,
              },
              color: 'black',
            }}
          >
            {getButtonText()}
          </Button>)}
      </CardFooter>
    </Card>
  );
}
