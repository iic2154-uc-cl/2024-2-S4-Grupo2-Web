/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'react-hook-form';


function DeletePostButton({ publication }) {
  
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const backButtonClick = () => {
    setOpen(false);
    router.reload();
  };
  
  const getAccessToken = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      return accessToken;
    } catch (error) {
      console.error('Ocurrió un error al obtener accessToken', error);
      window.alert(
        'Ocurrió un error al obtener accessToken. Por favor, intenta nuevamente más tarde.'
      );
    }
  };

  const deletePost = async () => {
    const accessToken = getAccessToken();
    if (publication.id) {
      setLoading(true);
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${publication.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          post_id: publication.id,
        }),
      });
        setSuccess(true);
      } catch (error) {
        setSuccess(false);
        alert('Error al eliminar la publicación.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('ID de publicación no encontrado.');
    }
  };

  const handleDelete = () => {
    deletePost();
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Eliminar publicación">
        <IconButton aria-label="delete" size="large" onClick={handleClickOpen}>
          <DeleteIcon
            style={{ cursor: 'pointer', height: 'auto' }}
            className="hover:text-gray-500"
            sx={{
              fontSize: {
                xs: 35,
                sm: 35,
                md: 30,
                lg: 30,
                xl: 20,
              },
              color: 'black',
            }}
          />
        </IconButton>
      </Tooltip>
      {loading ? (
        <Dialog open={loading}>
          <DialogTitle>
            {"Eliminando publicación"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className='flex items-center justify-center gap-5'>
                <CircularProgress />
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : success ? (
        <Dialog open={success}>
          <DialogTitle>
            {"Publicación eliminada"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className='flex items-center justify-center gap-5'>
                <p>Tu publicación ha sido eliminada exitosamente!</p>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={backButtonClick} color="primary">
              Volver
            </Button>
          </DialogActions>
        </Dialog>

      ) : (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar Publicación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas eliminar esta publicación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      )}
    </div>
  );

}

export default DeletePostButton;
