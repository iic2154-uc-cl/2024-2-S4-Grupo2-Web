import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <Button type="button" variant="text" onClick={() => router.back()}>
      <ArrowBackIcon />
    </Button>
  );
}
