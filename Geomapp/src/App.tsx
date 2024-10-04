import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-e5xuezl3ssg7dihj.us.auth0.com"
    clientId="k5dGR8lYeeOqWImHrqvzyFJYRplzUeJz"
    authorizationParams={{
      redirectUri: window.location.origin,
      audience: 'https://streetkicks.com',
    }}
    cacheLocation="localstorage" 
  >
    <App />
  </Auth0Provider>
);


