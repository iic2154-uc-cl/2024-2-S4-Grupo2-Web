/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script';
import '../styles/globals.css';
import NavBar from '../components/Navbar';
import { Auth0Provider } from '@auth0/auth0-react';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

function App({ Component, pageProps }) {
  return (
    <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: typeof window !== 'undefined' ? window.location.origin : ''
    }}
  >
    <NavBar />
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker&callback=initMap&language=es`}
      strategy="beforeInteractive"
    />
    <Component {...pageProps} />
    <WhatsAppFloatingButton />
  </Auth0Provider>
  );
}

export default App;
