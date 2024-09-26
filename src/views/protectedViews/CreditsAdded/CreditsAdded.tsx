'use client';
import Divider from '@mui/material/Divider';
import UINewTypography from 'components/UIComponents/UINewTypography';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import UIThemeShadowButton from 'components/UIComponents/UIStyledShadowButton';
import {
  CreditsAddedMainBox,
  HeadingContainer,
  CreditsCloseIconContainer,
  CreditsBodyContainer,
  ImageContainer,
  UINewTypographyNew,
  NewBalanceDetailsConatainer,
  AddedCreditsContainer,
  NewBalanceDetails,
  ExploreButtonContainer,
  NewUIIconButton,
  RedirectInfoBox
} from './CreditsAddded.styled';

import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
function CreditsAdded({
  onClose,
  addedCredits,
  newBalance,
  isOutOfCredits
}: {
  onClose: () => void;
  addedCredits: number;
  newBalance: number;
  isOutOfCredits: boolean;
}) {
  const [redirectSeconds, setRedirectSeconds] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirectSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (redirectSeconds === 0) {
      clearTimeout(timer);
      onClose();
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectSeconds]);

  return (
    <CreditsAddedMainBox>
      <HeadingContainer>
        <UINewTypography variant="h6" color="common.white">
          <FormattedMessage id="Creditsadded" />
        </UINewTypography>
        <CreditsCloseIconContainer display="flex" alignItems="flex-end" justifyContent="flex-end">
          <NewUIIconButton onClick={onClose}>
            <CloseIcon />
          </NewUIIconButton>
        </CreditsCloseIconContainer>
      </HeadingContainer>
      <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
      <CreditsBodyContainer>
        <ImageContainer>
          <Image alt="home_model" width={217} height={226} src="/images/credits/Frame.webp" />
        </ImageContainer>
        <AddedCreditsContainer>
          <UINewTypographyNew>
            {addedCredits?.toFixed(2) || 0} <FormattedMessage id="NewCredits" />
          </UINewTypographyNew>
        </AddedCreditsContainer>
        <NewBalanceDetailsConatainer>
          <UINewTypography>
            <FormattedMessage id="NewBalance" />
          </UINewTypography>
          <NewBalanceDetails>
            <Image alt="home_model" width={24} height={24} src="/images/workercards/dollar-img.avif" />
            <UINewTypography sx={{ pl: '8px' }}>
              {newBalance?.toFixed(2) || 0} <FormattedMessage id="Credits" />
            </UINewTypography>
          </NewBalanceDetails>
        </NewBalanceDetailsConatainer>
        {!isOutOfCredits ? (
          <ExploreButtonContainer>
            <Link prefetch={false} href="/">
              <UIThemeShadowButton variant="contained" sx={{ p: '10px 29px', width: '176px' }}>
                <UINewTypography variant="buttonLargeBold" color="white.main" whiteSpace={'nowrap'}>
                  <FormattedMessage id="ExploreModels" />
                </UINewTypography>
              </UIThemeShadowButton>
            </Link>
          </ExploreButtonContainer>
        ) : (
          <ExploreButtonContainer>
            <RedirectInfoBox>
              <UINewTypography variant="bodySmallBold">
                <FormattedMessage id="PleaseWait" />
              </UINewTypography>
              <UINewTypography variant="body">
                <FormattedMessage id="RedirectingIn" />
                {''} {redirectSeconds} {''}
                <FormattedMessage id="Sec" />
              </UINewTypography>
            </RedirectInfoBox>
          </ExploreButtonContainer>
        )}
      </CreditsBodyContainer>
    </CreditsAddedMainBox>
  );
}

export default CreditsAdded;
