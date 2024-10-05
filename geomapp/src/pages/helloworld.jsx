import { useAuth0 } from '@auth0/auth0-react';
import '../styles/helloworld.css';  // Asegúrate de que esta ruta esté correcta
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelloWorld = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div id="hello-world-container">
            <Navbar />
            <div className="content">  
                <h1>GeoMapp by Technoffice</h1>
                <p>PÁGINA DE INICIO PARA TOOS LOS USUARIOS yeiiii</p>
                {!isAuthenticated ? (
                    <button onClick={loginWithRedirect}>Log in</button>
                ) : (
                    <button onClick={() => logout({ returnTo: '/' })}>Log out</button>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HelloWorld;
