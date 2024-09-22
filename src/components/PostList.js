/* eslint-disable */
import CardPost from './CardPost';

export default function PostList(props) {
  const { publications, type } = props;
  return (
    <>
        {Object.keys(publications).length === 0 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-xxl text-black">No hay publicaciones que mostrar</h1>
          </div>
        ) : (
          <>
          <div
            id="publication_list_container"
            className="mb-8 m-1 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
            >
              <>
                {publications.map((publication) => (
                  <CardPost publication={publication} type={type} key={publication.id} />
                ))}
              </>
          </div>  
          </>
        )}
    </>
  );
}
