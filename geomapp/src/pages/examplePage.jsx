import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const ExamplePage = () => {
    const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [data, setData] = useState( '' );
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // Para rutas públicas no se necesita un token de autenticación
    const handleGet = async () => {
        try {
            const res = await axios.get('http://localhost:8000/example/');
            setResponse(res.data);
            console.log('getting data:', res.data);
        } catch (error) {
            setResponse(error.message);
        }
    };

    // Para mandar un POST a la API se necesita un token de autenticación
    const handlePost = async () => {
        if (!isAuthenticated) {
            loginWithRedirect();
            return;
        }
        try {
            const token = await getAccessTokenSilently();
            const res = await axios.post('http://localhost:8000/example/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setResponse(res.data);
            console.log('posting data:', res.data);
        } catch (error) {
            setResponse(error.message);
        }
    };

    return (
        <div>
            <h1>Example Page</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    onChange={handleInputChange}
                />
                <button onClick={handleGet}>Get Data</button>
                <button onClick={handlePost}>Post Data</button>
            </div>
            <div>
                <h2>Response</h2>
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
        </div>
    );
};

export default ExamplePage;