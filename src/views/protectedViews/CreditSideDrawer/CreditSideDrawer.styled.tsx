import { Close } from '@mui/icons-material';
import { Box, Drawer, styled } from '@mui/material';
import UINewTypography from 'components/UIComponents/UINewTypography';

export const CreditLoaderBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

export const CreditPopularChip = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.75),
  position: 'absolute',
  alignItems: 'center',
  top: '-25%',
  background: theme.palette.text.secondary,
  boxShadow: '0px -2px 20px 0px #FD85CAA3',
  padding: '2px 6px',
  borderRadius: '4px'
}));
export const FirstTimeChip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-25%'
}));

export const FirstTimeTypography = styled(UINewTypography)(({ theme }) => ({
  fontSize: '9px',
  fontWeight: '600',
  lineHeight: '12.29px',
  color: '#000000',
  letterSpacing: '0.03em',
  left: '25%',
  top: '13%'
}));

export const CreditSideMainDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    height: '100%',
    maxWidth: '350px',
    backgroundColor: '#1E0815',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: 'none',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '393px'
    }
  }
}));

export const CreditsHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#1E0815',
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(1),
  alignItems: 'center',
  gap: theme.spacing(1.5),
  width: '100%',
  maxWidth: '300px',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1.5)
  }
}));

export const CreditsContent = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  gap: theme.spacing(4),
  position: 'relative'
}));

export const TitleSerachBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'center'
}));

export const CurrentBalanceBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'Transparent',
  zIndex: '1',
  height: '100%',
  maxHeight: '154px',
  width: '100%',
  display: 'flex',
  alignItems: 'start',
  gap: theme.spacing(1.5),
  paddingTop: theme.spacing(3.25),
  paddingBottom: theme.spacing(3.25),
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3)
}));

export const CurrentBalanceTypography = styled(UINewTypography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '28.8px',
  color: theme.palette.text.secondary
}));

export const CurrentAmountTypography = styled(UINewTypography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '28.8px',
  color: theme.palette.text.secondary
}));

export const MainImageBox = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  height: '268px',
  backgroundImage: `
  linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.9) 0%, 
    rgba(0, 0, 0, 0) 100%   
  ),
  url(/images/credits/CreditsMainImg.png)
`,
  repeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}));

export const CreditListMainBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: '#07030E',
  zIndex: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  paddingTop: theme.spacing(2.5),
  paddingLeft: theme.spacing(1.875),
  paddingRight: theme.spacing(2.75),
  borderTopLeftRadius: '24px',
  borderTopRightRadius: '24px',
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: '0',
  position: 'relative',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  maxHeight: '73vh',
  paddingBottom: theme.spacing(2)
}));

export const CreditTypography = styled(UINewTypography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '28.8px'
}));

export const CreditListContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  border: '1px solid #D4D3D63D'
}));

export const CreditInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5)
}));

export const CreditPriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

export const CreditAmountBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.25),
  alignItems: 'center'
}));

export const CloseButtonContainer = styled(Close)(({ theme }) => ({
  color: theme.palette.text.secondary,
  height: 30,
  width: 30,
  border: '1px solid #E9E8EB33',
  borderRadius: '5px'
}));
