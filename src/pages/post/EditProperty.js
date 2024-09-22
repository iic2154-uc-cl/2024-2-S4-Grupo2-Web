/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ImageUpload from '../../components/ImageUpload';
import FormField from '../../components/FormField';
import useGooglePlaceAutoComplete from '../api/service/google_place_autocomplete';
import LoadingSpinnerIcon from '../../components/TailwinSvgIcons/LoadingSpinnerIcon';
import EditPostPopUp from '../../components/PopUps/EditPostPopUp';
import { Typography } from '@material-tailwind/react';
import GoogleMap from '../../components/GoogleMap';

export default function EditProperty() {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState();
  const [existingImages, setExistingImages] = useState();
  const [files, setFiles] = useState([]);
  const [isCamping, setIsCamping] = useState();
  const [isService, setIsService] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isProperty, setIsProperty] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const address = useRef("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [postLocation, setPostLocation] = useState({ lat: null, lng: null });

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
  
  const getReadableServiceType = () => {
    if (selectedCategory === 'TRADES_AND_SERVICES') {
      return 'Oficio';
    }
    if (selectedCategory === 'ENTERTAINMENT') {
      return 'Entretención';
    }
    if (selectedCategory === 'FOOD') {
      return 'Comidas';
    }
    if (selectedCategory === 'BUSINESS') {
      return 'Negocios';
    }
    return 'Error';
  };

  const getReadableFullPostType = () => {
    if (isCamping) {
      return 'Camping';
    }
    if (isService) {
      const serviceType = getReadableServiceType();
      return `Servicio de ${serviceType}`;
    }
    if (isProperty) {
      return 'Propiedad';
    }

  }

  const defaultPostType = post ? getReadableFullPostType() : " ";

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

  useEffect(() => {
    const getPost = async () => {
      const postFromServer = await fetchPost(postId);
      setPost(postFromServer);
    };
    if (postId) {
      getPost();
    }
  }, [postId]);

  useEffect(() => {
    if (post) {
      setStatesDefaultValue();
    }
  }, [post]);
  
  const setStatesDefaultValue = () => {
    setExistingImages(post.images.map((image) => image.url));
    address.current.value = post.address;
    setIsProperty(post.type === 'PROPERTY');
    setIsCamping(post.type === 'CAMPING');
    setIsService(post.type === 'SERVICE');
    setSelectedCategory(post.category);
    setLat(post.latitude);
    setLng(post.longitude);
    setPostLocation({ lat: post.latitude, lng: post.longitude });
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Ingrese un título'),
    description: yup.string().required('Ingrese una descripción'),
    address: yup.string().required('Ingrese una dirección valida'),
    phoneNumber: yup
      .string()
      .matches(/^\+569\d+$/, 'Ingresar prefijo +569 seguido de 8 dígitos')
      .length(12, 'Ingrese un número de teléfono válido')
      .required('Ingrese un número de teléfono'),
    double_beds: yup
      .number()
      .typeError('Ingrese un número válido')
      .min(0, 'Ingrese una cantidad válida'),
    simple_beds: yup
      .number()
      .typeError('Ingrese un número válido')
      .min(0, 'Ingrese una cantidad válida'),
    price: yup
      .string()
      .matches(/^\$\d+(\.\d{3})*$/, 'Ingrese un precio válido')
      .required('Ingrese un precio'),
    rooms: yup
      .number()
      .typeError('Ingrese un número válido')
      .min(0, 'Ingrese una cantidad válida'),

    contactName: yup.string().required('Ingrese un nombre de contacto'),
    web_site: yup.string().url('Ingrese una URL válida'),
    social_network_1: yup.string().url('Ingrese una URL válida'),
    social_network_2: yup.string().url('Ingrese una URL válida'),
  });

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  function moneyStringToInt(moneyString) {
    // Elimina el signo $ y los puntos, y luego convierte la cadena resultante en un número entero
    return parseInt(moneyString.replace(/\D/g, ''), 10);
  }

  const onSubmit = async (data) => {
    setLoading(true);
    const requestBody = {
      name: data.name,
      description: data.description,
      address: data.address,
      email: post.email,
      phone_number: data.phoneNumber,
      latitude: lat,
      longitude: lng,
      web_site: data.web_site,
      social_network_1: data.social_network_1,
      social_network_2: data.social_network_2,
      contact_name: data.contactName,
    };

    if (data.dpto) {
      requestBody.dpto = data.dpto;
    }
    if (isCamping) {
      requestBody.type = 'CAMPING';
    } else if (isService) {
      requestBody.type = 'SERVICE';
    } else {
      requestBody.type = 'PROPERTY';
    }
    if (!isService) {
      requestBody.price = moneyStringToInt(data.price);
    }
    if (!isCamping && !isService) {
      requestBody.rooms = data.rooms;
      requestBody.double_beds = data.double_beds;
      requestBody.simple_beds = data.simple_beds;
    }
    if (isService) {
      requestBody.category = selectedCategory;
    }
    
    await updatePost(post, requestBody, files);
    
  };

  const checkIfImageInFiles = (url) => {
    return files.some((file) => url.includes(file.name));
  };

  const updatePost = async (post, requestBody, files) => {
    try {
      const accessToken = getAccessToken();
  
      // Actualizar el post
      const postUpdateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });
      
      const updatedPost = await postUpdateResponse;

      //Eliminar imágenes
      if (existingImages) {
        const imagesToDelete = post.images.filter((image) => !checkIfImageInFiles(image.url));
        if (imagesToDelete.length > 0) {
          const deletePromises = imagesToDelete.map(async (image) => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/delete/${image.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            });
          }
          );
          const resDelete = await Promise.all(deletePromises);
        }
      }
  
      // Subir imágenes nuevas
      if (files.length > 0) {
        const imagesToUpload = files.filter((file) => !existingImages.some((image) => image.includes(file.name)));
        if (imagesToUpload.length === 0) {
          setLoading(false);
          setSuccess(true);
          return;
        }
        const uploadPromises = imagesToUpload.map(async (file) => {
          const formImage = new FormData();
          formImage.append('image', file);
          formImage.append('post_id', post.id);
    
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload/`, {
            method: 'POST',
            body: formImage,
          });  
        });

        const res = await Promise.all(uploadPromises);
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Ocurrió un error al procesar la solicitud:', error);
    }
  };

  const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
  let autoComplete = '';

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: post,
  });

  const currentAddress = watch("address");

  const getFormattedAddress = (addressObj) => {
    // address format: route + streetNumber, locality, adminArea1Long, countryLong
    let formattedAddress = '';
    if (addressObj.route) {
      formattedAddress += addressObj.route;
    }
    if (addressObj.streetNumber) {
      formattedAddress += ` ${addressObj.streetNumber}`;
    }
    if (addressObj.locality) {
      formattedAddress += `, ${addressObj.locality}`;
    }
    if (addressObj.adminArea1Long) {
      formattedAddress += `, ${addressObj.adminArea1Long}`;
    }
    if (addressObj.countryLong) {
      formattedAddress += `, ${addressObj.countryLong}`;
    }
    return formattedAddress;
  };

  const handleAddressSelect = async () => {
    const addressObj = await googleAutoCompleteSvc.getFullAddress(autoComplete);
    if (!addressObj) {
      return;
    }
    setLat(addressObj.latitude);
    setLng(addressObj.longitude);
    const formattedAddress = getFormattedAddress(addressObj);
    address.current.value = formattedAddress;
  };

  useEffect(() => {
    async function loadGoogleMaps() {
      // initialize the Google Place Autocomplete widget and bind it to an input element.
      autoComplete = await googleAutoCompleteSvc.initAutoComplete(
        address.current,
        handleAddressSelect
      );
    }
    if (post) {
      setValue('address', address.current.value);
      loadGoogleMaps();
    }
  }, [post]);

  async function urlToFile(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  useEffect(() => {
    async function loadImages() {
      const promises = existingImages.map(async (url) => {
        const file = await urlToFile(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
        return file;
      });
      const imageFiles = await Promise.all(promises);
      setFiles(imageFiles);
    }
    if (post && existingImages) {
      loadImages();
    }
  }, [post, existingImages]);

  const formRef = useRef(null);
  const handleOutsideSubmit = () => {
    handleSubmit(onSubmit)();
  };

  const postDetailPlaceholder = () => {
    // TODO: agregar descripciones con sugerencias mas específicas (chatgpt)
    if (isCamping) {
      return 'Describe con detalle el camping que deseas publicar.';
    }
    if (isService) {
      return 'Describe con detalle el servicio que deseas publicar.';
    }
    if (isProperty) {
      return 'Describe con detalle la propiedad que deseas publicar.';
    }
    return 'error';
  };

  const formatMoney = (value) => {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <section className="">
     { post ? (
     <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <ImageUpload files={files} setFiles={setFiles} />
        <div id="form_container" className="w-full max-w-2xl">
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-10 gap-2">
              <div className="col-span-8 col-start-2">
                <Typography variant="h4" color="blue-gray">
                  Ingresa la información de tu publicación
                </Typography>
              </div>
              <div className="col-span-8 col-start-2">
                <label
                    htmlFor="category"
                    className="mb-1 mt-3 block text-xxs font-medium text-black sm:text-sm"
                  >
                    Categoría
                </label>
                <input
                  type="text"
                  name="category"
                  className="w-full mb-3 appearance-none rounded border border-blue-500 bg-white px-3 py-2 text-xxs leading-tight text-black focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-lg"
                  defaultValue={defaultPostType}
                  disabled={true}
                />
                <div className="mb-3">
                  <FormField
                    type="text"
                    label="Título"
                    name="name"
                    placeholder=""
                    required=""
                    register={register}
                    defaultValue={post ? post.name : ''}
                    error={errors}
                  />
                </div>
                <div>
                  <FormField
                    textarea
                    label="Descripción"
                    name="description"
                    rows={8}
                    placeholder={postDetailPlaceholder()}
                    required=""
                    register={register}
                    defaultValue={post ? post.description : ''}
                    error={errors}
                  />
                </div>
              </div>
              <div className="col-span-8 col-start-2">
                <GoogleMap 
                  addressRef={address}
                  setLat={setLat}
                  setLng={setLng} 
                  setValue={setValue} 
                  defaultValue={currentAddress}
                  userLocation={postLocation}
                />
                <div id="address_container" className='grid grid-cols-10 gap-2'>
                  <div id="address" className='col-span-8 col-start-1 block'>
                    <label
                      htmlFor="address"
                      className="mb-1 mt-2 block text-xxs font-medium text-black sm:text-sm"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 text-xxs leading-tight text-black focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-lg"
                      placeholder=""
                      required=""
                      {...register('address')}
                      ref={address}
                    />
                    {errors.address && (
                      <p className="text-xs italic text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div id="address" className='col-span-2 col-start-9 block'>
                    <label
                      htmlFor="address"
                      className="mb-1 mt-2 block text-xxs font-medium text-black sm:text-sm"
                    >
                      Depto
                    </label>
                    <input
                      type="text"
                      name="depto"
                      id="dpto"
                      className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 text-xxs leading-tight text-black focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-lg"
                      placeholder=""
                      required=""
                      defaultValue={post ? post.dpto : ''}
                      {...register('dpto')}
                    />
                    {errors.address && (
                      <p className="text-xs italic text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {isProperty && (
                <>
                  <div className="col-span-2 col-start-2 sm:col-span-2 sm:col-start-2">
                    <FormField
                      type="number"
                      label="Dormitorios"
                      name="rooms"
                      placeholder=""
                      required=""
                      disabled={isCamping || isService}
                      register={register}
                      defaultValue={post ? post.rooms : ''}
                      error={errors}
                    />
                  </div>
                  <div className="col-span-3 col-start-4 sm:col-span-3 sm:col-start-4">
                    <FormField
                      type="number"
                      label="Camas simples"
                      name="simple_beds"
                      placeholder=""
                      required=""
                      disabled={isCamping || isService}
                      register={register}
                      defaultValue={post ? post.simple_beds : ''}
                      error={errors}
                    />
                  </div>
                  <div className="col-span-3 col-start-7 sm:col-span-3 sm:col-start-7">
                    <FormField
                      type="number"
                      label="Camas dobles"
                      name="double_beds"
                      placeholder=""
                      required=""
                      disabled={isCamping || isService}
                      register={register}
                      defaultValue={post ? post.double_beds : ''}
                      error={errors}
                    />
                  </div>
                </>
              )}
              {isService ? (
                <>
                  <div className="col-span-4 col-start-2">
                    <FormField
                      type="phone"
                      label="Teléfono de contacto"
                      name="phoneNumber"
                      defaultValue={post ? post.phone_number : '+569'}
                      required=""
                      register={register}
                      error={errors}
                    />
                  </div>
                  <div className="col-span-4 col-start-6 block">
                    <FormField
                      type="text"
                      label="Nombre de contacto"
                      name="contactName"
                      disabled={!isService}
                      placeholder=""
                      required=""
                      register={register}
                      defaultValue={post ? post.contact_name : ''}
                      error={errors}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-4 col-start-2">
                    <FormField
                      type="phone"
                      label="Teléfono de contacto"
                      name="phoneNumber"
                      defaultValue={post ? post.phone_number : '+569'}
                      required=""
                      register={register}
                      error={errors}
                    />
                  </div>
                  <div className="col-span-4 col-start-6 block">
                    <FormField
                      type="text"
                      label="Nombre de contacto"
                      name="contactName"
                      disabled={isService}
                      placeholder=""
                      required=""
                      register={register}
                      defaultValue={post ? post.contact_name : ''}
                      error={errors}
                    />
                  </div>
                  <div className="col-span-4 col-start-2">
                  <FormField
                    type="money"
                    label="Precio diario"
                    name="price"
                    placeholder=""
                    required=""
                    disabled={isService}
                    register={register}
                    defaultValue={post ? formatMoney(post.price) : ''}
                    error={errors}
                    />
                  </div>
                </>
              )}
              <div className="col-span-4 col-start-2 block">
                <FormField
                  type="url"
                  label="Sitio web (opcional)"
                  name="web_site"
                  placeholder=""
                  required=""
                  register={register}
                  defaultValue={post ? post.web_site : ''}
                  error={errors}
                />
              </div>
              <div className="col-span-4 col-start-6 block">
                <FormField
                  type="url"
                  label="Facebook (opcional)"
                  name="social_network_1"
                  placeholder=""
                  required=""
                  register={register}
                  defaultValue={post ? post.social_network_1 : ''}
                  error={errors}
                />
              </div>
              <div className="col-span-4 col-start-2 block">
                <FormField
                  type="url"
                  label="Instagram (opcional)"
                  name="social_network_2"
                  placeholder=""
                  required=""
                  register={register}
                  defaultValue={post ? post.social_network_2 : ''}
                  error={errors}
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center">
            <button
              className="inline-block w-[200px] rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-blue-500 focus:ring-2 focus:ring-gray-500"
              type="submit"
            >
                Guardar publicación
              </button>
            </div>
          </form>
        </div>
        <EditPostPopUp loading={loading} success={success} setSuccess={setSuccess} error={error} />
      </div>) : (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
        <LoadingSpinnerIcon className="h-12 w-12"/>
        <p>Cargando publicación...</p>
      </div>
      )}
    </section>
  );
}

