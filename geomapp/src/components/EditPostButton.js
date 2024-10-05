import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function EditPostButton({ publication }) {
  const router = useRouter();

  const editPost = () => {
    router.push({
      pathname: '/post/EditProperty',
      query: {
        id: publication.id,
      },
    });
  };

  return (
    <Tooltip title="Editar publicación">
      <IconButton aria-label="delete" size="large" onClick={editPost}>
        <EditIcon
          style={{ cursor: 'pointer', height: 'auto' }}
          className="hover:text-gray-500"
          sx={{
            fontSize: {
              xs: 35,
              sm: 35,
              md: 30,
              lg: 30,
              xl: 20,
            },
            color: 'black',
          }}
        />
      </IconButton>
    </Tooltip>
  );
}
