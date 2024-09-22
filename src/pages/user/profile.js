/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import { useAuth0 } from "@auth0/auth0-react";

function Profile(props) {
  const router = useRouter();
  const { isAuthenticated } = useAuth0();

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  const getUserName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = localStorage.getItem('accessToken');
    try {
      if (user.given_name)
        return user.given_name;
      else if (user.name)
        return user.name;
      else if (user.nickname)
        return user.nickname;
      else return '';
    } catch (error) {
      return '';
    }
  };

  const userName = isAuthenticated ? getUserName() : '';
  const userEmail = isAuthenticated ? getUser().email : '';
  const userPhone = isAuthenticated ? getUser().phone_number : '';

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
      <div className="z-5 shadow-3xl relative flex flex-col w-full p-6 max-w-md md:max-w-lg rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center mb-5">
          <h4 className="text-xl font-semibold text-black text-center">Información de Usuario</h4>
        </div>
        <div className="grid w-full gap-4 text-black md:grid-cols-2">
          <div className="mb-3 flex flex-col items-center">
            <p className="text-sm text-center">Nombre</p>
            <p className="text-base font-medium">{userName}</p>
          </div>
          <div className="mb-3 flex flex-col items-center">
            <p className="text-sm text-center">Email</p>
            <p className="text-base font-medium">{userEmail}</p>
          </div>
          {userPhone && (
          <div className="mb-3 flex flex-col items-center">
            <p className="text-sm text-center">Teléfono</p>
            <p className="text-base font-medium">{userPhone}</p>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default Profile;
