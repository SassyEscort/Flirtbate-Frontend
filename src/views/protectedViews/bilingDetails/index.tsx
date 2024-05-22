'use client';
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, useMediaQuery } from '@mui/material';
import UINewTypography from 'components/UIComponents/UINewTypography';

import theme from 'themes/theme';
import WorkerCard from 'views/guestViews/commonComponents/WorkerCard/WorkerCard';
import { SecondSubContainerImgWorkerCard } from 'views/guestViews/commonComponents/WorkerCard/WorkerCard.styled';
import UIThemeShadowButton from 'components/UIComponents/UIStyledShadowButton';
import Image from 'next/image';
import { DialogTitleContainer, FirstBox, SecondBox, ThreeBox } from './BilingDetails.styled';

const BilingDetails = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      scroll="body"
      PaperProps={{
        sx: {
          maxWidth: '634px'
        }
      }}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#07030E',
          borderRadius: '12px',
          border: isMdDown ? 'solid 0px' : 'solid 1px #232027'
        },
        '& .MuiDialog-container': {
          backgroundColor: isMdDown ? '#07030E' : '#07030e99 !important',
          backdropFilter: 'blur(24px)'
        }
      }}
    >
      <DialogTitleContainer id="responsive-modal-title">
        <UINewTypography variant="h6" color={'#B7B5B9'}>
          Details
        </UINewTypography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.text.secondary
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitleContainer>
      <Box>
        <Divider
          sx={{
            border: '1px solid #232027',
            display: { sm: 'block', display: 'none' }
          }}
        />
      </Box>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <WorkerCard />
          <FirstBox>
            <SecondBox>
              <ThreeBox>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <UINewTypography variant="buttonLargeMenu" color={'#E9E8EB'}>
                    Credits used:
                  </UINewTypography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <SecondSubContainerImgWorkerCard src="/images/workercards/dollar-img.png" />
                    <UINewTypography variant="buttonLargeMenu" color={'#E9E8EB'}>
                      70
                    </UINewTypography>
                  </Box>
                </Box>
                <Box>
                  <UINewTypography variant="SubtitleSmallMedium" color={'#B7B5B9'}>
                    05:28 PM, 12 Apr 2024
                  </UINewTypography>
                </Box>
              </ThreeBox>
              <Box>
                <UINewTypography variant="SubtitleSmallMedium" color={'#B7B5B9'}>
                  Duration: 1 hour
                </UINewTypography>
              </Box>
            </SecondBox>
            <Box display="flex" gap={2} flexDirection="column">
              <UIThemeShadowButton
                sx={{
                  maxWidth: '100%',
                  '&.MuiButtonBase-root': { height: { xs: '40px', sm: '44px' } }
                }}
                fullWidth
                variant="contained"
              >
                <Box display="flex" alignItems="center" gap="10px">
                  <Image src="/images/workercards/video-call.svg" alt="video-call" height={24} width={24} />
                  <UINewTypography color="common.white" variant="bodySemiBold" sx={{ whiteSpace: 'nowrap' }}>
                    Start Video Call again
                  </UINewTypography>
                </Box>
              </UIThemeShadowButton>
              <UINewTypography variant="bodySemiBold" color="#FFFFFF" sx={{ textAlign: 'center' }}>
                Explore more models
              </UINewTypography>
            </Box>
          </FirstBox>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BilingDetails;
