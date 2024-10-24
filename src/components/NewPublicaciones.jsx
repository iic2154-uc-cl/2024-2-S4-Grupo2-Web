
import React from 'react'
import '../styles/newmapa.css';
import NewPublicacion from './NewPublicacion';


const Publicaciones = ({ publicaciones }) => {
  return (
    <div className='publicaciones'>
        {publicaciones.map((publicacion, index) => (
            <NewPublicacion
            key={index}
            title={publicacion.nombre}
            description={publicacion.descripcion}
            image={publicacion.imagen}
            price={publicacion.precio}
            rating={publicacion.rating}
            location={publicacion.direccion}
            category={publicacion.categoria}
            subcategory={publicacion.subcategoria}
          />
        ))}
    </div>
  )
}

export default Publicaciones