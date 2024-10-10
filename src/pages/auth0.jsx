import { useAuth0 } from '@auth0/auth0-react';

const Auth0ProtectedPage = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated ? (
                <div>
                <h1>Protected Route. Yo have to login</h1>
                <button onClick={loginWithRedirect}>Log in</button>
                </div>
            ) : (
                <div>
                <p>Private route: you have access</p>
                <button onClick={() => logout({ returnTo: window.location.origin + '/'  })}>Log out</button>
                </div>
            )}
        </div>
    );
};

export default Auth0ProtectedPage;