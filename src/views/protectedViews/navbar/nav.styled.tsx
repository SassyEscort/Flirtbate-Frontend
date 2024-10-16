import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

export const MainDashboardSideMenuMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: 32,
  marginBottom: 20,
  width: '100%',
  maxWidth: 299,
  height: 'calc(100vh - 112px)',
  justifyContent: 'space-between',
  gap: theme.spacing(6)
}));

export const CommonMenuBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.common.white,
  width: '100%',
  cursor: 'pointer',
  '& .MuiButtonBase-root': {
    opacity: 1
  }
}));

export const MainMenuBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
  alignSelf: 'stretch'
}));

export const MainMenuBoxChlid = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1
}));

export const SelectedTab = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  color: theme.palette.primary.main,
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(1)
  }
}));

export const NavBarBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(4)
}));

export const MobileComponentBoxContainer = styled(Box)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiButtonBase-root': {
    paddingLeft: '12px',
    paddingRight: '32px'
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 420
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 768
  }
}));

export const MobileTextStyleContainer = styled(Tab)(() => ({
  whiteSpace: 'nowrap',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '19.2px'
}));

export const MobileComponentSecBoxContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
}));
