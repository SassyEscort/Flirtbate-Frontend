import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const GalleryMainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

export const GalleryTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'center'
}));

export const GoldImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: theme.spacing(2.5),
  height: theme.spacing(2.5),
  padding: '2.5px 1.1px 2.227px 1.25px',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const GoldImageBox = styled('img')(() => ({
  width: '17.65px',
  height: '15.273px',
  filter: 'drop-shadow(0px 0px 6px rgba(255, 212, 0, 0.35))'
}));

export const GoldFeature = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  height: theme.spacing(4.5),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.primary[700]
}));

export const MenuBox = styled(Box)(({ theme }) => ({
  '& .menuButton': {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    '& .menuButton': {
      display: 'flex'
    }
  },
  '&:hover': {
    '& .menuButton': {
      display: 'flex'
    }
  }
}));

export const VideoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.spacing(2),
  position: 'relative',
  backgroundColor: theme.palette.primary[700]
}));

export const UploadBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  mt: theme.spacing(4),
  mb: theme.spacing(8)
}));

export const UploadMultipleBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '824px'
}));

export const UploadMultipleContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const UploadItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  alignSelf: 'stretch'
}));