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
import HomeMainContainer from '../homeContainer';
import UIStyledDialog from 'components/UIComponents/UIStyledDialog';
import GuestSignup from 'views/auth/guestSignup';
import GuestLogin from 'views/auth/guestLogin';
import GuestForgetPasswordLink from 'views/auth/guestForgetPasswordLink';
import GuestNewPassword from 'views/auth/guestNewPassword';
import { useState } from 'react';

const MainFooter = () => {
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const url = new URL(window.location.href);
  const email = url.searchParams.get('email');

  const [open, setIsOpen] = useState(false);
  const [openLogin, setIsOpenLogin] = useState(false);
  const [openForgetPassLink, setOpenForgetPassLink] = useState(false);
  const [openChangePassword, setIsOpenChangePassword] = useState(email && url.pathname !== '/profile' ? true : false);

  const handleSignupOpen = () => {
    setIsOpen(true);
    setIsOpenLogin(false);
  };

  const handleSignupClose = () => {
    setIsOpen(false);
  };

  const handleLoginOpen = () => {
    setIsOpen(false);
    setIsOpenLogin(true);
  };

  const handleLoginResetPasswordOpen = () => {
    setOpenForgetPassLink(false);
    setIsOpenLogin(true);
  };

  const handleLoginChangePasswordOpen = () => {
    setIsOpenChangePassword(false);
    setIsOpenLogin(true);
  };

  const handleLoginClose = () => {
    setIsOpenLogin(false);
  };

  const handleResetPasswordLinkOpen = () => {
    setIsOpenLogin(false);
    setOpenForgetPassLink(true);
  };

  const handleResetPasswordLinkClose = () => {
    setOpenForgetPassLink(false);
  };

  const handleChangePasswordClose = () => {
    setIsOpenChangePassword(false);
  };

  return (
    <>
      <HomeMainContainer>
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
                  <Image src="/images/logo-footer.png" width={219.87} height={43.68} alt="sassy_logo" loading="lazy" />
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
                    <FormattedMessage id="InstantConnections" />
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
                      <Link prefetch={false} href="/">
                        <FormattedMessage id="Home" />
                      </Link>
                    </UINewTypography>
                    <UINewTypography variant="SubtitleSmallRegular">
                      <Link prefetch={false} href="https://blog.sassyescort.com/" target="_blank">
                        <FormattedMessage id="HowItWorks" />
                      </Link>
                    </UINewTypography>

                    <UINewTypography variant="SubtitleSmallRegular">
                      <Link prefetch={false} href="/faq">
                        <FormattedMessage id="FAQs" />
                      </Link>
                    </UINewTypography>
                    <UINewTypography variant="SubtitleSmallRegular" sx={{ cursor: 'pointer' }} onClick={handleSignupOpen}>
                      <FormattedMessage id="SignUp" />
                    </UINewTypography>
                    <UINewTypography variant="SubtitleSmallRegular" sx={{ cursor: 'pointer' }} onClick={handleLoginOpen}>
                      <FormattedMessage id="LogIn" />
                    </UINewTypography>
                    <UINewTypography variant="SubtitleSmallRegular">
                      <Link prefetch={false} href="/model">
                        <FormattedMessage id="RegisterAsModel" />
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
                        <FormattedMessage id={val.name} />
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
        <UIStyledDialog scroll="body" open={open} onClose={handleSignupClose} maxWidth="md" fullWidth>
          <GuestSignup onClose={handleSignupClose} onLoginOpen={handleLoginOpen} />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openLogin} onClose={handleLoginClose} maxWidth="md" fullWidth>
          <GuestLogin
            onClose={handleLoginClose}
            onSignupOpen={handleSignupOpen}
            onFogotPasswordLinkOpen={handleResetPasswordLinkOpen}
            image="/images/auth/auth-model.webp"
          />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openForgetPassLink} onClose={handleResetPasswordLinkClose} maxWidth="md" fullWidth>
          <GuestForgetPasswordLink onClose={handleResetPasswordLinkClose} onLoginOpen={handleLoginResetPasswordOpen} />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openChangePassword} onClose={handleChangePasswordClose} maxWidth="md" fullWidth>
          <GuestNewPassword email={String(email)} onClose={handleChangePasswordClose} onLoginOpen={handleLoginChangePasswordOpen} />
        </UIStyledDialog>
      </HomeMainContainer>
    </>
  );
};

export default MainFooter;
