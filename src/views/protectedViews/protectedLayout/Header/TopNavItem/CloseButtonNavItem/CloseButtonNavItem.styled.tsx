import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

export const CloseButtonNavItemContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  paddingRight: `${theme.spacing(0)} !important`,
  boxShadow: 'none',
  borderBottom: '1px solid',
  borderColor: theme.palette.secondary.light,
  position: 'fixed'
}));

export const ToolBarContainer = styled(Toolbar)(() => ({ justifyContent: 'space-between' }));
