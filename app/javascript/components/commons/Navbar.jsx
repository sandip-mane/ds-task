import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import axios from "axios";
import { toast } from 'react-toastify';

import { LOGOUT_URL } from "../constants/apis";

function Navbar(props) {
  const handleLogout = async () => {
    try {
      const response = await axios.delete(LOGOUT_URL);

      toast.success("Logged out successfully");
      window.location.pathname = "/";
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  return (
    <>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            DS Task
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button key="logout" sx={{ color: '#fff' }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
