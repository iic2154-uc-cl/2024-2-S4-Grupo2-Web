import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain='dev-7w1no2zl1opt24if.us.auth0.com'
    clientId='QrElcRF9AI2H6dRBwCChbc04JvtKygJo'
    authorizationParams={{
      redirectUri: window.location.origin,
      audience: 'https://geomap/',
    }}
    cacheLocation="localstorage" 
  >
    <App />
  </Auth0Provider>
);

