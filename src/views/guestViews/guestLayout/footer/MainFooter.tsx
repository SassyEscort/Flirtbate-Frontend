'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Image from 'next/image';
import { FooterSubICon } from './MainFooter.styled';
import { FooterCityList } from './footer.constants';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'themes/theme';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { FormattedMessage } from 'react-intl';
import { ModelUITextConatiner } from 'views/auth/AuthCommon.styled';

const MainFooter = () => {
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{ width: '100%', mt: isSmDown ? '25px' : '115px' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              borderColor: '#232027',
              width: '100%',
              maxWidth: isSmDown ? '363px' : '1244px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        </Box>
        <Box mt={'32px'}>
          <Box sx={{ display: 'flex', flexDirection: isSmDown ? 'column' : 'row', justifyContent: 'space-between', px: 1.5 }}>
            <ModelUITextConatiner
              sx={{
                alignItems: isSmDown ? 'center' : 'flex-start',
                textAlign: isSmDown ? 'center' : 'start',
                marginBottom: isSmDown ? 3 : 0,
                gap: 1
              }}
            >
              <Link prefetch={false} href="/">
                <Image
                  src="/images/logo-footer.png"
                  width={146}
                  height={64}
                  alt="sassy_logo"
                  style={{
                    width: 'auto'
                  }}
                  loading="lazy"
                />
              </Link>
              <Box>
                <UINewTypography
                  variant="bodySmall"
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '297px' },
                    display: 'flex',
                    textAlign: isSmDown ? 'center' : 'start',
                    alignItems: 'flex-start',
                    lineHeight: '140%'
                  }}
                >
                  <FormattedMessage id="OurPlatformIsLoved" />
                </UINewTypography>
              </Box>
            </ModelUITextConatiner>

            <Box sx={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <FooterSubICon sx={{ flexDirection: 'column', display: 'flex', textAlign: 'left' }}>
                <UINewTypography sx={{ mb: '6px' }} variant="captionBold">
                  <FormattedMessage id="Menu" />
                </UINewTypography>
                <ModelUITextConatiner sx={{ gap: 1 }}>
                  <UINewTypography variant="SubtitleSmallRegular">
                    <Link prefetch={false} href="/affiliate/program">
                      <FormattedMessage id="Home" />
                    </Link>
                  </UINewTypography>
                  <UINewTypography variant="SubtitleSmallRegular">
                    <Link prefetch={false} href="https://blog.sassyescort.com/" target="_blank">
                      <FormattedMessage id="HowItWorks" />
                    </Link>
                  </UINewTypography>

                  <UINewTypography variant="SubtitleSmallRegular">
                    <Link prefetch={false} href="/privacy-statement">
                      <FormattedMessage id="FAQs" />
                    </Link>
                  </UINewTypography>
                  <UINewTypography variant="SubtitleSmallRegular">
                    <Link prefetch={false} href="/cookie-statement">
                      <FormattedMessage id="SignUp" />
                    </Link>
                  </UINewTypography>
                  <UINewTypography variant="SubtitleSmallRegular">
                    <Link prefetch={false} href="/terms-and-conditions">
                      <FormattedMessage id="LogIn" />
                    </Link>
                  </UINewTypography>
                  <UINewTypography variant="SubtitleSmallRegular">
                    <Link prefetch={false} href="/model">
                      <FormattedMessage id="RegisterAsAModel" />
                    </Link>
                  </UINewTypography>
                </ModelUITextConatiner>
              </FooterSubICon>

              <FooterSubICon sx={{ flexDirection: 'column', display: 'flex', textAlign: 'left' }}>
                <UINewTypography sx={{ mb: '6px' }} variant="captionBold">
                  <FormattedMessage id="Resources" />
                </UINewTypography>
                {FooterCityList.map((val, index) => (
                  <UINewTypography variant="SubtitleSmallRegular" key={index}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                      component={Link}
                      prefetch={false}
                      shallow={true}
                      href={`/escorts/city${val.link}`}
                    >
                      {val.name}
                    </Box>
                  </UINewTypography>
                ))}
              </FooterSubICon>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: isSmDown ? '32px' : '32px' }}>
          <UINewTypography variant="SubtitleSmallRegular">
            <FormattedMessage id="2024SassyEscort" />
          </UINewTypography>
        </Box>
      </Box>
    </>
  );
};

export default MainFooter;
