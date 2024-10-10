import React, { useState } from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm, { registerSchema } from "../components/RegisterForm";
import { Formik } from "formik";
import profilePic from '../assets/images/logo.png';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const navigate = useNavigate();

  const handleClickOpen = (values) => {
    setFormValues(values);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      // TODO: Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "#0CC0DF",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            sx={{ color: '#0CC0DF' }}
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              handleClickOpen(values);
              actions.setSubmitting(false);
            }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/login" style={{ 
              color: '#0CC0DF', 
              backgroundColor: '#ffcb96', 
              padding: '5px', 
              borderRadius: '5px' ,
              fontWeight: 'bold' 
               }}
               >Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
          <img src={profilePic} alt="Profile"
           style={{  marginLeft: '-150px', marginTop: '90px'}} 
          />
          </Container>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Terms and Conditions"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking "Accept" below, you confirm that you have read and agree to our GDPR terms and that you are over 18 years old.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Decline
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Register;