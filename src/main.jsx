import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirectUri: window.location.origin, 
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    }}
    cacheLocation="localstorage" 
  >
    <App />
  </Auth0Provider>
);

// NO TOCAR ESTE ARCHIVO

