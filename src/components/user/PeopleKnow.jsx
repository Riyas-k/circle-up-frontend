import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PeopleYouMayKnow = () => {
  const users = [
    { id: 1, name: 'John Doe', avatar: '/path/to/avatar1.png' },
    { id: 2, name: 'Jane Smith', avatar: '/path/to/avatar2.png' },
    { id: 3, name: 'David Johnson', avatar: '/path/to/avatar3.png' },
    { id: 4, name: 'Emily Davis', avatar: '/path/to/avatar4.png' },
    { id: 5, name: 'Michael Wilson', avatar: '/path/to/avatar5.png' },
  ];

  const handleFollow = (userId) => {
    // Handle follow logic here
    console.log('Follow user with ID:', userId);
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '16px',marginLeft:'10px' }}>
        People You May Know
      </Typography>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px',marginLeft:'10px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={user.avatar} alt={user.name} sx={{ marginRight: '8px' }} />
            <Typography variant="subtitle2">{user.name}</Typography>
          </div>
          <Button variant="contained" color="primary" size="small" style={{marginRight:'10px'}} onClick={() => handleFollow(user.id)}>
            Follow
          </Button>
        </div>
      ))}
    </>
  );
};

export default PeopleYouMayKnow;











