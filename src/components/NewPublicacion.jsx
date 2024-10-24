import React from 'react'
import '../styles/newmapa.css';

const NewPublicacion = ({ title, description, image, price, rating, location, category, subcategory }) => {
  return (
    <div className='publicacion'>
        <img src={image} alt="imagen" />
        <div className='publicacion-info'>
            <div>
                <p className='publicacion-titulo'>{title}</p>
                <p className='publicacion-review'>{rating} estrellas</p>
                <div className='publicacion-caracteristicas'>
                    {// si precio = 0, mostrar "Gratis", de lo contrario, mostrar el precio 
                    price === 0 ? <div className='caracteristica'>Gratis</div> : 
                    <div className='caracteristica'>${price}</div>
                    }
                    <div className='caracteristica'>{category}</div>
                    <div className='caracteristica'>{subcategory}</div>
                    <div className='caracteristica'>{location}</div>
                </div>
            </div>
            <div className='publicacion-descripcion'>
                {description}
            </div>
        </div>
    </div>


  )
}

export default NewPublicacion