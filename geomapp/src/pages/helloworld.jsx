import { useAuth0 } from '@auth0/auth0-react';

const HelloWorld = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div>
            <h1>Hello World</h1>
            <p>This is a public route.</p>
            {!isAuthenticated ? (
                <button onClick={loginWithRedirect}>Log in</button>
            ) : (
                <button onClick={() => logout({ returnTo: '/' })}>Log out</button>
            )}
        </div>
    );
};

export default HelloWorld;