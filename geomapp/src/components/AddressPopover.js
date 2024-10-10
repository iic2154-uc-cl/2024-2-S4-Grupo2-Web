import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import { IconButton } from '@mui/material';

export default function AddressPopover(props) {
  const { publication } = props;

  const getPostAddressPlusDpto = () => {
    if (publication.address && publication.dpto) {
      return `${publication.address}, ${publication.dpto}`;
    } else if (publication.address) {
      return publication.address;
    } else {
      return '';
    }
  };


  return (
    <Popover placement="top">
      <PopoverHandler>
        <IconButton className="rounded-full" size="small">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="h-10 w-10 sm:h-7 sm:w-7 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-8 xl:w-8"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <Typography
              color="blue-gray"
              className="text-sm font-medium leading-tight sm:text-sm md:text-xs lg:text-sm"
            >
              Dirección
            </Typography>
          </div>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="w-72">
        <List className="p-0">
          <ListItem>
            <ListItemPrefix>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </ListItemPrefix>
            {getPostAddressPlusDpto()}
          </ListItem>
        </List>
      </PopoverContent>
    </Popover>
  );
}
