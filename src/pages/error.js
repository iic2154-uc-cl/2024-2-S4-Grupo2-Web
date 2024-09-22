import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

export default function error() {

    const { logout } = useAuth0();

    const destroyLocalstorage = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      };

    const logoutWithRedirectToLogin = () => {
        try {
            destroyLocalstorage();
            logout({
                logoutParams: { returnTo: process.env.NEXT_PUBLIC_LOGOUT_UNAUTHORIZED_REDIRECT_URL }
            });
        } catch (error) {
            console.error("Error during logout and redirect:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-3xl font-bold mb-4">Error de la aplicación</h1>
            <p className="mb-4">Lo sentimos, ha ocurrido un error. Por favor, vuelve a ingresar a la aplicación</p>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => logoutWithRedirectToLogin()} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Volver a ingresar
            </Button>
        </div>
    )
}