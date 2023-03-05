import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from "react-router-dom";

import routes from "../constants/routes";
import { REGISTRATION_URL } from "../constants/apis";
import axios from "axios";
import { toast } from 'react-toastify';

const theme = createTheme();

const INITIAL_VALUES = {
  first_name: "",
  last_name: "",
  email: "",
  password: ""
}

export default function SignUp() {
  const { search } = useLocation();
  const [formValues, setFormValues] = useState(INITIAL_VALUES);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const clonedFormValues = { ...formValues };
    const email = params.get("email");
    if (email) {
      clonedFormValues.email = email;
      setFormValues(clonedFormValues);
    }
  }, [search]);

  const handleFieldUpdate = (event) => {
    const clonedFormValues = { ...formValues };
    const name = event.target.name;
    const value = event.target.value;
    clonedFormValues[name] = value;
    setFormValues(clonedFormValues);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
    };

    try {
      const response = await axios.post(REGISTRATION_URL, { user: payload });

      toast.success("Welcome!");
      window.location.pathname = "/";
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={formValues.first_name}
                  onChange={handleFieldUpdate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={formValues.last_name}
                  onChange={handleFieldUpdate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleFieldUpdate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleFieldUpdate}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to={routes.auth.login} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
