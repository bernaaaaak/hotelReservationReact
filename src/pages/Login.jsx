import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import LoginForm, { loginSchema } from '../components/LoginForm';
import '../styles/login.css'; 
import profilePic from '../assets/images/logo.png';
import { useAuth } from '../service/AuthContext';
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:8080/login', values);
      const jwt = response.data.jwt;
      if (jwt){
        localStorage.setItem('token', jwt);
        window.location.replace("/home")
      }
    } catch (err) {
      setErrors({ submit: 'Login failed. Please check your username and password.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img 
          src={profilePic} 
          alt="Profile" 
          className="login-image"
        />
      </div>
      
      <div className="login-container">
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
          Login
        </Typography>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              {errors.submit && <div className="error">{errors.submit}</div>}
              <button type="submit" disabled={isSubmitting}>Login</button>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Link to="/register" style={{ 
                  color: '#0CC0DF', 
                  backgroundColor: '#ffcb96', 
                  padding: '5px', 
                  borderRadius: '5px' ,
                  fontWeight: 'bold' 
                }}
                >Do you not have an account?</Link>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;