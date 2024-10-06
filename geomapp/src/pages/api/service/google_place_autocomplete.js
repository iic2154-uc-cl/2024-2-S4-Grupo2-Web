/* eslint-disable consistent-return */

export default function useGooglePlaceAutoComplete() {
  const initAutoComplete = async (input, callback) => {
    const autoComplete = new window.google.maps.places.Autocomplete(input, {
      // limit to Chile for now
      componentRestrictions: { country: ['cl'] },
      fields: ['address_component', 'geometry', 'formatted_address'],
      types: ['address'],
    });
    autoComplete.addListener('place_changed', callback);
    return autoComplete;
  };

  const getFullAddress = async (autoComplete) => {
    const place = autoComplete.getPlace();

    let route = '';
    let streetNumber = '';
    let locality = '';
    let adminArea1Short = '';
    let adminArea1Long = '';
    let adminArea2Short = '';
    let adminArea2Long = '';
    let adminArea3Short = '';
    let adminArea3Long = '';
    let countryShort = '';
    let countryLong = '';
    let postalCode = '';

    // Get each component of the address from the place details,
    if (!place.address_components) return;
    // eslint-disable-next-line no-restricted-syntax
    for (const component of place.address_components) {
      const componentType = component.types[0];

      if (componentType === 'street_number') {
        streetNumber = component.long_name;
      }
      if (componentType === 'route') {
        route = component.long_name;
      }
      if (componentType === 'locality') {
        locality = component.long_name;
      }
      if (componentType === 'administrative_area_level_1') {
        adminArea1Short = component.short_name;
        adminArea1Long = component.long_name;
      }
      if (componentType === 'administrative_area_level_2') {
        adminArea2Short = component.short_name;
        adminArea2Long = component.long_name;
      }
      if (componentType === 'administrative_area_level_3') {
        adminArea3Short = component.short_name;
        adminArea3Long = component.long_name;
      }
      if (componentType === 'postal_code') {
        postalCode = component.long_name;
      }
      if (componentType === 'postal_code_suffix') {
        postalCode = `${postalCode}-${component.long_name}`;
      }
      if (componentType === 'country') {
        countryShort = component.short_name;
        countryLong = component.long_name;
      }
    }

    const resAddress = {
      route,
      streetNumber,
      locality,
      adminArea1Short,
      adminArea1Long,
      adminArea2Short,
      adminArea2Long,
      adminArea3Short,
      adminArea3Long,
      postalCode,
      countryShort,
      countryLong,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    return resAddress;
  };

  return {
    initAutoComplete,
    getFullAddress,
  };
}
