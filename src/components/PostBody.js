import StarIcon from '@mui/icons-material/Star';
import EditPostButton from './EditPostButton';
import DeletePostButton from './DeletePostButton';
import ArrowRouter from './ArrowRouter';

export default function PostBody(props) {
  const { publication, type } = props;
  const getBodyAddress = () => {
    const splittedAddress = publication.address.split(', ');
    // google autocomplete address format: "street + number, city, state, country"
    if (splittedAddress.length === 4) {
      return `${`${splittedAddress[1]}, ${splittedAddress[2]}`}`;
    }
    return `${splittedAddress[0]}`;
  };

  const addPointsToNumber = (number) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return null;
  };

  const roundDecimalNumber = (number) => {
    return Math.round(number * 10) / 10;
  };

  const getPostState = () => {
    switch (publication.state) {
      case 'ACTIVE':
        return 'Activa';
      case 'IN_REVIEW':
        return 'En revisión';
      case 'SUSPENDED':
        return 'Suspendida';
      default:
        return '';
    }
  };

  return (
    <div id="information_container" className="flex h-full max-h-full flex-col gap-2">
      <div
        id="header_&_icons_container"
        className="flex h-auto max-h-full justify-between"
      >
        <div className="flex h-auto flex-row items-center justify-center gap-5">
          <ArrowRouter publication={publication} type={type} />
        </div>
        <div className="flex items-center">
          <h1 className="text-base font-medium">{publication.name}</h1>
        </div>
        <div className="flex">
          {type === 'userPost' && <EditPostButton publication={publication} />}
          <DeletePostButton publication={publication} />
        </div>
      </div>
      <div
        id="description"
        className="h-3/4 w-full overflow-scroll rounded-2xl border border-blue-500 p-3"
      >
        <p className="flex h-auto max-h-20 text-sm font-normal leading-10 text-black">
          {publication.description}
        </p>
      </div>
      <div
        id="information"
        className="flex h-1/4 w-full flex-row justify-between rounded-2xl border border-blue-500 p-1"
      >
        <div id="location" className="flex h-auto max-h-full max-w-full items-center">
          <p className="ml-3 h-auto p-0 text-base font-bold leading-10 text-black">
            {getBodyAddress()}
          </p>
        </div>
        <div id="price" className="flex h-auto max-h-full max-w-full items-center">
          {publication.type === 'SERVICE' ? (
            <p className="h-auto text-base font-normal leading-10 text-black">-</p>
          ) : (
            <p className="h-auto text-base font-normal leading-10 text-black">
              Precio/Noche: ${addPointsToNumber(publication.price)}
            </p>
          )}
        </div>
        <div
          id="rating_and_button_container"
          className="flex h-auto max-h-full max-w-full items-center gap-9"
        >
          <div
            id="rating"
            className="flex h-auto place-items-center justify-center gap-1 px-4"
          >
            <StarIcon className="h-auto cursor-pointer text-yellow-500" />
            {publication.rating_average === null ? (
              <p className="h-auto font-bold">N/A</p>
            ) : (
              <p className="h-auto font-bold">
                {roundDecimalNumber(publication.rating_average)}
              </p>
            )}
          </div>
          <div id="publication_state" className="justify-end px-4">
            <p className="h-auto text-base font-normal leading-10 text-black">
              {getPostState()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
