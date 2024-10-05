/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import Image from 'next/image';

function ImageIndicator({ totalImages, useState, post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {totalImages === 0 ? (
        <Image src="/navbar/Logo.svg" width={800} height={600} alt="Default logo" />
      ) : (
        <>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${post.images[currentImageIndex].url}`}
            alt="Descripción de la imagen"
            className="h-[12rem] max-h-[12rem] w-full object-cover xl:h-[20rem] xl:max-w-[46rem]"
            width={800}
            height={600}
          />
          {totalImages > 1 && ( // Aquí está la condición para mostrar los círculos solo si hay más de 1 imagen
            <div className="absolute bottom-4 flex w-full justify-center">
              {Array.from({ length: totalImages }).map((_, index) => (
                <button
                  key={index}
                  className={`mx-2 h-4 w-4 rounded-full ${
                    index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ImageIndicator;
