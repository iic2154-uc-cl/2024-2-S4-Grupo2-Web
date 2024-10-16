/* eslint-disable react/jsx-no-useless-fragment */
import Image from 'next/image';

export default function PostImage(props) {
  const { publication, width, height } = props;
  const { images } = publication;

  return (
    <>
      {images.length === 0 ? (
        <Image
          src="/navbar/Logo.svg"
          width={800} // Ajusta el ancho deseado de la imagen
          height={600} // Ajusta la altura deseada de la imagen
        />
      ) : (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${publication.images[0].url}`}
          alt="Descripción de la imagen"
          width={width} // Ajusta el ancho deseado de la imagen
          height={height} // Ajusta la altura deseada de la imagen
        />
      )}
    </>
  );
}
