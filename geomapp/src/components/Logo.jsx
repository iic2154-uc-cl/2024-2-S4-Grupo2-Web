import imagen_logo from '../imagen_logo.webp'; // Asegúrate de que la ruta sea correcta

export default function Logo() {
  return (
    <div className="mx-auto">
      <img src={imagen_logo} alt="Logo" width={100} height={100} />
    </div>
  );
}
