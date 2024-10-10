import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

export default function EditPostPopUp(props) {
  const router = useRouter();

  const handleClose = () => {
      router.push('/post/userPosts');
  };
  
  return (
    <div id="popUp_dialog_container" className='z-50'>
      <Dialog open={props.loading || props.success || props.error } onClose={handleClose}>
        <DialogTitle>
          {props.loading ? "Guardando los cambios" : props.success ? "¡Publicación editada!" : "Error al editar publicación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.loading && !props.error ? (
              <div className='flex items-center justify-center gap-5'>
                <CircularProgress />
              </div>
            ) : props.success ? (
              "Tu publicación ha sido editada exitosamente!"
            ) : (
              "Ocurrió un error al editar la publicación. Por favor, intenta nuevamente."
            )}
          </DialogContentText>
        </DialogContent>
        {(!props.loading || props.error || props.success) && (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Volver
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}  