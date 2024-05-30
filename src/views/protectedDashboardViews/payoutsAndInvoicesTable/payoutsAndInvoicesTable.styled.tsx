import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import UINewTypography from 'components/UIComponents/UINewTypography';

export const FilterDropdownBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: '44px',
  width: '100%',
  maxWidth: '741px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

export const StatusBox = styled(Box)(() => ({
  padding: '4px 12px 4px 20px',
  borderRadius: '48px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
  height: '100%',
  minHeight: '25px'
}));

export const MainBox = styled(Box)(() => ({
  width: '100%',
  maxWidth: '741px'
}));

export const TypographyBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(7)
}));

export const TableBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

export const StackBox = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  color: theme.palette.text.secondary,
  width: '100%',
  maxWidth: '312px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '312px'
  }
}));

export const UINewTypographyBox = styled(UINewTypography)(({ theme }) => ({
  fontSize: '38px !important',
  lineHeight: '47.5px',
  fontWeight: 700,
  [theme.breakpoints.down('md')]: {
    fontSize: '24px !important',
    lineHeight: '30px',
    fontWeight: 700
  }
}));

export const FilterMainBox = styled(UINewTypography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: theme.spacing(2)
}));

export const ResetMainBox = styled(UINewTypography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));
