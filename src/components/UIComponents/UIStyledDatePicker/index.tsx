import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

export const UIStyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: '100%',

  ':hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '2px solid',
    borderColor: theme.palette.primary[700]
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px'
  },

  '& .MuiSvgIcon-root': {
    color: '#86838A'
  },
  ' .MuiOutlinedInput-input': {
    pr: 0
  },
  '& .MuiInputBase-root-MuiOutlinedInput-root': {
    pl: 0
  },
  '& .MuiIconButton-root': {
    color: theme.palette.secondary[700]
  },
  '& .mui-1p7fmjl-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: '13px 10px;'
  }
}));