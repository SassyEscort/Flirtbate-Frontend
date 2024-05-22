'use client';
import Box from '@mui/material/Box';
import React from 'react';
import {
  BillingHistoryMainContainer,
  BillingHistoryTextContainer,
  DividerContainer,
  FirstTextContainer,
  TextAndBoxContainer,
  TextMainContainer
} from './BillingHistory.styled';
import MainLayoutNav from '../protectedLayout';
import UINewTypography from 'components/UIComponents/UINewTypography';

const BillingHistory = () => {
  return (
    <MainLayoutNav variant={'worker'} enlargedFooter={true}>
      <TextAndBoxContainer>
        <BillingHistoryTextContainer>
          <UINewTypography variant="h2" color="text.secondary">
            Billing History
          </UINewTypography>
        </BillingHistoryTextContainer>
        <BillingHistoryMainContainer>
          <TextMainContainer>
            <FirstTextContainer>
              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
                <UINewTypography variant="buttonLargeMenu" color="success.100">
                  + 100 credits
                </UINewTypography>
                <UINewTypography variant="SubtitleSmallMedium" color="text.primary">
                  05:28 PM, 12 Apr 2024
                </UINewTypography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <UINewTypography variant="h6" color="text.secondary">
                  $120.99
                </UINewTypography>
              </Box>
            </FirstTextContainer>
            <DividerContainer orientation="horizontal" flexItem />
          </TextMainContainer>

          <TextMainContainer>
            <FirstTextContainer>
              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
                <UINewTypography variant="buttonLargeMenu" color="error.300">
                  + 100 credits
                </UINewTypography>
                <UINewTypography variant="SubtitleSmallMedium" color="text.primary">
                  05:28 PM, 12 Apr 2024
                </UINewTypography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <UINewTypography variant="h6" color="text.secondary">
                  View details
                </UINewTypography>
              </Box>
            </FirstTextContainer>
            <DividerContainer orientation="horizontal" flexItem />
          </TextMainContainer>
        </BillingHistoryMainContainer>
      </TextAndBoxContainer>
    </MainLayoutNav>
  );
};

export default BillingHistory;
