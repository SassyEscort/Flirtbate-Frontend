import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const SidebarDropDownMainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  minWidth: '180px',
  height: '100%',
  borderRadius: '12px',
  padding: '14px 16px',
  backgroundColor: theme.palette.secondary[500],
  flexDirection: 'column'
}));