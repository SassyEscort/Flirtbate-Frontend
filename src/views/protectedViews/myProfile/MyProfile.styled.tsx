import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MyProfileContainerMain = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1.875),
    paddingRight: theme.spacing(1.875)
  },
  paddingTop: theme.spacing(4),
  display: 'flex',
  gap: theme.spacing(7),
  flexDirection: 'column'
}));

export const InputTypeBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  backgroundColor: theme.palette.secondary[500],
  width: '100%',
  maxWidth: '614px',
  borderRadius: '12px'
}));

export const DisableButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '613px',
  paddingTop: theme.spacing(1.125),
  paddingRight: theme.spacing(2.5),
  paddingBottom: theme.spacing(1.125),
  paddingLeft: theme.spacing(2.5)
}));