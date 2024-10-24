import { useAuth0 } from '@auth0/auth0-react';
import '../styles/helloworld.css';  // Asegúrate de que esta ruta esté correcta
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/navbar.css'; // Asegúrate de que la ruta del CSS es correcta
import '../styles/footer.css';
import { Link, useNavigate } from 'react-router-dom';
import publicar from '../assets/publicar.jpg'
import buscar from '../assets/buscar2.jpg'
import servicios from '../assets/servicios.jpg'

const HelloWorld = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    return (
        <div id="hello-world-container">
            <Navbar />
            <div className="background-image-container">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="titulo">GeoMapp</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
      
            <br></br>
                <br></br>
                <br>
                </br>
                <br></br>
               
                
           
                    <br></br>
                    <br></br>
              
                    <br></br>
                    <h1 style={{ textAlign: 'right', marginRight: '20px', fontSize: '50px' }}>Conéctate con tu entorno donde sea que vayas.</h1>
                    <br></br>
                  
                    
                
               
            </div>
            <br></br>
            <br></br>
            <br></br>
            
            <br></br>
            <br></br>
            


            <div className="image-container">
                <div className="image-card">
                    <img src={buscar}></img>
                    <button className="image-button" onClick={() => navigate('/mapa-navegacion')}>Buscar</button>
                </div>
                <div className="image-card">
                    <img src={publicar}></img>
                    <button className="image-button" onClick={() => navigate('/publicar')}>Publicar</button>
                   
                </div>
                <div className="image-card">
                    <img src={servicios}></img>
                    <button className="image-button" onClick={() => navigate('/servicios')}>Servicios</button>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="image-card">  
                {!isAuthenticated ? (
                    <button className="image-button" onClick={loginWithRedirect}>Iniciar sesión</button>
                ) : (
                    <button className="button" onClick={() => logout({ returnTo: window.location.origin + '/' })}>Cerrar sesión</button>
                )}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Footer />
        </div>
    );
};

export default HelloWorld;
