'use client';
import {
  BoxImageBackground,
  BoxImageBackgroundChild,
  BoxMain,
  DullCircles,
  DullCircles2,
  DullCircles3,
  DullCircles4,
  DullCircles5,
  FirstTextTyporaphy,
  HomeMainBox,
  ImgBoxContainer,
  MainChildContainer,
  SeconBoxContainer,
  TextMainTitleTyporaphy,
  TextTitleTyporaphy,
  ThirdBoxContainer,
  VectorLines,
  VectorLinesMobile
} from './HomeConnections.styled';
import Box from '@mui/material/Box';
import UIThemeShadowButton from 'components/UIComponents/UIStyledShadowButton';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import HomeMainContainer from 'views/guestViews/guestLayout/homeContainer';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import UIStyledDialog from 'components/UIComponents/UIStyledDialog';
import GuestSignup from 'views/auth/guestSignup';
import GuestLogin from 'views/auth/guestLogin';
import GuestForgetPasswordLink from 'views/auth/guestForgetPasswordLink';
import GuestNewPassword from 'views/auth/guestNewPassword';
import { useRouter } from 'next/navigation';
import HomePageFreeSignup from 'views/auth/homePageFreeSignup';
import { gaEventTrigger } from 'utils/analytics';
import { useAuthContext } from '../../../../../context/AuthContext';

const HomeConnections = ({ isFreeCreditAvailable }: { isFreeCreditAvailable: number }) => {
  const { push } = useRouter();

  const url = new URL(window.location.href);
  const email = url.searchParams.get('email');
  const id = url.searchParams.get('id');
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setIsOpen] = useState(false);
  const [openLogin, setIsOpenLogin] = useState(false);
  const [openForgetPassLink, setOpenForgetPassLink] = useState(false);
  const [openChangePassword, setIsOpenChangePassword] = useState(email && !id && url.pathname !== '/profile' ? true : false);
  const [freeSignupOpen, setFreeSignupOpen] = useState(false);

  const { isCustomer } = useAuthContext();

  const handleSignupOpen = () => {
    setIsOpen(true);
    setIsOpenLogin(false);
  };

  const handleSignupClose = () => {
    setIsOpen(false);
  };

  const handleLoginOpen = () => {
    setIsOpen(false);
    setFreeSignupOpen(false);
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
    push('/');
    setIsOpenChangePassword(false);
  };

  const handleFreeCreditSignupOpen = () => {
    gaEventTrigger('Signup_Button_clicked', { source: 'home_connection', category: 'Button' });
    setFreeSignupOpen(true);
    setIsOpenLogin(false);
  };

  const handleFreeCreditSignupClose = () => {
    setFreeSignupOpen(false);
  };

  return (
    <>
      <HomeMainContainer>
        {!isCustomer ? (
          <Box
            sx={{
              position: 'relative',
              mt: isSmDown ? '96px' : '112px'
            }}
          >
            <DullCircles />
            <DullCircles2 />
            <DullCircles3 />
            <DullCircles4 />
            <DullCircles5 />
            {isSmDown ? <VectorLinesMobile /> : <VectorLines />}
            <HomeMainBox>
              <TextMainTitleTyporaphy>
                <FormattedMessage id="SeamlessConnections" />
              </TextMainTitleTyporaphy>
              <TextTitleTyporaphy>
                <FormattedMessage id="DiscoverHowEasy" />
              </TextTitleTyporaphy>
            </HomeMainBox>

            <MainChildContainer
              sx={{
                mt: isSmDown ? 7 : 15.5,
                flexDirection: isSmDown ? 'column' : 'row',
                gap: isSmDown ? 5 : 2
              }}
            >
              <BoxMain>
                <BoxImageBackground>
                  <BoxImageBackgroundChild>
                    <Image
                      alt="home_model"
                      width={24}
                      height={24}
                      src="/images/home-search-img.png"
                      style={{ width: isSmDown ? 20 : 24, height: isSmDown ? 20 : 24 }}
                    />
                  </BoxImageBackgroundChild>
                </BoxImageBackground>
                <FirstTextTyporaphy variant={isSmDown ? 'body' : 'h6'} color={'#E9E8EB'}>
                  <FormattedMessage id="SignUpLogIn" />
                </FirstTextTyporaphy>
                <SeconBoxContainer sx={{ mt: isSmDown ? 1.75 : 2 }}>
                  <UINewTypography
                    variant={isSmDown ? 'bodySmall' : 'bodyRegular'}
                    sx={{
                      width: '100%'
                    }}
                  >
                    <FormattedMessage id="CreateYourFreeAccount" />
                  </UINewTypography>
                </SeconBoxContainer>
              </BoxMain>

              <BoxMain>
                <BoxImageBackground>
                  <BoxImageBackgroundChild>
                    <Image
                      alt="home_model"
                      width={24}
                      height={24}
                      src="/images/home-choose-your-model-img.png"
                      style={{ width: isSmDown ? 20 : 24, height: isSmDown ? 20 : 24 }}
                    />
                  </BoxImageBackgroundChild>
                </BoxImageBackground>
                <FirstTextTyporaphy variant={isSmDown ? 'body' : 'h6'} color={'#E9E8EB'}>
                  <FormattedMessage id="ChooseYourModel" />
                </FirstTextTyporaphy>
                <SeconBoxContainer sx={{ mt: isSmDown ? 1.75 : 2 }}>
                  <UINewTypography
                    variant={isSmDown ? 'bodySmall' : 'bodyRegular'}
                    sx={{
                      width: '100%'
                    }}
                  >
                    <FormattedMessage id="WhetherYouAreSeekingPassionate" />
                  </UINewTypography>
                </SeconBoxContainer>
              </BoxMain>
              <ImgBoxContainer
                loading="lazy"
                src="/images/line.png"
                sx={{
                  display: isSmDown || isMdDown ? 'none' : 'block'
                }}
              />
              <BoxMain>
                <BoxImageBackground>
                  <BoxImageBackgroundChild>
                    <Image
                      alt="home_model"
                      width={24}
                      height={24}
                      src="/images/home-connect-instantly-img.png"
                      style={{ width: isSmDown ? 20 : 24, height: isSmDown ? 20 : 24 }}
                    />
                  </BoxImageBackgroundChild>
                </BoxImageBackground>
                <FirstTextTyporaphy variant={isSmDown ? 'body' : 'h6'} color={'#E9E8EB'}>
                  <FormattedMessage id="ConnectInstantly" />
                </FirstTextTyporaphy>

                <Box sx={{ width: '100%', maxWidth: '314px', mt: isSmDown ? 1.75 : 2 }}>
                  <UINewTypography
                    variant={isSmDown ? 'bodySmall' : 'bodyRegular'}
                    sx={{
                      width: '100%'
                    }}
                  >
                    <FormattedMessage id="StartAnEngagingConvo" />
                  </UINewTypography>
                </Box>
              </BoxMain>
            </MainChildContainer>

            <ThirdBoxContainer sx={{ mt: isSmDown ? 6 : 12 }}>
              <UIThemeShadowButton
                variant="contained"
                sx={{ width: '100%', maxWidth: '195px' }}
                onClick={isFreeCreditAvailable ? handleFreeCreditSignupOpen : handleSignupOpen}
              >
                <UINewTypography variant="buttonLargeBold" sx={{ lineHeight: '150%' }}>
                  <FormattedMessage id="SignUpNow" />
                </UINewTypography>
                <Box component="img" src="/images/icons/signup-img.png" sx={{ width: '16px', height: '16px' }} />
              </UIThemeShadowButton>
            </ThirdBoxContainer>
          </Box>
        ) : (
          ' '
        )}

        <UIStyledDialog scroll="body" open={open} onClose={handleSignupClose} maxWidth="md" fullWidth>
          <GuestSignup onClose={handleSignupClose} onLoginOpen={handleLoginOpen} />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openLogin} onClose={handleLoginClose} maxWidth="md" fullWidth>
          <GuestLogin
            isFreeCreditAvailable={isFreeCreditAvailable}
            onClose={handleLoginClose}
            onSignupOpen={handleSignupOpen}
            onFogotPasswordLinkOpen={handleResetPasswordLinkOpen}
            handleFreeCreditSignupOpen={handleFreeCreditSignupOpen}
            handleLoginOpen={handleLoginOpen}
            freeSignupOpen={freeSignupOpen}
            handleFreeCreditSignupClose={handleFreeCreditSignupClose}
            image="/images/auth/auth-model1.webp"
          />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openForgetPassLink} onClose={handleResetPasswordLinkClose} maxWidth="md" fullWidth>
          <GuestForgetPasswordLink onClose={handleResetPasswordLinkClose} onLoginOpen={handleLoginResetPasswordOpen} />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openChangePassword} onClose={handleChangePasswordClose} maxWidth="md" fullWidth>
          <GuestNewPassword email={String(email)} onClose={handleChangePasswordClose} onLoginOpen={handleLoginChangePasswordOpen} />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={freeSignupOpen} onClose={handleFreeCreditSignupClose} maxWidth="md" fullWidth>
          <HomePageFreeSignup onClose={handleFreeCreditSignupClose} onLoginOpen={handleLoginOpen} />
        </UIStyledDialog>
      </HomeMainContainer>
    </>
  );
};

export default HomeConnections;
