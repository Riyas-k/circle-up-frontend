import { CircularProgress } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

function Loading() {
  return (
    <div style={styles.container}>
      <CircularProgress color="primary" />
    </div>
  );
}

export default Loading;
