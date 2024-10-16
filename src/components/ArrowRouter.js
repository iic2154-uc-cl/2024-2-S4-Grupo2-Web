import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

export default function ArrowRouter(props) {
  const { publication, type } = props;
  const router = useRouter();

  const goToPostDetail = () => {
    router.push({
      pathname: '/post/postDetail',
      query: {
        id: publication.id,
      },
    });
  };

  const goToReportedPostDetail = () => {
    router.push({
      pathname: '/admin/reportedPostDetail',
      query: {
        id: publication.id,
      },
    });
  };

  const goToPostReviewDetail = () => {
    router.push({
      pathname: '/admin/postReviewDetail',
      query: {
        id: publication.id,
      },
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (type === 'userPost') goToPostDetail();
    else if (type === 'reportedPost') goToReportedPostDetail();
    else if (type === 'postsReview') goToPostReviewDetail();
    else if (type === 'recourses') goToPostReviewDetail();
  };

  let iconColor = '';

  if (type === 'userPost') {
    iconColor = 'text-blue-500 hover:text-blue-300';
  } else if (type === 'reportedPost') {
    iconColor = 'text-red-500 hover:text-red-300';
  } else if (type === 'postsReview' || type === 'recourses') {
    iconColor = 'text-yellow-500 hover:text-yellow-300';
  }

  return (
    <Button
      variant="contained"
      endIcon={<KeyboardDoubleArrowRightIcon />}
      fontSize="medium"
      className={`h-auto cursor-pointer ${iconColor}`}
      onClick={handleClick}
      size="small"
    >
      Más Información
    </Button>
  );
}
