import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HelloWorld from './pages/helloworld.jsx';
import Auth0ProtectedPage from './pages/auth0.jsx';
import ExamplePage from './pages/examplePage.jsx';
import Servicios from './pages/servicios.jsx';
import Mapa from './pages/mapa.jsx';
import Publicaciones from './pages/users/publicaciones.jsx';
import Perfil from './pages/users/perfil.jsx';

function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/auth0" element={<Auth0ProtectedPage />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/mapa-navegacion" element={<Mapa />}></Route>
        <Route path="/servicios" element={<Servicios />}></Route>
        <Route path="/inicio" element={<HelloWorld />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/mi-perfil" element={<Perfil />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;