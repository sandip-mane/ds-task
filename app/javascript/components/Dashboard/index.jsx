import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import routes from "../constants/routes";
import Navbar from "../commons/Navbar";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ReferralModal from './ReferralModal';
import ReferralsTable from './ReferralsTable';

import { globalProps } from "../../utils/app";
import { REFERRALS_URL } from "../constants/apis";
import axios from "axios";

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    fetchReferrals();
  }, [])

  const fetchReferrals = async () => {
    try {
      const response = await axios.get(REFERRALS_URL);
      setReferrals(response.data.referrals);
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center" }}>
      <Navbar />

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
          Welcome {globalProps.user.first_name}, who do you want to refer today?
          <Button variant="outlined" onClick={() => setModalOpen(true)} sx={{ ml: 5 }}>
            Refer someone now!
          </Button>
        </Typography>

        <ReferralsTable rows={referrals} />

        <ReferralModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          refreshTable={fetchReferrals}
        />
      </Box>
    </Box>
  );
}
