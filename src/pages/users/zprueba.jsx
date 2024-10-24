import React, { useState } from 'react';
import axios from 'axios';
import MostrarPublicacion from './ymostrar.jsx'; // Asegúrate de que el path sea correcto

const Prueba = () => {
  // Estado inicial con los campos necesarios
  const [formData, setFormData] = useState({
    id_usuario: "505",
    nombre: "Cozy Apartment in Downtown",
    descripcion: "A modern and fully-furnished apartment in the heart of the city, close to public transportation.",
    direccion: "123 Main St, City Center",
    latitude: -70.64827,
    longitude: -33.45694,
    precio: 1500000,
    contacto: "John Doe",
    contacto_url: "https://example.com/contact-john-doe"
  });

  const [authToken, setAuthToken] = useState('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBVTjdodDRFVzZDZXVnV01sWjhWQSJ9.eyJpc3MiOiJodHRwczovL2Rldi03dzFubzJ6bDFvcHQyNGlmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwOTg5MjM1NTYwMzAwOTI5MjI0MCIsImF1ZCI6WyJodHRwczovL2dlb21hcC8iLCJodHRwczovL2Rldi03dzFubzJ6bDFvcHQyNGlmLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3Mjk1MzM5OTgsImV4cCI6MTcyOTYyMDM5OCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IlFyRWxjUkY5QUkySDZkUkJ3Q0NoYmMwNEp2dEt5Z0pvIn0.bWHTC8w486hlZFN_dB-4lGYbYTonJpjBhRzGfOvyvlEdkufSKA3pqch4r4RgUbwKr9cs0tvMkfpCZ7xY7LFUTAk0lvMtx45sZ5xNJ_GyHtWBzeCNV4-Cq_dS_UfGZDlEOYHcExymi6WDIiNwjrT8r3c8yXolE4Jg8YVAIKLbtIudu1iVbkoegwiwr-MLLrpMhGTuvxh1nlSJd_CniCLDxBjjdGGyf_527OxrT7mxqY6rvx2qUpcyO_IRTpSNJdL8yk4P9cS1T-ReKA6nFAsOxYPB9p8nQXNNdjat7AvSS2calvxKgK1cnUlrVFrredipc7Fgo8AY6WVDg3dqBqaJZg');

  const [postId, setPostId] = useState(null); // Estado para almacenar el ID del post creado

  // Manejo de cambio en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para hacer el POST al backend de Django
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/post/posts/', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`  // Incluye el Bearer token en los headers
        }
      });
      console.log('Respuesta del servidor:', response.data);
      setPostId(response.data.id); // Aquí se captura el ID del post creado
      alert('Post creado exitosamente!');
    } catch (error) {
      console.error('Error al hacer el POST:', error);
      alert('Error al crear el post.');
    }
  };

  return (
    <div>
      <h2>Crear nuevo post</h2>
      <form onSubmit={handleSubmit}>
        {/* Formulario con los campos */}
        <label>Id Usuario:
          <input type="text" name="id_usuario" value={formData.id_usuario} onChange={handleChange} />
        </label>
        <br />
        <label>Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </label>
        <br />
        <label>Descripción:
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </label>
        <br />
        <label>Dirección:
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
        </label>
        <br />
        <label>Latitud:
          <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} />
        </label>
        <br />
        <label>Longitud:
          <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} />
        </label>
        <br />
        <label>Precio:
          <input type="number" name="precio" value={formData.precio} onChange={handleChange} />
        </label>
        <br />
        <label>Contacto:
          <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} />
        </label>
        <br />
        <label>Contacto URL:
          <input type="text" name="contacto_url" value={formData.contacto_url} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Crear Post</button>
      </form>

      {/* Mostrar el componente de la publicación solo si el post fue creado */}
      {postId && <MostrarPublicacion id={postId} />}
    </div>
  );
};

export default Prueba;