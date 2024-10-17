import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'themes/theme';
import Image from 'next/image';
import Box from '@mui/material/Box';
import UINewTypography from 'components/UIComponents/UINewTypography';
import {
  BannerContainer,
  InlineBox,
  InlineBoxRelative,
  TypographyBox,
  HomeExploreBox,
  SubTitle,
  TextBoxContainer,
  ModelsHeadingBox,
  FristBoxContainer,
  SecondBoxContainer,
  TopBoxContainer,
  ThirdBoxContainer,
  TextContainer,
  SignupTextContainer,
  ExploreTextContainer,
  FirstBoxContainer,
  SecBoxContainer,
  GiftBoxFirst,
  GiftBoxSecond
} from './HomeBanner.styled';
import UIThemeShadowButton from 'components/UIComponents/UIStyledShadowButton';
import Dialog from '@mui/material/Dialog';
import { memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { User } from 'app/(guest)/layout';
import StyleButtonShadowV2 from 'components/UIComponents/StyleLoadingButtonshadow';
import ButtonFreeCredits from '../buttonFreeCredits';
import React from 'react';
import { NewUIStyledSignUpDialog } from 'components/UIComponents/UIStyledDialog';
import { gaEventTrigger } from 'utils/analytics';
import { PROVIDERCUSTOM_TYPE } from 'constants/signUpConstants';
import { useAuthContext } from '../../../../../context/AuthContext';
import { BannerImageCard } from 'views/guestViews/commonComponents/WorkerCard/WorkerCard.styled';
import GuestForgetPasswordLink from 'views/auth/guestForgetPasswordLink';
import GuestLogin from 'views/auth/guestLogin';
import GuestSignup from 'views/auth/guestSignup';
import HomePageFreeSignup from 'views/auth/homePageFreeSignup';

const HomeTopBanner = ({ isFreeCreditAvailable }: { isFreeCreditAvailable: number }) => {
  const { session } = useAuthContext();

  const [isModalOpenFreeCredits, setIsModalOpenFreeCredits] = useState(false);
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.down(330));
  const [open, setIsOpen] = useState(false);
  const [openLogin, setIsOpenLogin] = useState(false);
  const [openForgetPassLink, setOpenForgetPassLink] = useState(false);
  // const [openDropDown, setOpenDropDown] = useState(false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [freeSignupOpen, setFreeSignupOpen] = useState(false);

  // const handleDropDownOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpenDropDown(true);
  // };

  // const handleDropDownClose = () => {
  //   setOpenDropDown(false);
  // };

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

  const handleFreeCreditSignupOpen = () => {
    gaEventTrigger('Signup_Button_clicked', { source: 'home_banner', category: 'Button' });
    setFreeSignupOpen(true);
    handleCloseModal();
    setIsOpenLogin(false);
  };

  const handleFreeCreditSignupClose = () => {
    setFreeSignupOpen(false);
    setIsOpenLogin(false);
  };

  const handleClickScroll = () => {
    setLoading(true);
    setTimeout(() => {
      const element = document.querySelector(`#scroll-to-model`) as HTMLElement;
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setLoading(false);
    }, 1000);
  };

  const handleBoxClick = () => {
    setIsModalOpenFreeCredits(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenFreeCredits(false);
  };

  return (
    <>
      {(session?.user as User)?.provider === PROVIDERCUSTOM_TYPE.PROVIDERCUSTOM ? (
        <TopBoxContainer>
          <FristBoxContainer>
            <UINewTypography variant="MediumSemiBold" width="100%" maxWidth="710px" color="text.secondary">
              <FormattedMessage id="ExploreYourChoicesFrom" />
            </UINewTypography>
            <TextBoxContainer color="secondary.100">
              <FormattedMessage id="SelectTheCompanionWho" />
            </TextBoxContainer>
          </FristBoxContainer>
        </TopBoxContainer>
      ) : (
        <>
          <BannerContainer>
            <FirstBoxContainer>
              <SecBoxContainer>
                <InlineBox>
                  <FormattedMessage id="ExperienceThe" /> {!isSmDown && 'of'} {!isSmDown || (isSm && 'of')} &nbsp;
                  <Box component="span" position="relative">
                    <InlineBoxRelative>
                      {isSmDown && !isSm && (
                        <UINewTypography variant="MediumSemiBoldText" color="common.white" textAlign="center">
                          <FormattedMessage id="Of" /> &nbsp;
                        </UINewTypography>
                      )}
                      <Box component="span" sx={{ zIndex: 1, position: 'relative', textWrap: isSm ? 'wrap' : 'nowrap' }}>
                        <FormattedMessage id="LiveInteractions" /> &nbsp;
                      </Box>
                      <Image
                        alt="word_underline"
                        src="/images/home/line-vector.svg"
                        width={100}
                        height={32}
                        style={{
                          position: 'absolute',
                          top: isSmDown ? 30 : 44,
                          left: isSmDown && !isSm ? 80 : isSm ? 16 : 0,
                          maxWidth: isSmDown ? '239.52px' : '354.18px',
                          width: '100%'
                        }}
                        priority
                      />
                    </InlineBoxRelative>
                  </Box>
                </InlineBox>
                <TypographyBox>
                  <FormattedMessage id="DiscoverTheThrill" />
                </TypographyBox>
              </SecBoxContainer>
              <ThirdBoxContainer>
                {isSmDown ? (
                  <SecondBoxContainer>
                    <UIThemeShadowButton
                      onClick={isFreeCreditAvailable ? handleFreeCreditSignupOpen : handleSignupOpen}
                      variant="contained"
                    >
                      <SignupTextContainer>
                        <FormattedMessage id="SignUpNow" />
                      </SignupTextContainer>
                      <Box component="img" src="/images/icons/signup-img.png" sx={{ width: '16px', height: '16px' }} alt="signup" />
                    </UIThemeShadowButton>
                    <ExploreTextContainer onClick={handleClickScroll}>
                      <FormattedMessage id="ExploreModels" />
                    </ExploreTextContainer>
                  </SecondBoxContainer>
                ) : (
                  <StyleButtonShadowV2 onClick={handleClickScroll} variant="contained" loading={loading}>
                    <TextContainer>
                      <FormattedMessage id="ExploreModels" />
                    </TextContainer>
                  </StyleButtonShadowV2>
                )}
              </ThirdBoxContainer>
            </FirstBoxContainer>
            <BannerImageCard>
              <picture>
                <Image
                  alt="home_model"
                  decoding="async"
                  width={isSm && isSmDown ? 300 : isSmDown ? 347 : 462}
                  height={isSmDown ? 339 : 452}
                  src="https://ik.imagekit.io/gpgv4gnda/images/1729084436818home-banner-model1_1qobIoZFu.webp"
                  placeholder="blur"
                  blurDataURL="/images/home/home-banner-blur.webp"
                  style={{ borderRadius: '12px', right: 0 }}
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 600px) 300px, (max-width: 768px) 347px, 462px"
                />
              </picture>
            </BannerImageCard>
          </BannerContainer>
          {isSmDown && (
            <ButtonFreeCredits open={isModalOpenFreeCredits} onClose={handleCloseModal} onSignupOpen={handleFreeCreditSignupOpen} />
          )}{' '}
          {isSmDown && isFreeCreditAvailable && !isModalOpenFreeCredits && !freeSignupOpen && !openLogin && (
            <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={handleBoxClick}>
              <GiftBoxFirst />
              <GiftBoxSecond />
              {/* <GiftBoxThird></GiftBoxThird> */}
            </Box>
          )}
          <ModelsHeadingBox id="scroll-to-model" pt={{ xs: '96px', lg: '120px' }}>
            <HomeExploreBox>
              <UINewTypography
                textAlign="center"
                color="text.secondary"
                sx={{ fontSize: { xs: '24px', sm: '40px' }, fontWeight: 700, lineHeight: { xs: '32px', sm: '52px' } }}
              >
                <FormattedMessage id="ExploreYourChoices" />
              </UINewTypography>

              <SubTitle>
                <FormattedMessage id="SelectTheCompanion" />
              </SubTitle>
            </HomeExploreBox>
          </ModelsHeadingBox>
        </>
      )}
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#07030E',
            borderRadius: '12px'
          },
          '& .MuiDialog-container': {
            backgroundColor: 'linear-gradient(rgba(19, 6, 23, 1)), rgba(7, 3, 14, 1))',
            backdropFilter: 'blur(12px)'
          }
        }}
        PaperProps={{
          sx: {
            maxWidth: 1080,
            borderRadius: '12px'
          }
        }}
        open={open}
        onClose={handleSignupClose}
        maxWidth="md"
        fullWidth
      >
        <GuestSignup onClose={handleSignupClose} onLoginOpen={handleLoginOpen} />
      </Dialog>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#07030E',
            borderRadius: '12px'
          },
          '& .MuiDialog-container': {
            backgroundColor: 'linear-gradient(rgba(19, 6, 23, 1)), rgba(7, 3, 14, 1))',
            backdropFilter: 'blur(12px)'
          }
        }}
        PaperProps={{
          sx: {
            maxWidth: 920,
            borderRadius: '12px'
          }
        }}
        open={openLogin}
        onClose={handleLoginClose}
        maxWidth="md"
        fullWidth
      >
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
      </Dialog>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#07030E',
            borderRadius: '12px'
          },
          '& .MuiDialog-container': {
            backgroundColor: 'linear-gradient(rgba(19, 6, 23, 1)), rgba(7, 3, 14, 1))',
            backdropFilter: 'blur(12px)'
          }
        }}
        PaperProps={{
          sx: {
            maxWidth: 920,
            borderRadius: '12px'
          }
        }}
        open={openForgetPassLink}
        onClose={handleResetPasswordLinkClose}
        maxWidth="md"
        fullWidth
      >
        <GuestForgetPasswordLink onClose={handleResetPasswordLinkClose} onLoginOpen={handleLoginResetPasswordOpen} />
      </Dialog>
      <NewUIStyledSignUpDialog scroll="body" open={freeSignupOpen} maxWidth="md" fullWidth>
        <HomePageFreeSignup onLoginOpen={handleLoginOpen} onClose={handleFreeCreditSignupClose} />
      </NewUIStyledSignUpDialog>
      {/* <ProfileMenu open={openDropDown} handleClose={handleDropDownClose} anchorEl={anchorEl} onSignupOpen={handleSignupOpen} /> */}
    </>
  );
};

export default memo(HomeTopBanner);
