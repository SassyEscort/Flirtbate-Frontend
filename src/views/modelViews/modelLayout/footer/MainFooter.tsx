import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import {
  DividerUILine,
  FirstBoxContainerMain,
  FooterStoreBox,
  FooterSubICon,
  ModelFooterHead,
  ModelUITextConatinerText
} from './MainFooter.styled';
import { FooterCityList } from './footer.constants';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'themes/theme';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { FormattedMessage } from 'react-intl';
import { ModelUITextConatiner } from 'views/auth/AuthCommon.styled';
import UIStyledDialog from 'components/UIComponents/UIStyledDialog';
import ModelSignup from 'views/modelViews/modelSignup';
import ModelSignin from 'views/modelViews/modelSignin';
import ModelForgetPasswordLink from 'views/modelViews/modelForgetPasswordLink';
// import ModelNewPassword from 'views/modelViews/ModelNewPassword';
import { useEffect, useState } from 'react';
import { MODEL_ACTIVE_STEP } from 'constants/workerVerification';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { getUserDataClient } from 'utils/getSessionData';
import { gaEventTrigger } from 'utils/analytics';
import { useAuthContext } from '../../../../../context/AuthContext';

const MainFooter = () => {
  const { isCustomer } = useAuthContext();

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  // const url = new URL(window.location.href);
  // const email = url.searchParams.get('email');
  // const emailCode = url.searchParams.get('code');
  // const emailId = url.searchParams.get('id');
  const [open, setIsOpen] = useState(false);
  const [openLogin, setIsOpenLogin] = useState(false);
  const [openForgetPassLink, setOpenForgetPassLink] = useState(false);
  const [modelDetails, setModelDetails] = useState<ModelDetailsResponse>();
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  // const [openChangePassword, setIsOpenChangePassword] = useState(email && emailCode && !emailId ? true : false);

  const handleSignupOpen = () => {
    setIsOpen(true);
    setIsOpenLogin(false);
    gaEventTrigger('Model_Signup_Button_clicked', { source: 'footer', category: 'Button' });
  };
  const handleLoginOpen = () => {
    setIsOpen(false);
    setIsOpenLogin(true);
    gaEventTrigger('Model_Login_Button_clicked', { source: 'footer', category: 'Button' });
  };

  const handleSignupClose = () => {
    setIsOpen(false);
  };

  const handleLoginClose = () => {
    setIsOpenLogin(false);
  };
  const handleResetPasswordLinkOpen = () => {
    setIsOpenLogin(false);
    setOpenForgetPassLink(true);
  };

  const handleLoginResetPasswordOpen = () => {
    setOpenForgetPassLink(false);
    setIsOpenLogin(true);
  };

  const handleResetPasswordLinkClose = () => {
    setOpenForgetPassLink(false);
  };

  // const handleChangePasswordClose = () => {
  //   setIsOpenChangePassword(false);
  // };
  // const handleLoginChangePasswordOpen = () => {
  //   setIsOpenChangePassword(false);
  //   setIsOpenLogin(true);
  // };

  const isVerificationPendingOrCompleted = (step: string | undefined) => {
    return step === MODEL_ACTIVE_STEP.IN_REVIEW || step === MODEL_ACTIVE_STEP.ONBOARDED || step === MODEL_ACTIVE_STEP.VERIFIED;
  };

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      if (data) {
        setToken({ id: data.id, token: data.token });
      }
    };

    userToken();
  }, []);

  useEffect(() => {
    const modelDetails = async () => {
      const modelData = await ModelDetailsService.getModelDetails(token.token, isCustomer);
      if (modelData) {
        setModelDetails(modelData.data);
      }
    };
    if (token.token) {
      modelDetails();
    }
  }, [isCustomer, token.id, token.token]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <DividerUILine orientation="horizontal" flexItem />
        </Box>
        <Box mt={'32px'}>
          <Box sx={{ display: 'flex', flexDirection: isSmDown ? 'column' : 'row', justifyContent: 'space-between', px: 1.5 }}>
            <ModelUITextConatinerText>
              <Link prefetch={false} href="/">
                <Image
                  src="/images/logo-footer.png"
                  width={220}
                  height={44}
                  alt="sassy_logo"
                  style={{
                    width: 'auto'
                  }}
                  loading="lazy"
                />
              </Link>
              <Box>
                <ModelFooterHead variant="bodySmall">
                  <FormattedMessage id="InstantConnections" />
                </ModelFooterHead>
              </Box>
              <FooterStoreBox>
                <Box>
                  <Link href="https://play.google.com/store/apps/details?id=com.holo.hsvm.prod&hl=en" target="_blank">
                    <Image
                      src="/images/app-logo/google-pay.png"
                      width={120}
                      height={120}
                      alt="play_store"
                      style={{
                        width: 'auto'
                      }}
                      loading="lazy"
                    />
                  </Link>
                </Box>
                <Box>
                  <Link href="https://apps.apple.com/in/app/book-my-artist-provider/id6630371131" target="_blank">
                    <Image
                      src="/images/app-logo/app-store.png"
                      width={120}
                      height={120}
                      alt="app_store"
                      style={{
                        width: 'auto'
                      }}
                      loading="lazy"
                    />
                  </Link>
                </Box>
              </FooterStoreBox>
              {/* <GradientTypography variant="body">
                <FormattedMessage id="AppComingSoon" />
              </GradientTypography> */}
            </ModelUITextConatinerText>

            <FirstBoxContainerMain>
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
                    <Link prefetch={false} href="/faq">
                      <FormattedMessage id="FAQs" />
                    </Link>
                  </UINewTypography>
                  {token.token && isVerificationPendingOrCompleted(modelDetails?.verification_step) ? (
                    // <Link href="/">
                    //   <UINewTypography variant="SubtitleSmallRegular" sx={{ cursor: 'pointer' }}>
                    //     <FormattedMessage id="ExploreModels" />
                    //   </UINewTypography>
                    // </Link>
                    <></>
                  ) : (
                    <UINewTypography variant="SubtitleSmallRegular" onClick={handleSignupOpen} sx={{ cursor: 'pointer' }}>
                      <FormattedMessage id="SignUp" />
                    </UINewTypography>
                  )}
                  {!token.token && (
                    <UINewTypography variant="SubtitleSmallRegular" onClick={handleLoginOpen} sx={{ cursor: 'pointer' }}>
                      <FormattedMessage id="LogIn" />
                    </UINewTypography>
                  )}
                  {/* {!token.token && (
                    <UINewTypography variant="SubtitleSmallRegular">
                      <Link prefetch={false} href="/">
                        <FormattedMessage id="LookingForA" />
                      </Link>
                    </UINewTypography>
                  )} */}
                </ModelUITextConatiner>
              </FooterSubICon>

              <FooterSubICon sx={{ flexDirection: 'column', display: 'flex', textAlign: 'left' }}>
                <UINewTypography sx={{ mb: '6px' }} variant="captionBold">
                  <FormattedMessage id="Resources" />
                </UINewTypography>
                {FooterCityList?.map((val, index) => (
                  <UINewTypography variant="SubtitleSmallRegular" key={index}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                      component={Link}
                      prefetch={false}
                      shallow={true}
                      href={`${val?.link}`}
                    >
                      <FormattedMessage id={val?.name} />
                    </Box>
                  </UINewTypography>
                ))}
              </FooterSubICon>
            </FirstBoxContainerMain>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: isSmDown ? '32px' : '32px', pb: '20px' }}>
          <UINewTypography variant="SubtitleSmallRegular">
            <FormattedMessage id="2024SassyEscort" />
          </UINewTypography>
        </Box>
      </Box>
      <UIStyledDialog scroll="body" open={open} onClose={handleSignupClose} maxWidth="md" fullWidth>
        <ModelSignup onClose={handleSignupClose} onLoginOpen={handleLoginOpen} />
      </UIStyledDialog>
      <UIStyledDialog scroll="body" open={openLogin} onClose={handleLoginClose} maxWidth="md" fullWidth>
        <ModelSignin onClose={handleLoginClose} onSignupOpen={handleSignupOpen} onFogotPasswordLinkOpen={handleResetPasswordLinkOpen} />
      </UIStyledDialog>
      <UIStyledDialog scroll="body" open={openForgetPassLink} onClose={handleResetPasswordLinkClose} maxWidth="md" fullWidth>
        <ModelForgetPasswordLink onClose={handleResetPasswordLinkClose} onLoginOpen={handleLoginResetPasswordOpen} />
      </UIStyledDialog>
      {/* <UIStyledDialog scroll="body" open={openChangePassword} onClose={handleChangePasswordClose} maxWidth="md" fullWidth>
        <ModelNewPassword email={String(email)} onClose={handleChangePasswordClose} onLoginOpen={handleLoginChangePasswordOpen} />
      </UIStyledDialog> */}
    </>
  );
};

export default MainFooter;
