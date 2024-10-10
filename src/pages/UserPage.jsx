import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, Grid, Paper, Slide } from '@mui/material';
import MyReservations from '../components/MyReservations';
import ChangePassword from '../components/ChangePassword';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import '../styles/UserPage.css';

const UserPage = () => {
  const [view, setView] = useState('reservations'); // 'reservations' or 'changePassword'
  const [userInfo, setUserInfo] = useState({ name: '', surname: '', email: '', phone: '' });
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch user information
    axios.get('http://localhost:8080/user')
      .then(response => setUserInfo(response.data))
      .catch(error => console.error('Error fetching user info:', error));

    // Fetch user reservations
    axios.get('http://localhost:8080/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const handleChangePasswordClick = () => {
    setView('changePassword');
  };

  const handleBackToReservations = () => {
    setView('reservations');
  };

  return (
    <Container>
      <UserNavbar />
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            align="center" 
            sx={{ color: 'blue' }}
          >
            User Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                value={userInfo.name}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Surname"
                value={userInfo.surname}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={userInfo.email}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                value={userInfo.phone}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button variant="contained" onClick={handleChangePasswordClick}>
              Change Password
            </Button>
          </Box>
        </Paper>
        <Box sx={{ mt: 4 }}>
          <Slide direction="left" in={view === 'reservations'} mountOnEnter unmountOnExit>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ color: 'blue' }}
              >
                Reservations
              </Typography>
              <MyReservations reservations={reservations} />
            </Paper>
          </Slide>
          <Slide direction="right" in={view === 'changePassword'} mountOnEnter unmountOnExit>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ color: 'blue' }}
              >
                Change Password
              </Typography>
              <ChangePassword onBack={handleBackToReservations} />
            </Paper>
          </Slide>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default UserPage;