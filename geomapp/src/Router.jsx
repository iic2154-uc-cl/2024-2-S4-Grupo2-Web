import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HelloWorld from './pages/helloworld.jsx';
import Auth0ProtectedPage from './pages/auth0.jsx';
import ExamplePage from './pages/examplePage.jsx';

function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/auth0" element={<Auth0ProtectedPage />} />
        <Route path="/example" element={<ExamplePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;