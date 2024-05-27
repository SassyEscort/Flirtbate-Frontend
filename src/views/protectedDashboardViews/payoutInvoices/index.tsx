'use client';
import { Box } from '@mui/material';
import UINewTypography from 'components/UIComponents/UINewTypography';
import React from 'react';

const PayoutInvoices = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '757px', paddingLeft: 3, paddingTop: 4 }}>
      <Box sx={{ display: 'flex', gap: 5.5, flexDirection: 'column' }}>
        <Box>
          <UINewTypography variant="h2" color={'text.secondary'}>
            Your past payouts and invoices
          </UINewTypography>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default PayoutInvoices;
