import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain='dev-cry4u1cfzw5tvn48.us.auth0.com'
    clientId='emBP1HbVJ1ltKKluxpiVA0wye8USrA4Z'
    authorizationParams={{
      redirectUri: window.location.origin,
      audience: 'https://geomapp-auth0.com',
    }}
    cacheLocation="localstorage" 
  >
    <App />
  </Auth0Provider>
);

