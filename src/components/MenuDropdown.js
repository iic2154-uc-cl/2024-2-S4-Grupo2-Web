/* eslint-disable func-names */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { set } from 'react-hook-form';

function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );
  return JSON.parse(jsonPayload);
}

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = React.useState({});
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  React.useEffect(() => {
    try {
      const user = getUser();
      setUserData(user);
    } catch (error) {
      setUserData({});
    }
  }, []);


  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {userData?.type === 'SUPER ADMINISTRATOR' ||
        userData?.type === 'ADMINISTRATOR' ? (
          <MenuItem onClick={handleClose}>
            <Link href="/admin/reportedPosts">Publicaciones Reportadas</Link>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link href="/post/userPosts">Mis Publicaciones</Link>
          </MenuItem>
        )}
        {userData?.type === 'SUPER ADMINISTRATOR' ||
        userData?.type === 'ADMINISTRATOR' ? (
          <MenuItem onClick={handleClose}>
            <Link href="/admin/recourses">Panel de Administrador</Link>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link href="/post/CreateProperty">Crear publicación</Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default BasicMenu;
