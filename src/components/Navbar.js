/* eslint-disable func-names */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useAuth0 } from "@auth0/auth0-react";
import PrivateRoute from '../PrivateRoute';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LoadingSpinnerIcon from './TailwinSvgIcons/LoadingSpinnerIcon';


const removeLineBreaks = (str) => {
  // innerText str comes with line breaks, this function removes them
  // in order to match the value at setPostType
  return str.replace(/(\r\n|\n|\r)/gm, '');
};

function NavBar() {
  const [navbarOptions, setNavbarOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [userTypes, setUserTypes] = useState([]);

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const router = useRouter();

  useEffect(() => {
    setNavbarOptionsByUserType();
  }, [userTypes]);

  useEffect(() => {
    const fetchUserTypes = async () => {
      let types = null;
      while (!types) {
        types = getUserTypes();
        if (!types) {
          // Esperar 1000 milisegundos antes de volver a verificar
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      setUserTypes(types);
      setLoadingData(false);
    };

    fetchUserTypes();
  }, []);


  const getUserName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
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

  const getUserTypes = () => {
    try {
      return JSON.parse(localStorage.getItem('user')).types;
    } catch (error) {
      return null;
    }
  };

  const userMenuOptions = isAuthenticated ? ['Mi Perfil', 'Cerrar Sesión'] : ['Iniciar sesión'];
  const userPartnerOptions = ['Mis Publicaciones', 'Publicar', 'Cerca de mí'];
  const userModeratorOptions = getUserTypes() ? ['Reportes', 'Publicaciones', 'Cerca de mí'] : [];
  const userAdminOptions = getUserTypes() ? ['Reportes', 'Publicaciones', 'Cerca de mí'] : [];
  const userSuperAdminOptions = [
    'Crear Moderador',
    'Crear Administrador',
    'Recursos',
    'Reportes',
  ];

  const userName = isAuthenticated ? getUserName() : '';

  const setNavbarOptionsByUserType = () => {
    const userTypes = getUserTypes();
    if (!userTypes) {
      setNavbarOptions([]);
    } else if (userTypes?.includes('Administrador')) {
      setNavbarOptions(userAdminOptions);
    } else if (userTypes?.includes('SUPER-ADMINISTRATOR')) {
      setNavbarOptions(userSuperAdminOptions);
    } else if (userTypes?.includes('Moderador')) {
      setNavbarOptions(userModeratorOptions);
    } else {
      setNavbarOptions(userPartnerOptions);
    }
  };

  const handleNavMenuRedirect = (item) => {
    if (item === 'Mis Publicaciones') {
      router.push('/post/userPosts');
    } else if (item === 'Publicar') {
      router.push('/post/CreateProperty');
    } else if (item === 'Crear Moderador') {
      router.push('/signupMod');
    } else if (item === 'Crear Administrador') {
      router.push('/signupAdmin');
    } else if (item === 'Recursos') {
      router.push('/admin/recourses');
    } else if (item === 'Reportes') {
      router.push('/admin/reportedPosts');
    } else if (item === 'Publicaciones') {
      router.push('/admin/postsReview');
    } else if (item === 'Cerca de mí') {
      router.push('/post/NearPosts');
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const destroyLocalstorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  const handleUserMenuRedirect = (item) => {
    if (item === 'Mi Perfil') {
      router.push('/user/profile');
    } else if (item === 'Cerrar Sesión') {
      destroyLocalstorage();
      logout({
        logoutParams: { returnTo: process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URL } })
    } else if (item === 'Iniciar sesión') {
      loginWithRedirect({
        redirectUri: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL,
      });
    }
  };

  const handleNavBarButtonSelection = (e) => {
    const navMenuItemSelected = removeLineBreaks(e.target.innerText);
    handleNavMenuRedirect(navMenuItemSelected);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    const userMenuItemSelected = removeLineBreaks(e.target.innerText);
    handleUserMenuRedirect(userMenuItemSelected);
    setAnchorElUser(null);
  };

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };

  const drawerList = (
    <List>
      {navbarOptions.map((option) => (
        <ListItem key={option} disablePadding>
          <ListItemButton onClick={() => {
            handleCloseNavMenu();
            handleNavMenuRedirect(option);
          }}>
            <ListItemText primary={option} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const [userDrawerOpen, setUserDrawerOpen] = React.useState(false);

  const handleOpenUserDrawer = () => {
    setUserDrawerOpen(true);
  };

  const handleCloseUserDrawer = () => {
    setUserDrawerOpen(false);
  };

  const drawerListUser = (
    <List>
      {userMenuOptions.map((option) => (
        <ListItem key={option} disablePadding>
          <ListItemButton onClick={() => {
            handleCloseUserDrawer();
            handleUserMenuRedirect(option);
          }}>
            <ListItemText primary={option} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <PrivateRoute>
      <AppBar position="static" sx={{ backgroundColor: 'white' }} enableColorOnDark>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Box
              id="botones_navbar"
              sx={{ flexGrow: 0, display: { xs: 'none', sm: 'none', md: 'flex' } }}
            >
              <div className="mr-0 flex sm:mr-0 md:mr-10 lg:mr-10">
                <Image
                  src="/georent_html/img/Logo270.png"
                  alt="Logo"
                  width={96} // Esto es un tamaño base. Ajusta según lo necesites.
                  height={96} // Esto es un tamaño base. Ajusta según lo necesites.
                  className="w-24" // Ajusta estos valores según lo necesites.
                />
              </div>
            </Box>
            <Box
              id="menu_dropdown"
              sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'none' } }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
                disabled={!isAuthenticated}
              >
                <MenuIcon
                  sx={{
                    fontSize: {
                      xs: 40,
                      sm: 55,
                      md: 50,
                      lg: 40,
                      xl: 30,
                    },
                    color: 'black',
                  }}
                />
              </IconButton>
              <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={handleCloseNavMenu}
                onOpen={handleOpenNavMenu}
                ModalProps={{
                  BackdropProps: {
                    invisible: true
                  }
                }}
              >
                {drawerList}
              </SwipeableDrawer>
            </Box>
            <Box
              id="logo_image_center"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', lg: 'none' } }}
            >
              <div className="flex">
                <Image
                  src="/georent_html/img/Logo270.png"
                  alt="Logo"
                  width={192} // Esto es un tamaño base. Ajusta según lo necesites.
                  height={192} // Esto es un tamaño base. Ajusta según lo necesites.
                  className="w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48" // Ajusta estos valores según lo necesites.
                />
              </div>
            </Box>
            <Box
              id="botones_navbar"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex' }, gap: 3 }}
            >
              {!loadingData ? (
              navbarOptions.map((option) => (
                <Button
                  key={option}
                  onClick={handleNavBarButtonSelection}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    textTransform: 'none',
                    fontSize: 'large',
                  }}
                >
                  {option}
                </Button>
              ))
              ) : (
                <LoadingSpinnerIcon className="h-6 w-6"/>
              )}
            </Box>
            <Box
              id="user_info"
              sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', lg: 'flex' } }}
            >
              <Tooltip title="Open settings">
                <IconButton
                disabled={!isAuthenticated}
                  onClick={handleOpenUserMenu}
                  size="small"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0,
                    mt: 1,
                  }}
                >
                  <AccountCircle
                    sx={{
                      fontSize: {
                        xs: 40,
                        sm: 55,
                        md: 50,
                        lg: 40,
                        xl: 30,
                      },
                      color: 'black',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      display: { xs: 'none', sm: 'none', md: 'flex' },
                      whiteSpace: 'nowrap',
                      mt: '-1px', // Aquí estamos aplicando un margen negativo
                      color: 'black',
                      fontSize: {
                        xs: 50,
                        sm: 5,
                        md: 10,
                        lg: 10,
                        xl: 10,
                      },
                    }}
                  >
                    {userName}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
              sx={{ mt: '45px', width: 230 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                textAlign="center"
                sx={{
                  color: 'black',
                  mb: 1,
                  display: { xs: 'block', md: 'none' },
                  fontSize: {
                    xs: 10,
                    sm: 10,
                    md: 10,
                    lg: 10,
                    xl: 10,
                  },
                }}
              >
                {userName}
              </Typography>
              <Divider sx={{ display: { xs: 'flex', md: 'none' } }} />

              {userMenuOptions.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" noWrap>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
              <SwipeableDrawer
              anchor="right"
              open={userDrawerOpen}
              onClose={handleCloseUserDrawer}
              onOpen={handleOpenUserDrawer}
              ModalProps={{
                BackdropProps: {
                  invisible: true
                }
              }}
            >
              {drawerListUser}
            </SwipeableDrawer>
            </Box>
            <Box
              id="settings"
              sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none', lg: 'none' } }}
            >
              <Tooltip title="Open settings">
                <IconButton
                  disabled={!isAuthenticated}
                  onClick={handleOpenUserDrawer}
                  size="small"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0,
                  }}
                >
                  <SettingsIcon
                    sx={{
                      fontSize: {
                        xs: 40,
                        sm: 55,
                        md: 50,
                        lg: 40,
                        xl: 30,
                      },
                      color: 'black',
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </PrivateRoute>
  );
}

export default NavBar;
