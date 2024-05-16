'use client';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { BillingHistoryMainContainer, FirstTextContainer, TextMainContainer } from './BillingHistory.styled';
import BilingDetails from '../bilingDetails';

const BillingHistory = () => {
  const [open, setOpen] = useState(false);

  const handleBilingDetailsOpen = () => {
    setOpen(true);
  };

  const handleBilingDetailsClose = () => {
    setOpen(false);
  };

  return (
    <BillingHistoryMainContainer>
      <TextMainContainer>
        <FirstTextContainer>
          <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
            <Typography variant="buttonLargeMenu" color="success.100">
              + 100 credits
            </Typography>
            <Typography variant="SubtitleSmallMedium" color="text.primary">
              05:28 PM, 12 Apr 2024
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              $120.99
            </Typography>
          </Box>
        </FirstTextContainer>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ border: '1px solid', borderColor: 'primary.700', width: '100%', maxWidth: '929px' }}
        />
      </TextMainContainer>

      <TextMainContainer>
        <FirstTextContainer>
          <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
            <Typography variant="buttonLargeMenu" color="error.300">
              + 100 credits
            </Typography>
            <Typography variant="SubtitleSmallMedium" color="text.primary">
              05:28 PM, 12 Apr 2024
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleBilingDetailsOpen}>
            <Typography variant="h6" color="text.secondary">
              View details
            </Typography>
          </Box>

          <BilingDetails isOpen={open} handleClose={handleBilingDetailsClose} />
        </FirstTextContainer>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ border: '1px solid', borderColor: 'primary.700', width: '100%', maxWidth: '929px' }}
        />
      </TextMainContainer>
    </BillingHistoryMainContainer>
  );
};

export default BillingHistory;
