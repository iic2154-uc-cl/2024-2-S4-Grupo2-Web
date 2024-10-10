import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';


export default function PrivacyPolicyPopUp(props) {
  const router = useRouter();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleAccept = () => {
    props.setAcceptPrivacyPolicy(true)
    handleClose();
  };

  return (
    <div id="terms_and_conditions_popUp_container">
      <Dialog open={props.open} onClose={handleClose} scroll="paper" maxWidth="md">
        <DialogTitle className='text-center'>
          POLÍTICA DE PRIVACIDAD
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
          FUNDAMENTOS<br/>

          Georent.cl utiliza los contenidos entregados por sus Usuarios para el poblamiento de sus diferentes plataformas web y de mapas de navegación, para facilitar el manejo y acceso a la información. Para esto, nos basamos en los siguientes fundamentos para proteger su privacidad.<br/>

          <br/>
          1. Transparencia<br/>

          Damos información precisa y relevante sobre cómo utilizamos la información que entregan nuestros Usuarios.<br/>

          <br/>
          2. Comité Editorial<br/>

          Los datos de nuestros Oferentes serán analizados y verificados por un comité editorial antes de ser publicados en la plataforma, a fin de disponer en ella sólo de contenidos propios del quehacer de Georent.cl.<br/>

          <br/>
          3. Protección<br/>

          Georent.cl no comercializa la información personal de nuestros Oferentes. Utilizamos los estándares más altos de seguridad para proteger sus datos. Cabe reiterar que al momento de contactar a una publicación, el Oferente entrega voluntariamente su información a los potenciales clientes que requieran su propiedad o servicio.<br/>

          <br/>
          4. Temporalidad<br/>

          Georent.cl solamente almacenará la información de los contenidos publicados por los Oferentes, mientras su almacenamiento tenga fundamento legal y no hayan caducado. Se entenderá que los datos han caducado cuando han perdido actualidad por disposición de la ley del territorio donde fueron entregados, o por el cumplimiento de una condición de expiración del plazo señalado para su vigencia, o por el cambio de los hechos o circunstancias que consignan.<br/>

          <br/>
          Registro<br/>

          Al registrarse un Oferente en Georent.cl se crea un registro de usuario que permitirá operar en nuestra plataforma web para subir contenido para ser publicado previa verificación del comité editorial. Con esta información buscamos ofrecer una experiencia adecuada y adaptada a las necesidades de nuestros Usuarios, de modo que nuestros servicios sean lo más útiles y beneficiosos posible.<br/>

          Georent.cl se reserva el derecho de suspender los servicios o inhabilitar las cuentas de quienes provean información falsa o inexacta, junto con no cumplir con la Declaración de Privacidad o con los Términos y Condiciones de la plataforma web.<br/>

          <br/>
          Derechos del Usuario<br/>

          Los Oferentes registrados como Usuarios de Georent.cl tendrán derecho a:<br/>

          Acceder a su información personal.<br/>
          Enmendar su información personal que no sea correcta.<br/>
          Tener confidencialidad sobre su información personal.<br/>
          Solicitar que no se le envíe publicidad, ofertas y promociones.<br/>
          Solicitar que no se use su información personal para varios fines distintos al uso de las plataformas de contenidos de Georent.cl.<br/>
          Hacer reclamos ante la autoridad competente sobre la manera en que tratamos su información personal.<br/>

          Si por obligación legal o por cumplimiento de algún término de la política de privacidad tengamos que guardar alguna parte de la información personal de nuestros Usuarios cuya eliminación haya sido solicitada, lo haremos en cuanto los requisitos en cuestión hayan sido cumplidos<br/>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Volver
          </Button>
          <Button onClick={handleAccept} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
