import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '85px',
  width: '100%',
  height: '100%',
  position: 'relative',

  [theme.breakpoints.down('sm')]: {
    gap: '48px',
    flexDirection: 'column'
  },
  [theme.breakpoints.up('lg')]: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  },
  [theme.breakpoints.up('lg')]: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  '&.last-child-box': {
    flex: 'initial',
    alignItems: 'initial',
    justifyContent: 'initial'
  }
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'inline',
  fontsize: theme.typography.h1.fontSize,
  fontWeight: 700,
  lineHeight: '64.8px'
}));

export const InlineBox = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  flexFlow: 'column-wrap',
  wordBreak: 'break-word',
  display: 'inline',
  [theme.breakpoints.down('sm')]: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '50px',
    textAlign: 'center',
    textWrap: 'nowrap'
  },
  [theme.breakpoints.down(330)]: {
    textWrap: 'wrap'
  },
  [theme.breakpoints.only('sm')]: {
    textAlign: 'left'
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: '62px'
  }
}));

export const TypographyBox = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  width: '100%',
  maxWidth: '600px',
  color: theme.palette.secondary[100],
  [theme.breakpoints.down('sm')]: {
    maxWidth: '293px',
    fontSize: 14,
    lineHeight: '24px',
    textAlign: '-webkit-center',
    fontWeight: 400
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 20,
    lineHeight: '32px'
  }
}));

export const Banner = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(/images/NewThemeImages/home/banner-bg.webp)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 267,
  justifyContent: 'center',
  width: '100%',
  marginBottom: theme.spacing(7),
  [theme.breakpoints.down('sm')]: {
    height: 450,
    marginBottom: theme.spacing(4)
  }
}));

export const InlineBoxRelative = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  color: theme.palette.primary[600],
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center'
  }
}));

export const HomeExploreBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(1.5),
  [theme.breakpoints.only('sm')]: {
    gap: theme.spacing(2)
  },
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2)
  }
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('sm')]: {
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '32px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '32px',
    whiteSpace: 'nowrap'
  },
  [theme.breakpoints.down(330)]: {
    whiteSpace: 'normal'
  }
}));

export const TextBoxContainer = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '32px',
    whiteSpace: 'nowrap'
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '32px'
  }
}));

export const ModelsHeadingBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const FristBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  maxHeight: '152px',
  gap: theme.spacing(2),
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const SecondBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center'
  }
}));

export const TopBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(6.75)
  },
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(8)
  }
}));

export const ThirdBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
}));

export const TextContainer = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2)
  },
  [theme.breakpoints.up('sm')]: {
    paddingTop: 0
  }
}));

export const SignupTextContainer = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px'
}));

export const ExploreTextContainer = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '19.2px'
}));
