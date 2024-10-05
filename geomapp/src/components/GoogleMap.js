// components/GoogleMap.js
import  { useEffect } from 'react';
// importamos useGooglePlaceAutoComplete
import useGooglePlaceAutoComplete from "../pages/api/service/google_place_autocomplete.js"

let currentMarker = null; // Referencia al marcador actual

export default function GoogleMap(props) {
  const latInitValue = props.userLocation.lat ? Number(props.userLocation.lat) : Number(process.env.NEXT_PUBLIC_LAT);
  const lngInitValue = props.userLocation.lng ? Number(props.userLocation.lng) : Number(process.env.NEXT_PUBLIC_LNG);
  let zoomInt = Number(process.env.NEXT_PUBLIC_ZOOM);

  if (props.userLocation.lng && props.userLocation.lat) {
    zoomInt = 18;
  };

  let mapInstance = null;

  useEffect(() => {
    async function initMap() {
    if (!window.google) return;
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(document.getElementById("map"), {
        center: { lat: latInitValue, lng: lngInitValue },
        zoom: zoomInt,
        streetViewControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                stylers: [{ visibility: "off" }]
              }
          ]
      });

      mapInstance = map;

      //Default marker
      const latLng = new google.maps.LatLng(latInitValue, lngInitValue);
      addMarker(latLng, mapInstance);
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && (results[1] || results[0])) {
          setAddress(results);
          }
      });

    //@ts-ignore
    const clickListener = google.maps.event.addListener(mapInstance, "click", async (event) => {
        addMarker(event.latLng, mapInstance);
        // Actualizar el input del autocompletado con la dirección del punto seleccionado
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: event.latLng }, (results, status) => {
            if (status === "OK" && (results[1] || results[0])) {
            setAddress(results);
            }
        });
        });

        return () => {
        google.maps.event.removeListener(clickListener);
        };
    }
    initMap();
  }, [props.userLocation]);

  function setAddress(geocoderResults) {
    if(geocoderResults.length > 2) {
        props.addressRef.current.value = geocoderResults[1].formatted_address;
    } else {
        const latitude = geocoderResults[0].geometry.location.lat();
        const longitude = geocoderResults[0].geometry.location.lng();
        props.addressRef.current.value = `Punto Geolocalizado: ${latitude}, ${longitude}`;
    }
    props.setValue('address', props.addressRef.current.value);
  };

  function addMarker(location, map) {
    // Si hay un marcador actual, lo elimina
    if (currentMarker) {
      currentMarker.setMap(null);
    }
    
    currentMarker = new google.maps.Marker({
        position: location,
        map: map,
    });
    props.setLat(location.lat());
    props.setLng(location.lng());
  };
  
  const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
  let autoComplete = '';
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
    const formattedAddress = getFormattedAddress(addressObj);
    props.addressRef.current.value = formattedAddress;
    props.setValue('address', formattedAddress);
    props.setLat(addressObj.latitude);
    props.setLng(addressObj.longitude);
    // Mover el marcador y el mapa al lugar seleccionado
    const location = new google.maps.LatLng(addressObj.latitude, addressObj.longitude);
    addMarker(location, mapInstance);

    mapInstance.setZoom(15);
    mapInstance.setCenter(location);
  };

  useEffect(() => {
    async function loadGoogleMaps() {
      // initialize the Google Place Autocomplete widget and bind it to an input element.
      // eslint-disable-next-line
      autoComplete = await googleAutoCompleteSvc.initAutoComplete(
        props.addressRef.current,
        handleAddressSelect
      );
      
      if (props.defaultValue) {
        props.addressRef.current.value = props.defaultValue;
      }
    }
    loadGoogleMaps();
  }, []);

  return (
    <div>
        <div id="map" className="w-full h-96"/>
    </div>
  
    )
}

