import React, { useRef } from 'react';
import {
  Box,
  Avatar,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhotoIcon from '@mui/icons-material/Photo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

function Posts() {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSelectedFile = (event) => {
    const file = event.target.files[0];
    // Perform your file upload logic here
    console.log('Uploaded file:', file);
  };

  const renderPosts = () => {
    const postItems = [];

    for (let i = 0; i < 5; i++) {
      postItems.push(
        <Box
          key={i}
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Avatar src="/path/to/avatar.png" alt="User Avatar" sx={{ marginRight: '8px' }} />
            <Typography variant="subtitle2">Username</Typography>
            <Typography variant="subtitle2" sx={{ marginLeft: '8px', color: 'gray' }}>
              Active 2 min ago
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ marginBottom: '8px' }}>
            Post Title
          </Typography>
          <img src="/path/to/post-image.png" alt="Post Image" style={{ marginBottom: '8px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary" aria-label="Like">
              <FavoriteIcon />
            </IconButton>
            <Typography variant="subtitle2" sx={{ marginRight: '8px' }}>
              10 likes
            </Typography>
            <IconButton color="primary" aria-label="Comment">
              <CommentIcon />
            </IconButton>
            <Typography variant="subtitle2">5 comments</Typography>
          </Box>
        </Box>
      );
    }

    return postItems;
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        marginTop: '2px',
        backgroundColor: '#EFF2F1',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', marginBottom: '16px' }}>
        <Avatar src="/path/to/avatar.png" alt="User Avatar" sx={{ marginRight: '8px' }} />
        <TextField
          placeholder="Write a post"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary" aria-label="Send">
                  <SendIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Attach Photo"
                  onClick={handleFileUpload}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleSelectedFile}
                  />
                  <PhotoIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {renderPosts()}
    </Box>
  );
}

export default Posts;
