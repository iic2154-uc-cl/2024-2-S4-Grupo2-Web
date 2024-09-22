import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  useEffect(() => {
    // Si no hay usuario autenticado, redirigir a la página de login
    if (!isAuthenticated) {
      loginWithRedirect({
        redirectUri: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL,
      });
    } else {
      // Si hay usuario autenticado, redirigir a la página de inicio
      router.push('/post/CreateProperty');
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-700"></h1>
    </div>
  );
}