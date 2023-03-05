import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const STATES = {
  sent: {
    label: "Sent",
    color: "#ed6c02"
  },
  accepted: {
    label: "Accepted",
    color: "#2e7d32"
  }
}

export default function ReferralTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Sent at</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{dayjs(row.created_at).fromNow()}</TableCell>
              <TableCell align="right" sx={{ color: STATES[row.state].color }}>{STATES[row.state].label}</TableCell>
            </TableRow>
          ))}

          {!rows.length &&
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>
                  Looks like there are no invites!
                </Typography>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}