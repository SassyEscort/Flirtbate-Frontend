import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'themes/theme';
import Image from 'next/image';
import Box from '@mui/material/Box';
import UINewTypography from 'components/UIComponents/UINewTypography';
import {
  BannerContainer,
  ButtonContainer,
  DetailContainer,
  DetailSubContainer,
  ImageContainer,
  InlineBox,
  InlineBoxRelative,
  InlineBoxRelativeNocolor,
  TypographyBox
} from './HomeModelTopBanner.styled';
import UIThemeShadowButton from 'components/UIComponents/UIStyledShadowButton';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ModelSignup from 'views/modelViews/modelSignup';
import ModelSignin from 'views/modelViews/modelSignin';
import HomeMainModelContainer from 'views/modelViews/modelLayout/homeModelContainer';
import UIStyledDialog from 'components/UIComponents/UIStyledDialog';
import ModelForgetPasswordLink from 'views/modelViews/modelForgetPasswordLink';

const HomeModelTopBanner = () => {
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.down(330));
  const [open, setIsOpen] = useState(false);
  const [openLogin, setIsOpenLogin] = useState(false);
  const [openForgetPassLink, setOpenForgetPassLink] = useState(false);

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

  return (
    <>
      <HomeMainModelContainer>
        <BannerContainer>
          <DetailContainer>
            <DetailSubContainer>
              <InlineBox>
                <FormattedMessage id="JoinOurPremier" />
                {(!isSmDown || isSm) && ' platform and connect with a'} &nbsp;
                <Box component="span" position="relative">
                  {isSmDown && !isSm && <InlineBoxRelativeNocolor>platform and connect</InlineBoxRelativeNocolor>}
                  <InlineBoxRelative>
                    {isSmDown && !isSm && (
                      <UINewTypography variant="MediumSemiBoldText" color="common.white" textAlign="center">
                        <FormattedMessage id="WithA" />
                        &nbsp;
                      </UINewTypography>
                    )}
                    <Box component="span" sx={{ zIndex: 1, position: 'relative', textWrap: isSm ? 'wrap' : 'nowrap' }}>
                      <FormattedMessage id="GlobalAudience" /> &nbsp;
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
            </DetailSubContainer>
            <ButtonContainer>
              <UIThemeShadowButton onClick={handleSignupOpen} variant="contained" sx={{ width: '100%', maxWidth: '195px' }}>
                <UINewTypography variant="body" sx={{ lineHeight: '150%' }}>
                  <FormattedMessage id="JoinForFREE" />
                </UINewTypography>
              </UIThemeShadowButton>
            </ButtonContainer>
          </DetailContainer>

          <ImageContainer>
            <Image
              alt="home_model"
              width={isSm && isSmDown ? 300 : isSmDown ? 347 : 639}
              height={isSmDown ? 300 : 519}
              src="/images/modelHomePage/Model-Hero-area.webp"
              style={{ borderRadius: '12px', right: 0 }}
              priority
            />
          </ImageContainer>
        </BannerContainer>
        <UIStyledDialog scroll="body" open={open} onClose={handleSignupClose} maxWidth="md" fullWidth>
          <ModelSignup onClose={handleSignupClose} onLoginOpen={handleLoginOpen} />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openLogin} onClose={handleLoginClose} maxWidth="md" fullWidth>
          <ModelSignin onClose={handleLoginClose} onSignupOpen={handleSignupOpen} onFogotPasswordLinkOpen={handleResetPasswordLinkOpen} />
        </UIStyledDialog>
        <UIStyledDialog scroll="body" open={openForgetPassLink} onClose={handleResetPasswordLinkClose} maxWidth="md" fullWidth>
          <ModelForgetPasswordLink onClose={handleResetPasswordLinkClose} onLoginOpen={handleLoginResetPasswordOpen} />
        </UIStyledDialog>
      </HomeMainModelContainer>
    </>
  );
};

export default HomeModelTopBanner;
