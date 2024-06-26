import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const UIStyledSelectButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  borderRadius: '8px',
  width: '100%',
  height: '48px !important',
  backgroundColor: theme.palette.primary[700],
  color: theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '21.86px',
  '&:hover': {
    '.MuiOutlinedInput-notchedOutline': {
      backgroundColor: theme.palette.secondary[800]
    }
  }
}));

export const LiveIconFirstBoxWorkerCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '24px',
  height: '100%',
  minHeight: '24px',
  border: '1px',
  borderColor: theme.palette.secondary[400],
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary[400],
  justifyContent: 'center',
  alignItems: 'center'
}));

export const LiveIconSecBoxWorkerCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: '16px',
  height: '100%',
  minHeight: '16px',
  border: '1px',
  borderColor: theme.palette.success[100],
  borderRadius: '50%',
  backgroundColor: theme.palette.success[100]
}));
