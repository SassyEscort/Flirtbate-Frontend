import { Box, DialogTitle, styled } from '@mui/material';
import { height, width } from '@mui/system';
import UIThemeShadowButton from 'components/UIComponents/UIStyledShadowButton';
import Image from 'next/image';

export const DialogTitleContainer = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 24px 20px 24px !important'
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.625)
  }
}));

export const FirstBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  width: '100%'
}));

export const SecondBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

export const ThreeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}));

export const ButtonMainConatiner = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5),
    maxWidth: '175px'
  }
}));

export const VideoCallButton = styled(UIThemeShadowButton)(({ theme }) => ({
  maxWidth: '100%',

  [theme.breakpoints.down('sm')]: {
    '&.MuiButtonBase-root': {
      height: '40px'
    }
  },
  [theme.breakpoints.up('sm')]: {
    '&.MuiButtonBase-root': {
      height: '44px'
    }
  }
}));
