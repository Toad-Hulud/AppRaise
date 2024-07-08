import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSelector } from 'react-redux';
import { wrapper } from '../redux/store';
import { OrgChart } from '../components/OrgChart/OrgChart';
import { loadUsersAction } from '../redux/slices/usersSlice/actions/userActions';
import {
  Box,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { User } from '../types';
import { NavBar } from '../components/NavBar/NavBar';
import { RootState } from '../redux/store';

interface HomePageProps {
  initialUsers: User[];
}

//@ts-expect-error ignore
export const getServerSideProps: GetServerSideProps<HomePageProps> =
  wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(loadUsersAction());

    const users = store.getState().users.users;
    if (!users) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initialUsers: users,
      },
    };
  });

const Home = ({
  initialUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseError = () => {
    setShowError(false);
  };

  const displayUsers = users.length > 0 ? users : initialUsers;

  return (
    <Box sx={{ width: '100%' }}>
      <Container maxWidth={false} sx={{ padding: 0 }}>
        <NavBar />
        {error && showError && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseError}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Typography variant="h6">{error.message}</Typography>
            <Typography variant="body1">{error.details}</Typography>
          </Alert>
        )}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <OrgChart users={displayUsers} />
        )}
      </Container>
    </Box>
  );
};

export default Home;
