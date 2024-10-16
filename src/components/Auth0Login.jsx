import axios from "axios";

const Auth0Login = async (user, token) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}auth0/users/`,
            {
                auth0_id: user.sub.split('|')[1],
                email: user.email,
                username: user.nickname || user.name,
                telefono: null,
                direccion: null,
                comuna: null,
                preferencias: null,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('Usuario procesado en el backend:', response.data);
    } catch (error) {
        console.error('Error al crear el usuario en el backend:', error);
    }
}

export default Auth0Login;