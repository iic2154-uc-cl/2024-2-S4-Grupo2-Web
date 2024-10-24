import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/users/notification.css'; // Verifica que la ruta al CSS sea correcta
import '../../styles/helloworld.css'; 

const Notification = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSend = () => {
    const notificationData = {
      title,
      content,
      images,
    };
    // Aquí puedes manejar el envío de la notificación, por ejemplo, haciendo una petición a una API
    console.log('Notificación enviada:', notificationData);
  };

  return (
    <div id="hello-world-container">
        <Navbar></Navbar>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

    
    <div className="notification-container">
      <h2>Crear Notificación</h2>
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Ingresa el título de la notificación"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Contenido:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Ingresa el contenido de la notificación"
        />
      </div>
      <div className="form-group">
        <label htmlFor="images">Imágenes:</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <button className="send-button" onClick={handleSend}>
        Enviar Notificación
      </button>
    </div>
    </div>
  );
};

export default Notification;
