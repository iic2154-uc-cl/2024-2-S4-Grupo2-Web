import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MostrarPublicacion = ({ id }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  id = 1;

  useEffect(() => {
    // Función para obtener la publicación
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener la publicación:', err);
        setError('Error al obtener la publicación.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Cargando publicación...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>{post.nombre}</h2>
      <p><strong>Descripción:</strong> {post.descripcion}</p>
      <p><strong>Dirección:</strong> {post.direccion}</p>
      <p><strong>Precio:</strong> {post.precio}</p>
      <p><strong>Contacto:</strong> {post.contacto}</p>
      <p><strong>URL de contacto:</strong> <a href={post.contacto_url} target="_blank" rel="noopener noreferrer">{post.contacto_url}</a></p>
      <p><strong>Coordenadas:</strong> {post.latitude}, {post.longitude}</p>
    </div>
  );
};

export default MostrarPublicacion;
