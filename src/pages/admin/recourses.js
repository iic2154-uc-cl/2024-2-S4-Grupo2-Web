/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable */

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Script from 'next/script';

const mokUsers = [
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
  {
    Attributes: {
      email: 'email@gmail.com',
      name: 'Pedro solis',
      phone_number: '+56912121212',
    },
  },
];

const mokAdmins = [
  {
    Attributes: {
      email: 'adminEmail@gmail.com',
      name: 'Admin Claudio',
      phone_number: '+56912121212',
    },
  },
];

const mokMods = [
  {
    Attributes: {
      email: 'moderator@gmail.com',
      name: 'Moderador Juan',
      phone_number: '+56912121212',
    },
  },
];

export default function userPosts() {
  const usersData = mokUsers;
  const adminsData = mokAdmins;
  const modsData = mokMods;
  const [currentView, setCurrentView] = useState('users');
  const [selectedUserList, setSelectedUserList] = useState('users');
  

  const getConfirmation = () => {
    var retVal = confirm('¿Estás seguro que deseas eliminar esta publicación?');
    if (retVal == true) {
      return true;
    } else {
      return false;
    }
  };

  const handleDeleteUser = async (email) => {
    if (getConfirmation()) {
      const session = await getSession();
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/delete?user_id=${email}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );
        const response = await res;
      } catch (error) {
        alert(
          `Ocurrió un error el eliminar el usuario. Por favor intenta de nuevo más tarde. Error: ${error}`,
        );
      }
      location.reload();
    }
  };

  const handleUsersClick = () => {
    setCurrentView('users');
    setSelectedUserList('users');
  };

  const handleUserListSelection = (userList) => {
    setSelectedUserList(userList);
  };

  let userList = [];
  if (selectedUserList === 'users') {
    userList = usersData;
  } else if (selectedUserList === 'admins') {
    userList = adminsData;
  } else if (selectedUserList === 'mods') {
    userList = modsData;
  }

  return (
    <>
      <div
        id="main_container"
        className="mx-auto h-full justify-center px-4 xl:container"
      >
        <div className="flex justify-center flex-col mt-5 mb-8">
          <div className="mb-9 flex justify-center">
            <button
              className={`mr-2 rounded-full px-4 py-2 font-bold ${
                selectedUserList === 'users'
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-400 bg-white text-gray-700'
              } ${
                selectedUserList === 'users' ? 'hover:bg-blue-700' : 'hover:bg-gray-200'
              } ${
                selectedUserList === 'users'
                  ? 'focus:outline-blue-500 focus:ring-2 focus:ring-gray-500'
                  : ''
              }`}
              type="button"
              onClick={() => handleUserListSelection('users')}
            >
              Regulares
            </button>
            <button
              className={`mr-2 rounded-full px-4 py-2 font-bold ${
                selectedUserList === 'admins'
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-400 bg-white text-gray-700'
              } ${
                selectedUserList === 'admins'
                  ? 'hover:bg-blue-700'
                  : 'hover:bg-gray-200'
              } ${
                selectedUserList === 'admins'
                  ? 'focus:outline-blue-500 focus:ring-2 focus:ring-gray-500'
                  : ''
              }`}
              type="button"
              onClick={() => handleUserListSelection('admins')}
            >
              Administradores
            </button>
            <button
              className={`rounded-full px-4 py-2 font-bold ${
                selectedUserList === 'mods'
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-400 bg-white text-gray-700'
              } ${
                selectedUserList === 'mods' ? 'hover:bg-blue-700' : 'hover:bg-gray-200'
              } ${
                selectedUserList === 'mods'
                  ? 'focus:outline-blue-500 focus:ring-2 focus:ring-gray-500'
                  : ''
              }`}
              type="button"
              onClick={() => handleUserListSelection('mods')}
            >
              Moderadores
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            <h2 className="mb-6 text-xl font-bold text-gray-700">Lista de Usuarios</h2>
            <div className="h-full justify-center overflow-y-auto">
              <ul className="grid grid-cols-3 gap-4">
                {userList.map((user, index) => (
                  <li key={index} className="border p-4">
                    <div className="mb-2 flex justify-between">
                      <div>
                        <span className="mr-2 font-bold">Nombre:</span>
                        <span>{user.Attributes['name']}</span>
                      </div>
                      <DeleteIcon
                        onClick={() => handleDeleteUser(user.Attributes['email'])}
                        style={{ cursor: 'pointer', height: 'auto' }}
                        className="hover:text-gray-500"
                      />
                    </div>
                    <div className="mb-2 flex items-center">
                      <span className="mr-2 font-bold">Email:</span>
                      <span>{user.Attributes['email']}</span>
                    </div>
                    <div className="mb-2 flex items-center">
                      <span className="mr-2 font-bold">Teléfono:</span>
                      <span>{user.Attributes['phone_number']}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

