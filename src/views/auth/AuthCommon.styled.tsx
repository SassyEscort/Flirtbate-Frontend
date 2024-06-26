import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import UINewTypography from 'components/UIComponents/UINewTypography';

export const AuthCommonBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '920px',
  border: '1px solid #FF68C0',
  paddingTop: 0,
  [theme.breakpoints.down('md')]: {
    border: 'none'
  },
  borderRadius: '12px',
  position: 'relative'
}));

export const AuthImageMobileBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'absolute',
  borderRadius: '12px',
  backgroundPosition: 'center',
  display: 'none',
  maxWidth: 420,
  [theme.breakpoints.up('sm')]: {
    maxWidth: '100%'
  },
  [theme.breakpoints.only('xs')]: {
    display: 'block'
  }
}));

export const AuthImageBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxWidth: '420px',
  backgroundSize: 'calc(100% - 320px) 100%, cover',
  backgroundPosition: 'right',
  borderRadius: '12px',
  backgroundRepeat: 'no-repeat',
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

export const AuthSignupSuccessMainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '509px',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '65px'
  }
}));

export const FirstImgAuthSignupSuccessContainer = styled('img')(() => ({
  width: '100%',
  maxWidth: '135.5px',
  height: '100%',
  maxHeight: '132.16px',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const SecContainerAuthSignupSuccessContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '509px',
  height: '100%',
  maxHeight: '309px',
  gap: theme.spacing(1)
}));

export const SubContainerAuthSignupSuccessContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const SecImgAuthSignupSuccessContainer = styled('img')(() => ({
  width: '100%',
  maxWidth: '359px',
  height: '100%',
  maxHeight: '110px'
}));

export const TextContainerAuthSignupSuccessContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: '509px',
  height: '100%',
  maxHeight: '100px',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  gap: theme.spacing(1)
}));

export const TextSubContainerAuthSignupSuccessContainer = styled(Box)(() => ({
  display: 'flex',
  height: '100%',
  maxHeight: '100px',
  textAlign: 'center',
  alignItems: 'center'
}));

export const ErrorBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  alignSelf: 'stretch',
  borderRadius: '16px 0px',
  backgroundColor: theme.palette.error[100],
  color: theme.palette.error[400],
  justifyContent: 'center'
}));

export const UITypographyText = styled(UINewTypography)(() => ({
  lineHeight: '25.6px',
  fontSize: '16px',
  fontWeight: '600'
}));

export const UIButtonText = styled(UINewTypography)(() => ({
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '19.2px'
}));

export const ModelUITextConatiner = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column'
}));
