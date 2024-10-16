import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';


export default function TermsAndConditionsPopUp(props) {
  const router = useRouter();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleAccept = () => {
    props.setAcceptTermsAndConditions(true)
    handleClose();
  };

  //checqueamos si porps.open existe, si no existe, retornamos false
  const open = props.open || false;

  return (
    <div id="terms_and_conditions_popUp_container" className='z-50'>
      <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="md">
        <DialogTitle className='text-center'>
        TÉRMINOS Y CONDICIONES DE USO DE GEORENT.CL
        CONDICIONES GENERALES 
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText className='text-justify'>
          GEORENT División de negocios de Tecnoffice Chile SPA, sociedad debidamente constituida y existente bajo las leyes de Chile (en adelante la “Sociedad” o “Georent.cl”), es titular de los dominios Georent.cl y otros dominios nacionales que de su nombre deriven, (en adelante el “Sitio”) en el cual se accede a una plataforma Web cuyo objetivo es proporcionar a usuarios debidamente registrados, en adelante Oferentes, ingresar contenidos para ofrecer un bien o servicio; y por otro lado permitir a usuarios, sin necesariamente estar registrados, en adelante Clientes, buscar contenido ingresado por los oferentes, para uso del bien o servicio.<br/><br/>
A continuación, se describen los “Términos y Condiciones” aplicables al uso del Sitio. Estos Términos y Condiciones constituyen las normas que regulan el uso del Sitio para los Oferentes. Cualquier Oferente que desee acceder al Sitio para ingresar contenido con el objetivo de que estos puedan ser ofrecidos usando la plataforma Georent podrá hacerlo estando registrado y ateniéndose a los Términos y Condiciones, junto con todas las demás políticas y principios que rigen al Sitio y que pudieran ser incorporados a los presentes por referencia.<br/><br/>
Al usar los Servicios de GeoRent, el Usuario declara ser mayor de edad y otorga su consentimiento libre, previo y expreso en los Términos y Condiciones que aquí se detallan.<br/><br/>
CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES, LOS CUALES TIENEN UN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR EL SITIO Y/O LOS SERVICIOS.<br/><br/>
1. Objetivo del Sitio<br/><br/>
El objetivo de Georent.cl es otorgar a sus usuarios registrados, Oferentes, la posibilidad de ingresar contenido para ofrecer un bien o servicio a través de internet mediante geolocalización usando la plataforma Georent.cl, y por otro lado a usuarios no registrados, Clientes, la posibilidad de encontrar un bien o servicio que esté publicado en Georent.cl según la geolocalización en que se encuentre en el momento de la búsqueda en los mapas de geo localización.<br/><br/>
2. Extensión de estos Términos y Condiciones<br/><br/>
Los presentes Términos y Condiciones sólo serán aplicables a los Servicios y Contenidos ofrecidos directamente en el Sitio y no a aquellos a los que los usuarios puedan acceder a través de un hipervínculo (link) y/o cualquier otra herramienta de navegación ubicada en el Sitio que los dirija a otro sitio Web, por lo que Georent.cl no se hace responsable por los contenidos y políticas de privacidad de dichos sitios Web, los cuales se rigen por sus propios Términos y Condiciones.<br/><br/>
Estos Términos y Condiciones son complementados por la política de privacidad de Georent.cl, que establece el uso de los datos personales de los usuarios registrados y oferentes, que pueden hacer uso de Georent.cl.<br/><br/>
Los Términos y Condiciones también regulan las responsabilidades derivadas del uso malicioso de sus textos, gráficos, dibujos, diseños, códigos, software, fotografías, música, vídeos, sonidos, imágenes, elementos multimedia, expresiones e informaciones, así como cualquier otra creación (en adelante los “Contenidos”).<br/><br/>
3. Modificaciones a los Términos y Condiciones<br/><br/>
Georent.cl podrá modificar los Términos y Condiciones en cualquier momento haciendo públicas las modificaciones y los nuevos términos y condiciones, sin necesidad de notificar previamente a sus usuarios. Los nuevos Términos y Condiciones entrarán en vigor a los cinco (5) días corridos de su publicación. Dentro de los tres (3) días corridos siguientes a la publicación de las modificaciones introducidas, el oferente podrá enviar un correo electrónico a georent@tecnoffice.cl, señalando que no acepta las mismas; en ese caso quedará disuelto el vínculo contractual y será inhabilitado siempre que no tenga obligaciones pendientes. Vencido este plazo, si el oferente no ha presentado objeción alguna, se considerará que acepta los nuevos términos.<br/><br/>
4. Jurisdicción y Ley Aplicable<br/><br/>
Estos Términos y Condiciones están regidos por las leyes vigentes en Chile. Mediante este documento, usted, como oferente, da su consentimiento a la jurisdicción y competencia territorial exclusiva de las cortes establecidas en Chile en todos los conflictos que se presenten a partir de, o en relación con el acceso o la utilización del Sitio.<br/><br/>
5. Capacidad<br/><br/>
El oferente que se registre como Empresa, deberá tener poderes suficientes para ofrecer a nombre de tal entidad y de obligar a la misma respecto de estos Términos y Condiciones. Para efectos de estos Términos y Condiciones se entenderá como Empresa toda aquella persona jurídica válida y legalmente existente dentro del territorio de la República de Chile donde fue constituida.<br/><br/>
6. Datos de Contacto<br/><br/>
Para más información de Georent.cl y/o sus servicios, escribir a georent@tecnoffice.cl.<br/><br/>
7. Derechos Reservados<br/><br/>
Georent.cl prohíbe expresamente modificar, copiar, reutilizar, reproducir, explotar, transmitir, comunicar públicamente, hacer segundas o posteriores publicaciones, cargar archivos, usar, tratar o distribuir de cualquier forma la totalidad o parte de los Contenidos del Sitio para propósitos públicos o comerciales, sin la autorización previa de Georent.cl o del titular de los derechos que corresponda.<br/><br/>
Cualquier infracción de lo dispuesto anteriormente será considerada como infracción de los derechos de propiedad intelectual de titularidad de los oferentes, dando lugar a las acciones legales que correspondan en contra de los responsables.<br/><br/>
Los clientes tienen derecho a revisar toda la información publicada en el Sitio, estando estrictamente prohibida su utilización para fines comerciales, distintos a los propios del sitio GeoRent.cl.<br/><br/>
8. Información publicada en el Sitio<br/><br/>
Georent.cl no es responsable de la autenticidad y veracidad de la información publicada por los oferentes en el Sitio, puesto que esta información es proporcionada directamente por los oferentes que publican, que son los únicos responsables por su autenticidad y veracidad.<br/><br/>
Georent.cl no verifica los datos que los usuarios proporcionan. El Sitio no se responsabiliza por la calidad del bien o servicio ofrecidas en éste, ni asume responsabilidades de ningún tipo en caso de existir perjuicios económicos o morales por eventuales contratos y/o acuerdos comerciales originados por la información contenida en éste.<br/><br/>
Si un cliente considera que la información publicada por un oferente no es correcta, induce a error o no se encuentra actualizada, este deberá comunicarse directamente con el oferente responsable de dicha publicación.<br/><br/>
La información publicada en el Sitio no constituye un documento contractual y sólo se publica con efectos meramente informativos.<br/><br/>
9. Responsabilidad<br/><br/>
Georent.cl no garantiza a sus usuarios ni se responsabiliza por:<br/><br/>
Eventuales efectos secundarios negativos en caso de vulneración de las medidas de seguridad del sitio web.<br/><br/>
La inexistencia de virus computaciones, malware y/o demás elementos perniciosos en el sitio web o en el servidor que lo aloja.<br/><br/>
El cumplimiento por parte de los oferentes de sus obligaciones con los clientes y viceversa.<br/><br/>
Las eventuales imprecisiones en los datos o características de un bien o servicio.<br/><br/>
La disponibilidad de los bienes o servicios publicadas.<br/><br/>
10. Notificaciones<br/><br/>
Los avisos y/o modificaciones que se realicen en el sitio se harán por medio de una notificación a través de Georent.cl y se considerarán debidamente informadas, desde el momento de su publicación en Georent.cl.<br/><br/>
11. Tipos de Usuarios en Georent.cl<br/><br/>
Georent.cl contempla los siguientes tipos de usuarios de su plataforma web:<br/><br/>
Clientes: Usuario que accede a una o más páginas de información publicada en el Sitio en busca de contenido, no exigiéndose su identificación para dicho acceso.<br/><br/>
Oferentes: Usuario que completa el proceso de registro en el Sitio, lo cual supone que complete el formulario correspondiente con los datos mínimos de identificación para publicar contenido ofreciendo un bien o servicio.<br/><br/>
12. Seguridad<br/><br/>
Georent.cl procurará adoptar los niveles de seguridad y de protección de datos personales legalmente requeridos, y ha instalado todos los medios técnicos a su alcance para proteger la confidencialidad de la información entregada por los oferentes.<br/><br/>
Sin perjuicio de lo anterior, los niveles de seguridad en Internet son vulnerables, por lo que Georent.cl no garantiza la total y absoluta inviolabilidad de sus Servidores y el acceso a la información contenida en ellos, ni tampoco el perfecto funcionamiento de sus mecanismos de protección.<br/><br/>
No serán de responsabilidad de Georent.cl cualquier violación por parte de terceros que permita el acceso a la información de los oferentes que se produzcan sin culpa de Georent.cl.<br/><br/>
II. VISITAS<br/><br/>
1. Generalidades<br/><br/>
El uso del Sitio en carácter de cliente no supone que esté obligado a facilitar ninguna información personal.<br/><br/>
2. Información<br/><br/>
Como ya se ha indicado, Georent.cl no es responsable de la autenticidad y veracidad de la información publicada por los oferentes en el Sitio, pues esta información es proporcionada directamente por los oferentes que publican, quienes son los únicos responsables por su autenticidad y veracidad.<br/><br/>
No obstante, lo anterior, Georent.cl implementará sus mejores esfuerzos en tener los más altos estándares de actualización de manera que la información proporcionada por los oferentes sea lo más acorde a la realidad posible.<br/><br/>
3. Responsabilidad<br/><br/>
Georent.cl no será responsable de los perjuicios que pueda sufrir una visita a causa de la imprecisión en la información publicada en la plataforma web o el incumplimiento de los presentes Términos y Condiciones.<br/><br/>
III. USUARIOS REGISTRADOS<br/><br/>
1. Información proporcionada a Georent.cl y almacenamiento de datos<br/><br/>
El Sitio solamente almacena datos de aquellos oferentes al momento de registrarse.<br/><br/>
2. Registro obligatorio<br/><br/>
Para utilizar Georent.cl como oferentes se requiere de un registro obligatorio (el “Registro”), mediante este proceso, autorizarán la incorporación de esta información a una ficha de carácter personal, propiedad de Georent.cl.<br/><br/>
Mediante el Registro, los usuarios también autorizarán a:<br/><br/>
Su clasificación y uso para facilitar la correcta utilización del Sitio;<br/><br/>
La identificación del usuario para Servicios personalizados;<br/><br/>
La realización de estudios estadísticos que permitan mejorar los Servicios;<br/><br/>
Georent.cl está facultado para utilizar la información recopilada automáticamente y que no contiene identificación personal de los usuarios.<br/><br/>
Lo anterior faculta a Georent.cl para informar a terceros, entre otras cosas, sobre temas relativos a número de visitas, tipos de visitas, búsquedas de las visitas e información más visitadas dentro del Sitio.<br/><br/>
En el formulario de Registro la negativa de proporcionar los datos calificados como obligatorios supondrá la imposibilidad de acceder al Sitio para la publicación de un bien o servicio.<br/><br/>
Mediante el envío de un correo electrónico a la dirección georent@tecnoffice.cl, el oferente podrá dar término a la publicación de su contenido, solicitar la baja de su perfil y tendrá la obligación de eliminar su contenido en caso de que no existan obligaciones pendientes por parte del oferente con Georent.cl.<br/><br/>
3. Eliminación de datos<br/><br/>
Al proporcionar sus datos en el Registro, el oferente está declarando que la información entregada es veraz y lícita, Georent.cl se reserva el derecho a eliminar, en forma unilateral, todos los datos pertenecientes a oferentes que:<br/><br/>
Se sospeche pudieren ser falso o bien se acredite la falsedad de los mismos;<br/><br/>
Tuvieran información equivoca o perteneciente a otros usuarios;<br/><br/>
Tuvieren como finalidad hacer un uso del Sitio distinto a los Servicios indicados en estos Términos y Condiciones.<br/><br/>
GEORENT NO SE HARÁ RESPONSABLE DE LOS DAÑOS Y PERJUICIOS, CUALQUIERA SEA SU NATURALEZA, QUE PUEDAN DEBERSE A LA SUPLANTACIÓN DE IDENTIDAD DE UN TERCERO EN EL SITIO.<br/><br/>
4. Obligaciones de los usuarios registrados<br/><br/>
El Usuario Registrado, Oferente, se obliga a:<br/><br/>
No suplantar a terceras personas.<br/><br/>
Hacer un uso correcto del Sitio y sus Servicios y a resguardar la confidencialidad de su contraseña para acceder a publicar contenido.<br/><br/>
Usar los Contenidos de forma correcta y lícita.<br/><br/>
Abstenerse de utilizar los Contenidos con fines o efectos contrarios a la ley, a la moral y a las buenas costumbres.<br/><br/>
TODA VEZ QUE UN OFERENTE PUBLIQUE CONTENIDO O INFORMACIÓN DE CUALQUIER TIPO EN GeoRent.cl (TEXTOS, FOTOGRAFÍAS, VIDEOS O CUALQUIER OTRO REGISTRO) A FIN DE INCLUIRLAS EN EL SITIO, EL OFERENTE DECLARA, GARANTIZA Y ACEPTA QUE TIENE DERECHO DE PROPIEDAD SOBRE ESTOS Y QUE DICHA INFORMACIÓN NO INFRINGE NINGÚN DERECHO DE PROPIEDAD INTELECTUAL, DE MARCA, DE PATENTE, SECRETO COMERCIAL, O CUALQUIER OTRO DERECHO DE TERCERO. ADEMÁS, ACEPTA CEDER A GeoRent.cl DE MANERA NO-EXCLUSIVA, CON CARÁCTER INDEFINIDO Y REVOCABLE EL DERECHO DE USO, REPRODUCCIÓN, MODIFICACIÓN, ADAPTACIÓN, PUBLICACIÓN, TRADUCCIÓN DE DICHO CONTENIDO EN EL SITIO.<br/><br/>
IV. OFERENTES<br/><br/>
1. Generalidades<br/><br/>
La persona que quiera ofrecer un bien o servicio deberá estar registrado como Oferente.<br/><br/>
2. Obligaciones del Oferente<br/><br/>
Ningún Oferente podrá publicar y/o hacer alusión a otro sitio Web dentro de la ficha de su propiedad, salvo autorización previa y expresa de GeoRent.cl.<br/><br/>
El Oferente sólo podrá publicar y/o hacer alusión de sus datos de contacto en los lugares destinados para ello, llámese campos “datos de contacto”, y no en campos “descripción” o “título” o cualquier otro medio no destinado para ello.<br/><br/>
El Oferente declara que sus propósitos son el ofrecer un bien o servicio publicado y excluye totalmente cualquier abuso o mal uso de la publicación para otros fines que no sean los mencionados como propósitos del sitio.<br/><br/>
Mantener actualizados los contenidos de manera que corresponda a la realidad en la mayor medida de lo posible.<br/><br/>
Informar a Georent.cl si no desea seguir con su publicación.<br/><br/>
3. Responsabilidad del Oferente<br/><br/>
Georent.cl no responderá por posibles perjuicios que pueda sufrir el Oferente por el uso indebido por parte de terceros ajenos al sitio de la información que haya ingresado al Sitio.<br/><br/>
4. Facultades y Responsabilidad de Georent.cl<br/><br/>
Georent.cl se reserva el derecho de dar de baja publicaciones y/o usuarios que no cumplan con los Términos y Condiciones del Sitio.<br/><br/>
Georent.cl no será responsable de los perjuicios que pueda sufrir el Oferente por la baja de su publicación.<br/><br/>
Georent.cl no será responsable de los perjuicios que pueda sufrir el Oferente por el uso indebido por parte de terceros ajenos al sitio de la información que haya ingresado al Sitio.<br/><br/>
V. CLIENTES<br/><br/>
1. Generalidades<br/><br/>
El cliente podrá acceder a la información publicada en el Sitio sin necesidad de registrarse.<br/><br/>
2. Obligaciones del Cliente<br/><br/>
El Cliente se obliga a:<br/><br/>
Hacer un uso correcto del Sitio y sus Servicios.<br/><br/>
Usar los Contenidos de forma correcta y lícita.<br/><br/>
Abstenerse de utilizar los Contenidos con fines o efectos contrarios a la ley, a la moral y a las buenas costumbres.<br/><br/>
3. Responsabilidad del Cliente<br/><br/>
Georent.cl no será responsable de los perjuicios que pueda sufrir el Cliente por el uso indebido por parte de terceros ajenos al sitio de la información que haya ingresado al Sitio.<br/><br/>
4. Facultades y Responsabilidad de Georent.cl<br/><br/>
Georent.cl no será responsable de los perjuicios que pueda sufrir el Cliente por el uso indebido por parte de terceros ajenos al sitio de la información que haya ingresado al Sitio.<br/><br/>
VI. PROPIEDAD INTELECTUAL E INDUSTRIAL<br/><br/>
1. Generalidades<br/><br/>
Georent.cl es titular de los derechos de propiedad intelectual e industrial, o ha obtenido las autorizaciones o licencias correspondientes para su explotación, sobre el dominio, las marcas y signos distintivos, la información y el resto de obras e invenciones asociadas con el Sitio y la tecnología asociada al mismo, así como sobre sus Contenidos.<br/><br/>
2. Prohibiciones<br/><br/>
Queda prohibida cualquier forma de reproducción, distribución, comunicación pública, transformación, puesta a disposición y, en general, cualquier otro acto de explotación pública referido tanto a la Página Web como a sus Contenidos e información, sin la expresa y previa autorización escrita de Georent.cl.<br/><br/>
3. Sanciones<br/><br/>
La utilización no autorizada de la información contenida en el Sitio, así como la lesión de los derechos de propiedad intelectual o industrial de Georent.cl dará lugar a las responsabilidades legalmente establecidas.<br/><br/>
VII. POLÍTICA DE PRIVACIDAD<br/><br/>
1. Generalidades<br/><br/>
Georent.cl respeta la privacidad de los usuarios y se compromete a proteger su información personal. Por favor, lea la siguiente política de privacidad para entender cómo se usa y protege la información que usted proporciona.<br/><br/>
2. Información que se recopila<br/><br/>
Georent.cl recopila la siguiente información de los usuarios del Sitio:<br/><br/>
Información proporcionada por el usuario: Se recopila la información que el usuario ingresa en el Sitio, como nombre, dirección de correo electrónico, dirección, número de teléfono, información de pago y detalles del producto o servicio.<br/><br/>
Información recopilada automáticamente: Se recopila información sobre el uso que el usuario hace del Sitio, como las páginas visitadas, la hora y la fecha de la visita, la dirección IP, el tipo de navegador y el sistema operativo utilizado.<br/><br/>
3. Uso de la información<br/><br/>
La información recopilada se utiliza para:<br/><br/>
Proveer los productos y servicios solicitados por el usuario.<br/><br/>
Mejorar la calidad del Sitio y personalizar la experiencia del usuario.<br/><br/>
Enviar comunicaciones de marketing y promocionales, si el usuario ha optado por recibir este tipo de comunicaciones.<br/><br/>
Realizar análisis y estudios de mercado para mejorar los productos y servicios de Georent.cl.<br/><br/>
4. Compartir información<br/><br/>
Georent.cl no vende, alquila ni comparte la información personal de los usuarios con terceros, excepto en los siguientes casos:<br/><br/>
Con el consentimiento del usuario.<br/><br/>
Para proveer un producto o servicio solicitado por el usuario.<br/><br/>
Para cumplir con la ley, en procedimientos legales, para responder a reclamaciones o para proteger los derechos, propiedad o seguridad de Georent.cl o de terceros.<br/><br/>
5. Seguridad de la información<br/><br/>
Georent.cl utiliza medidas de seguridad para proteger la información de los usuarios contra el acceso no autorizado, la pérdida, el uso indebido o la alteración. Sin embargo, ningún método de transmisión por Internet o de almacenamiento electrónico es 100% seguro, por lo que Georent.cl no puede garantizar la seguridad absoluta de la información de los usuarios.<br/><br/>
6. Acceso y corrección de la información<br/><br/>
El usuario tiene derecho a acceder, corregir, actualizar o eliminar la información personal que ha proporcionado a Georent.cl. Para ejercer este derecho, el usuario puede ponerse en contacto con Georent.cl a través de la dirección de correo electrónico georent@tecnoffice.cl.<br/><br/>
7. Cambios en la política de privacidad<br/><br/>
Georent.cl se reserva el derecho de modificar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el Sitio. El uso continuado del Sitio por parte del usuario después de la publicación de los cambios constituirá su aceptación de dichos cambios.<br/><br/>
VIII. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD<br/><br/>
1. Exclusión de garantías y responsabilidad por el funcionamiento del Sitio<br/><br/>
Georent.cl no garantiza la disponibilidad y continuidad del funcionamiento del Sitio y de los Servicios. Cuando sea razonablemente posible, Georent.cl advertirá previamente de las interrupciones en el funcionamiento del Sitio y de los Servicios.<br/><br/>
Georent.cl tampoco garantiza la utilidad del Sitio y de los Servicios para la realización de ninguna actividad en particular, ni su infalibilidad y, en particular, aunque no de manera exclusiva, que los usuarios puedan efectivamente utilizar el Sitio y los Servicios, acceder a las distintas páginas web que forman el Sitio o a aquellas desde las cuales se prestan los Servicios.<br/><br/>
Georent.cl excluye, con toda la extensión permitida por el ordenamiento jurídico, cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento del Sitio y de los Servicios, a la defraudación de la utilidad que los usuarios hubieren podido atribuir al Sitio y a los Servicios, a la falibilidad del Sitio y de los Servicios, y en particular, aunque no de manera exclusiva, a los fallos en el acceso a las distintas páginas web del Sitio o a aquellas desde las cuales se prestan los Servicios.<br/><br/>
2. Exclusión de garantías y responsabilidad por los Contenidos<br/><br/>
Georent.cl no controla ni garantiza la ausencia de virus ni de otros elementos en los Contenidos que puedan producir alteraciones en su sistema informático (software y hardware) o en los documentos electrónicos y ficheros almacenados en su sistema informático.<br/><br/>
Georent.cl excluye, con toda la extensión permitida por el ordenamiento jurídico, cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la presencia de virus o a la presencia de otros elementos lesivos en los contenidos.<br/><br/>
3. Exclusión de garantías y responsabilidad por la utilización del Sitio y de los Servicios por los usuarios<br/><br/>
Georent.cl no se hace responsable del uso que los usuarios y/o visitas hagan del Sitio y de los Servicios, ni de los daños y perjuicios que pudieran derivarse del mismo.<br/><br/>
4. Exclusión de garantías y responsabilidad por los Servicios prestados por terceros a través del Sitio<br/><br/>
Georent.cl no garantiza la licitud, fiabilidad y utilidad de los Servicios prestados por terceros a través del Sitio. Georent.cl excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a los Servicios prestados por terceros a través del Sitio.<br/><br/>
IX. DURACIÓN Y TERMINACIÓN<br/><br/>
La prestación del servicio del Sitio y de los demás Servicios tiene, en principio, una duración indefinida. Georent.cl, no obstante, está autorizado para dar por terminada o suspender la prestación del servicio del Sitio y/o de cualquiera de los Servicios en cualquier momento, sin perjuicio de lo que se hubiere dispuesto al respecto en las correspondientes Condiciones Particulares. Cuando ello sea razonablemente posible, Georent.cl advertirá previamente la terminación o suspensión de la prestación del servicio del Sitio y de los demás Servicios.<br/><br/>
X. LEGISLACIÓN APLICABLE Y JURISDICCIÓN<br/><br/>
Estos Términos y Condiciones se rigen por la legislación chilena. Cualquier controversia surgida del uso del Sitio será sometida a los tribunales competentes de la ciudad de Santiago, Chile, renunciando las partes a cualquier otro fuero que pudiera corresponderles.<br/><br/>
XI. CONTACTO<br/><br/>
Para cualquier consulta o contacto con Georent.cl, los usuarios podrán comunicarse a través del siguiente correo electrónico: georent@tecnoffice.cl.<br/><br/>
XII. FECHA DE LA ÚLTIMA ACTUALIZACIÓN<br/><br/>
Estos Términos y Condiciones han sido actualizados por última vez el [Fecha de la última actualización].<br/><br/>
<br/><br/>
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
