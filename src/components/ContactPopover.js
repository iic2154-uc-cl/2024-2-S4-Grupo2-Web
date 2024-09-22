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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function ContactPopover(props) {
  const { publication } = props;
  return (
    <Popover placement="top">
      <PopoverHandler>
        <IconButton className="rounded-full" size="small">
          <div className="font-medium leading-tight">
            <div className="flex flex-row items-center">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="h-10 w-10 sm:h-7 sm:w-7 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Typography
                  color="blue-gray"
                  className="text-sm font-medium leading-tight sm:text-sm md:text-xs lg:text-sm"
                >
                  Contacto
                </Typography>
              </div>
            </div>
          </div>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="">
        <List className="p-0 ml-0">
          <ListItem>
            <ListItemPrefix>
              <WhatsAppIcon />
            </ListItemPrefix>
            {publication.phone_number}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MailIcon />
            </ListItemPrefix>
            {publication.email}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PersonIcon />
            </ListItemPrefix>
            {publication.contact_name}
          </ListItem>
          { publication.web_site &&
            <ListItem>
              <ListItemPrefix>
                <WebAssetIcon />
              </ListItemPrefix>
              <p className="break-words overflow-hidden max-w-full">
                {publication.web_site}
              </p>
            </ListItem>
          }
          { publication.social_network_1 &&
            <ListItem>
              <ListItemPrefix>
                <FacebookIcon />
              </ListItemPrefix>
              {publication.social_network_1}
            </ListItem>
          }
          { publication.social_network_2 &&
            <ListItem>
              <ListItemPrefix>
                <InstagramIcon />
              </ListItemPrefix>
              {publication.social_network_2}
            </ListItem>
          }
        </List>
      </PopoverContent>
    </Popover>
  );
}
