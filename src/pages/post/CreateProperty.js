/* eslint-disable no-console */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { set, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stepper,
  Step,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import CheckIcon from '../../components/TailwinSvgIcons/CheckIcon';
import FormField from '../../components/FormField';
import ImageUpload from '../../components/ImageUpload';
import GoogleMap from '../../components/GoogleMap';
import CreatePostPopUp from '../../components/PopUps/CreatePostPopUp';
import TermsAndConditionsPopUp from '../../components/PopUps/TermsAndConditionsPopUp';
import PrivacyPolicyPopUp from '../../components/PopUps/PrivacyPolicyPopUp';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DisplayTable from '../../components/DisplayTable';

const postTypes = [
  {
    label: 'Propiedad',
    value: 'Propiedad',
    desc: `Publicar alojamiento en Casa o Departamento.`,
  },
  {
    label: 'Camping',
    value: 'Camping',
    desc: `Publicar alojamiento en Camping.`,
  },
  {
    label: 'Servicio',
    value: 'Servicio',
    desc: `Selecciona el tipo de servicio que deseas publicar.`,
  },
];

const serviceTypes = [
  {
    label: 'Oficio',
    value: 'Servicio de Oficio',
    icon: CheckIcon,
    desc: "Con Servicio de Oficio, podrás ofrecer tus habilidades y experiencia en una variedad de áreas profesionales. Si eres plomero, electricista, carpintero o tienes cualquier otro talento útil, esta categoría te permite conectar con clientes que buscan soluciones para sus necesidades domésticas o empresariales. Destaca tus conocimientos y garantiza un servicio de calidad para ganar la confianza de nuevos clientes.",
  },
  {
    label: 'Entretención',
    value: 'Entretención',
    icon: CheckIcon,
    desc: "Si eres un proveedor de servicios de entretenimiento, la categoría 'Entretención' es perfecta para ti. Aquí puedes ofrecer tus servicios para eventos culturales, espectáculos en vivo, actividades recreativas y mucho más. Sé creativo y muestra a los clientes potenciales cómo tu servicio de entretenimiento puede convertir sus eventos en momentos inolvidables y llenos de diversión.",
  },
  {
    label: 'Comidas',
    value: 'Comidas',
    icon: CheckIcon,
    desc: "¿Tienes un negocio de comida o restaurante? La categoría 'Comidas' te brinda la oportunidad de mostrar tu exquisita cocina y atraer a nuevos comensales. Presenta tus platillos más sabrosos, resalta tus ingredientes frescos y ofrece una experiencia gastronómica única para conquistar los paladares de tus clientes. Conecta con amantes de la buena comida y permite que descubran tus delicias culinarias.",
  },
  {
    label: 'Negocios',
    value: 'Negocios',
    icon: CheckIcon,
    desc: "En la categoría 'Negocios', podrás mostrar tu emprendimiento o pequeño negocio y soluciones prácticas para la comunidad local. Si tienes una tienda de barrio, un servicio de reparaciones u otro negocio de distinto rubro, como por ejemplo un taller de bicicletas, esta categoría te conecta con clientes que valoran la cercanía y el trato personalizado. Muestra cómo tu emprendimiento resuelve problemas cotidianos y mejora la calidad de vida en tu comunidad. ¡Presenta tu negocio a clientes que aprecian las soluciones prácticas que ofreces!",
  },
];

export default function CreateProperty() {
  const router = useRouter();
  const address = useRef();
  const [files, setFiles] = useState([]);
  const [isProperty, setIsProperty] = useState(true);
  const [isCamping, setIsCamping] = useState(false);
  const [isService, setIsService] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('TRADES_AND_SERVICES');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);

  // Stepper
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const handleNext = async () => {
    if (activeStep === 2) {
        const isFormValid = await trigger();
        if (!isFormValid) return;
    }
    if (activeStep === 1){
      if (files.length === 0) {
        window.alert('Debes subir al menos una imagen');
        return;
      }
    }

    if (!isLastStep) setActiveStep((cur) => cur + 1); // Si no estás en el último paso, avanza al siguiente
  };

  const handleNextStepByClick = async (clickedStep) => {
    if (clickedStep === 3) {
      const isFormValid = await trigger();
      if (!isFormValid) return;
    }
    if (clickedStep === 2 || clickedStep === 3 ){
      if (files.length === 0) {
        window.alert('Debes subir al menos una imagen');
        return;
      }
    }

    setActiveStep(clickedStep);
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
    price: yup.string()
      .test('price-validation', 'Ingrese un precio válido', function(value) {
        if (!isService) {
          return /^\$\d+(\.\d{3})*$/.test(value);
        }
        return true;
      }),
    rooms: yup
      .number()
      .typeError('Ingrese un número válido')
      .min(0, 'Ingrese una cantidad válida'),
    contactName: yup.string().required('Ingrese un nombre de contacto'),
    web_site: yup.string().url('Ingrese una URL válida'),
    social_network_1: yup.string().url('Ingrese una URL válida'),
    social_network_2: yup.string().url('Ingrese una URL válida'),

  });

  const getUserEmail = () => {
    try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user.email;
    return userEmail;
    } catch (error) {
      console.error('Ocurrió un error al obtener email', error);
      window.alert(
        'Ocurrió un error al obtener email. Por favor, intenta nuevamente más tarde.'
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

  function moneyStringToInt(moneyString) {
    // Elimina el signo $ y los puntos, y luego convierte la cadena resultante en un número entero
    return parseInt(moneyString.replace(/\D/g, ''), 10);
  }

  const onSubmit = async (data) => {
    if (files.length === 0) {
      window.alert('Debes subir al menos una imagen');
      return;
    }
    setLoading(true);
    const userEmail = getUserEmail();
    const requestBody = {
      name: data.name,
      description: data.description,
      address: data.address,
      email: userEmail,
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
    try {
      const accessToken = getAccessToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });
      const response = await res.json();

      const uploadPromises = files.map(async (file) => {
        const formImage = new FormData();
        formImage.append('image', file);
        formImage.append('post_id', response.id);

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload/`, {
          method: 'POST',
          body: formImage,
        });
      });
      await Promise.all(uploadPromises);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log('Ocurrió un error al procesar la solicitud:', error);
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const removeLineBreaks = (str) => {
    // innerText str comes with line breaks, this function removes them
    // in order to match the value at setPostType
    return str.replace(/(\r\n|\n|\r)/gm, '');
  };

  const setPostType = (type) => {
    if (type === 'Camping') {
      setIsCamping(true);
      setIsService(false);
      setIsProperty(false);
    } else if (type === 'Servicio') {
      setIsService(true);
      setIsCamping(false);
      setIsProperty(false);
    } else if (type === 'Propiedad') {
      setIsProperty(true);
      setIsCamping(false);
      setIsService(false);
    }
  };

  const postTypeTabOnClick = (e) => {
    e.preventDefault();
    const selectedPostType = removeLineBreaks(e.nativeEvent.target.innerText);
    setPostType(selectedPostType);
  };

  const setServiceType = (type) => {
    if (type === 'Servicio de Oficio') {
      setSelectedCategory('TRADES_AND_SERVICES');
    } else if (type === 'Entretención') {
      setSelectedCategory('ENTERTAINMENT');
    } else if (type === 'Comidas') {
      setSelectedCategory('FOOD');
    } else if (type === 'Negocios') {
      setSelectedCategory('BUSINESS');
    }
  };

  const serviceTypeTabOnClick = (e) => {
    e.preventDefault();
    try {
      const selectedServiceType1 = e.target.offsetParent.id;
      if (!selectedServiceType1 || selectedServiceType1 === '') {
        const selectedServiceType2 = e.nativeEvent.target.innerText;
        setServiceType(removeLineBreaks(selectedServiceType2));
      } else {
        setServiceType(removeLineBreaks(selectedServiceType1));
      }
    } catch {
      const selectedServiceType3 = e.nativeEvent.target.innerText;
      setServiceType(removeLineBreaks(selectedServiceType3));
    }
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

  const getFormPostType = () => {
    if (isCamping) {
      return 'CAMPING';
    }
    if (isService) {
      return 'SERVICE';
    }
    if (isProperty) {
      return 'PROPERTY';
    }
    return 'Error';
  };

  const formRef = useRef(null);
  const handleOutsideSubmit = () => {
    handleSubmit(onSubmit)();
  };

  const getPostInfoFromForm = () => {
    const formValues = watch();
  
    const formObj = Object.fromEntries(
      Object.entries(formValues)
        .filter(([, value]) => value)  // Filtrar entradas sin valor
        .map(([key, value]) => {
          let keySpanish = translateKeyToSpanish(key);
          return [keySpanish, value];
        })
    );
  
    formObj.Tipo = getReadableFullPostType();
  
    if (isService) {
      // eliminamos precio
      delete formObj.price;
    }
  
    return formObj;
  };
  

  const translateKeyToSpanish = (key) => {
    if (key === 'name') {
      return 'Título';
    } else if (key === 'description') {
      return 'Descripción';
    } else if (key === 'address') {
      return 'Dirección';
    } else if (key === 'phoneNumber') {
      return 'Teléfono de contacto';
    } else if (key === 'double_beds') {
      return 'Camas dobles';
    } else if (key === 'simple_beds') {
      return 'Camas simples';
    } else if (key === 'rooms') {
      return 'Dormitorios';
    } else if (key === 'contactName') {
      return 'Nombre de contacto';
    } else if (key === 'web_site') {
      return 'Sitio web';
    } else if (key === 'social_network_1') {
      return 'Facebook';
    } else if (key === 'social_network_2') {
      return 'Instagram';
    } else if (key === 'price') {
      return 'Precio diario';
    } else if (key === 'dpto') {
      return 'Depto';
    } else {
      return 'Error';
    }
  };

  const currentAddress = watch("address");

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
    return 'Error';
  }

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
        console.error("Error obteniendo la ubicación", error);
      });
  }, []);

  const handleClickTermsAndConditionsCheckBox = () => {
    if (acceptTermsAndConditions) {
      setAcceptTermsAndConditions(false);
    } else {
      setOpenTermsAndConditions(true)
    }
  };

  const handleClickPolicyPrivacyCheckBox = () => {
    if (acceptPrivacyPolicy) {
      setAcceptPrivacyPolicy(false);
    } else {
      setOpenPrivacyPolicy(true)
    }
  };

  return (
    <section>
      <div
        id="main_container"
        className="mx-auto flex flex-col justify-center px-4 py-10"
      >
        <div id="content_container" className="w-full">
          <div id="stepper_container" className="mb-20 flex justify-center">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              className="max-w-xs sm:max-w-lg lg:max-w-2xl"
            >
              <Step onClick={() => handleNextStepByClick(0)}>
                1
                <div className="absolute -bottom-[2.55rem] w-max text-center sm:-bottom-[2.5rem]">
                  <Typography
                    color={activeStep === 0 ? 'blue' : 'blue-gray'}
                    textAlign="center"
                    className="block text-xs font-bold sm:hidden sm:text-base md:text-base lg:text-lg"
                  >
                    Tipo de
                    <br /> publicación
                  </Typography>
                  <Typography
                    color={activeStep === 0 ? 'blue' : 'blue-gray'}
                    textAlign="center"
                    className="hidden text-xs font-bold sm:block sm:text-base md:text-base lg:text-lg"
                  >
                    Tipo de publicación
                  </Typography>
                </div>
              </Step>
              <Step onClick={() => handleNextStepByClick(1)}>
                2
                <div className="absolute -bottom-[2.0rem] w-max text-center sm:-bottom-[2.5rem]">
                  <Typography
                    color={activeStep === 1 ? 'blue' : 'blue-gray'}
                    className="text-xs font-bold sm:text-base md:text-base lg:text-lg"
                  >
                    Imágenes
                  </Typography>
                </div>
              </Step>
              <Step onClick={() => handleNextStepByClick(2)}>
                3
                <div className="absolute -bottom-[2.0rem] w-max text-center sm:-bottom-[2.5rem]">
                  <Typography
                    color={activeStep === 2 ? 'blue' : 'blue-gray'}
                    className="text-xs font-bold sm:text-base md:text-base lg:text-lg"
                  >
                    Información
                  </Typography>
                </div>
              </Step>
              <Step onClick={() => handleNextStepByClick(3)}>
                4
                <div className="absolute -bottom-[2.0rem] w-max text-center sm:-bottom-[2.5rem]">
                  <Typography
                    color={activeStep === 3 ? 'blue' : 'blue-gray'}
                    className="text-xs font-bold sm:text-base md:text-base lg:text-lg"
                  >
                    Publicar
                  </Typography>
                </div>
              </Step>
            </Stepper>
          </div>
          {activeStep === 0 ? (
            <div
              id="stepper_content"
              className="mx-auto flex flex-col items-center justify-center"
            >
              <div
                id="tabs_container"
                className="w-full max-w-sm sm:max-w-lg md:max-w-xl"
              >
                <Tabs value="Propiedad" className="">
                  <TabsHeader
                    indicatorProps={{
                      className: 'bg-blue-500 shadow-none',
                    }}
                    className=" bg-blue-gray-300"
                  >
                    {postTypes.map(({ label, value }) => (
                      <Tab
                        key={value}
                        value={value}
                        onClick={postTypeTabOnClick}
                        className=" text-base text-white md:text-base lg:text-lg"
                      >
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody className="text-base text-black md:text-base lg:text-lg">
                    {postTypes.map(({ value, desc }) => (
                      <TabPanel key={value} value={value} className="text-black">
                        {desc}
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </div>
              <div
                id="service_tabs_container"
                className="xs:max-w-2xl mt-10 flex w-full max-w-lg items-center justify-center sm:max-w-2xl md:max-w-2xl"
              >
                {isService && (
                  <Tabs value="Servicio de Oficio" className=" w-full max-w-3xl">
                    <TabsHeader
                      indicatorProps={{
                        className: 'bg-blue-500 shadow-none',
                      }}
                      className=" flex items-center bg-blue-gray-300"
                    >
                      {serviceTypes.map(({ label, value }) => (
                        <Tab
                          key={value}
                          value={value}
                          id={value}
                          onClick={serviceTypeTabOnClick}
                          className="text-sm sm:text-base text-white md:text-base lg:text-lg"
                        >
                          {label}
                        </Tab>
                      ))}
                    </TabsHeader>
                    <TabsBody className="text-black">
                      {serviceTypes.map(({ value, desc }) => (
                        <TabPanel
                          key={value}
                          value={value}
                          className="text-base text-black md:text-base lg:text-lg text-justify"
                        >
                          {desc}
                        </TabPanel>
                      ))}
                    </TabsBody>
                  </Tabs>
                )}
              </div>
            </div>
          ) : activeStep === 1 ? (
            <div
              id="stepper_content"
              className="mx-auto flex flex-col items-center justify-center"
            >
              <div id="image_upload_container" className="w-full max-w-2xl">
                <ImageUpload files={files} setFiles={setFiles} />
              </div>
            </div>
          ) : activeStep === 2 ? (
            <div
              id="stepper_content"
              className="mx-auto flex flex-col items-center justify-center"
            >
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
                        defaultValue={`${getReadableFullPostType()}`}
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
                          error={errors}
                        />
                      </div>
                    </div>
                    <div className="col-span-8 col-start-2">
                    <div id="address_container" className='mb-4 grid grid-cols-10 gap-2'>
                        <div id="address" className='col-span-8 col-start-1 block'>
                          <label
                            htmlFor="address"
                            className="mb-1 block text-xxs font-medium text-black sm:text-sm"
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
                            className="mb-1 block text-xxs font-medium text-black sm:text-sm"
                          >
                            depto/cabaña
                          </label>
                          <input
                            type="text"
                            name="depto"
                            id="dpto"
                            className="w-full appearance-none rounded border border-blue-500 bg-white px-3 py-2 text-xxs leading-tight text-black focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-lg"
                            placeholder=""
                            required=""
                            {...register('dpto')}
                          />
                          {errors.address && (
                            <p className="text-xs italic text-red-500">
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                    </div>
                      <GoogleMap 
                        addressRef={address}
                        setLat={setLat}
                        setLng={setLng} 
                        setValue={setValue} 
                        defaultValue={currentAddress}
                        userLocation={userLocation}
                      />
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
                            defaultValue="+569"
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
                            defaultValue="+569"
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
                          error={errors}
                          defaultValue="$"
                         />
                        </div>
                      </>
                    )}
                    <div className="col-span-4 col-start-2 block">
                      <FormField
                        type="url"
                        label="Sitio web (opcional)"
                        name="web_site"
                        placeholder="https://www.mi-sitio-web.com"
                        required=""
                        register={register}
                        error={errors}
                      />
                    </div>
                    <div className="col-span-4 col-start-6 block">
                      <FormField
                        type="url"
                        label="Facebook (opcional)"
                        name="social_network_1"
                        placeholder="https://www.facebook.com/mi-usuario"
                        required=""
                        register={register}
                        error={errors}
                      />
                    </div>
                    <div className="col-span-4 col-start-2 block">
                      <FormField
                        type="url"
                        label="Instagram (opcional)"
                        name="social_network_2"
                        placeholder="https://www.instagram.com/mi-usuario/"
                        required=""
                        register={register}
                        error={errors}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : activeStep === 3 ? (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="grid w-full max-w-2xl grid-cols-10 items-center gap-4">
                <div className="col-span-10 col-start-1">
                  <Typography variant="h4" color="blue-gray">
                    Información de publicación
                  </Typography>
                </div>
                <div className="col-span-10 col-start-1 mt-2">
                  <DisplayTable data={getPostInfoFromForm()} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      {activeStep === 3 &&
        <div
          id="terms_&_conditions_container"
          className="mx-auto mb-10 mt-5 flex flex-col w-full justify-around items-center px-4 sm:w-2/3 lg:w-1/2"
        >
          <div>
            <FormControlLabel
              className={`${isLastStep ? 'block' : 'hidden'}`}
              control={
                <Checkbox
                  checked={acceptTermsAndConditions}
                  onClick={() => handleClickTermsAndConditionsCheckBox()}
                  name="termsAndConditions"
                  color="primary"
                />
              }
              label="Acepto los Términos y Condiciones de Uso"
            />
            <FormControlLabel
              className={`${isLastStep ? 'block' : 'hidden'}`}
              control={
                <Checkbox
                  checked={acceptPrivacyPolicy}
                  onClick={() => handleClickPolicyPrivacyCheckBox()}
                  name="privacyPolicyConditions"
                  color="primary"
                />
              }
              label="Acepto las Políticas de Privacidad"
            />
          </div>
        </div>
        }
        <div
          id="stepper_buttons_container"
          className="mx-auto mb-10 mt-5 flex w-full justify-around px-4 sm:w-2/3 lg:w-1/2"
        >
          <Button
            onClick={handlePrev}
            disabled={isFirstStep}
            size="sm"
            className={`${activeStep === 0 ? 'hidden' : 'block'}`}
          >
            Volver
          </Button>
          <Button
            onClick={handleNext}
            disabled={isLastStep}
            size="sm"
            className={`${isLastStep ? 'hidden' : 'block'}`}
          >
            Siguiente
          </Button>
          <Button
            size="sm"
            disabled={!acceptTermsAndConditions || !acceptPrivacyPolicy}
            className={`${isLastStep ? 'block' : 'hidden'}`}
            onClick={handleOutsideSubmit}
          >
            Publicar
          </Button>
        </div>
        <CreatePostPopUp loading={loading} success={success} setSuccess={setSuccess} error={error} />
        <TermsAndConditionsPopUp open={openTermsAndConditions} setOpen={setOpenTermsAndConditions} setAcceptTermsAndConditions={setAcceptTermsAndConditions} />              
        <PrivacyPolicyPopUp open={openPrivacyPolicy} setOpen={setOpenPrivacyPolicy} setAcceptPrivacyPolicy={setAcceptPrivacyPolicy} />    
      </div>
    </section>
  );
}
