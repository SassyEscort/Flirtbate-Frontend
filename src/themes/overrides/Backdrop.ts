import { alpha } from '@mui/material/styles';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Backdrop(theme: any) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8)
        },
        invisible: {
          background: 'transparent'
        }
      }
    }
  };
}
