import { useAuth0 } from "@auth0/auth0-react";
import { get } from "http";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from 'react';

const adminRoles = ["Administrador", "Moderador"];
const authorizedPaths = ['/unauthorized', '/error', '/login'];


function PrivateRoute(props) {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
  const router = useRouter();

  useLayoutEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        editUserPhoneNumberInLocalStorage();
        const userData = await fetchUserInfo(token);
        editUserTypesInLocalStorage(userData.types);

      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Ocurrió un error al obtener el usuario', error);
      window.alert(
        'Ocurrió un error al obtener el usuario. Por favor, intenta nuevamente más tarde.'
      );
    }
  };

  const editUserPhoneNumberInLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
     if (user.user_metadata.phone_number) {
       user.phone_number = user.user_metadata.phone_number;
       localStorage.setItem('user', JSON.stringify(user));
     }
   };

   const editUserTypesInLocalStorage = (userTypes) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (userTypes.length === 0) {
      userTypes.push("Partner");
    }
    user.types = userTypes;
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      checkAdminPaths(url);
    };

    handleRouteChange(router.asPath);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  const checkAdminPaths = (url) => {
    const userTypes = getUserTypes();
    if (url.includes('/admin/')) {
      if (!userTypes) {
        console.log('user is not admin');
        router.push("/user/profile");
        return null;
      }
      const userIsAdmin = userTypes.some(role => adminRoles.includes(role));
      if (!userIsAdmin) {
        console.log('user is not admin');
        router.push("/user/profile");
        return null;
        }
    }
  }

  const getUserTypes = () => {
    try {
      return JSON.parse(localStorage.getItem('user')).types;
    } catch (error) {
      return null;
    }
  };

  if (authorizedPaths.includes(router.pathname)) {
    return props.children;
  }

  if (isLoading) {
    return React.createElement('div', null, 'Loading...');
  }

  if (!isAuthenticated) {
    router.push("/unauthorized");
    return null;
  }
  
  return props.children;
}

export default PrivateRoute;
