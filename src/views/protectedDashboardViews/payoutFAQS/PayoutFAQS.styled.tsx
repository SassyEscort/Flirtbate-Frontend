'use client';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import UINewTypography from 'components/UIComponents/UINewTypography';
import Typography from '@mui/material/Typography';

export const FAQMainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'start',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5)
  },
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2)
  }
}));

export const FAQSeconndContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(1.375),
    marginBottom: theme.spacing(6.625)
  }
}));

export const FAQConatainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(3)
  },
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2)
  }
}));
export const SecondBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(3)
  }
}));

export const PayoutFAQTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: 700,
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    lineHeight: '30px'
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '38px',
    lineHeight: '47.5px'
  }
}));

export const StyledAccordion = styled((props: AccordionProps) => <Accordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    padding: '0px',
    width: '100%',
    borderBottom: '1px solid',
    borderColor: theme.palette.primary[700],
    [theme.breakpoints.down('sm')]: {
      paddingTop: '12px 0px !important'
    },
    ':before': {
      height: 0
    },
    '& .MuiPaper-root .MuiPaper-elevation .MuiPaper-elevation0 .MuiAccordion-root .mui-style-1xh3qms-MuiPaper-root-MuiAccordion-root': {
      borderTop: '1px solid #265962'
    }
  })
);

export const StyledAccordionSummary = styled((props: AccordionSummaryProps) => <AccordionSummary {...props} />)(({ theme }) => ({
  color: theme.palette.secondary[100],
  padding: '0px',
  '&.MuiAccordionSummary-root': {
    minHeight: '0px !important '
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.text.primary
  },
  '& .mui-1betqn-MuiAccordionSummary-content': {
    marginTop: 8
  }
}));

export const StyledAccordionDetails = styled((props: AccordionDetailsProps) => <AccordionDetails {...props} />)(({ theme }) => ({
  padding: '0px',
  color: theme.palette.secondary[300],
  marginBottom: 24
}));

export const MainUINewTypography = styled(UINewTypography)(({ theme }) => ({
  fontSize: theme.spacing(2),
  fontWeight: 600,
  lineHeight: '25.6px',
  color: theme.palette.secondary['100'],
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}));
