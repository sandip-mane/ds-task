import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import routes from "../constants/routes";
import { REFERRALS_URL } from "../constants/apis";
import axios from "axios";
import { toast } from 'react-toastify';

export default function ReferralModal({ open, onClose, refreshTable }) {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(REFERRALS_URL, { referral: { email: email } });

      toast.success("Referral has been sent.");
      handleClose();
      refreshTable();
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  const handleClose = () => {
    setEmail("");
    onClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Refer someone</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Refer your team to allow them joining seamlessly.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Send referral</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}