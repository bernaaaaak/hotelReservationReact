import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChangePassword = ({ onBack }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        margin="normal"
        required
        fullWidth
        id="oldPassword"
        label="Old Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="newPassword"
        label="New Password"
        type="password"
        autoComplete="new-password"
        variant="outlined"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        variant="outlined"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        Change Password
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={onBack}
      >
        Back to Reservations
      </Button>
    </Box>
  );
};

export default ChangePassword;
