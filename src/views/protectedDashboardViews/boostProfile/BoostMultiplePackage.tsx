'use client';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { FormattedMessage } from 'react-intl';
import {
  BoostPackageMainBoxContainer,
  BoxFirstTextContainer,
  BoxSecondTextContainer,
  CreditBuyText,
  CreditCardImage,
  DollarCreditText,
  FirstBoxContainer,
  HighlyAvailableBoxBoost,
  HighlyAvailableButtonBoxBoost,
  ImagSubContainer,
  MainImagContainer,
  PackageContainer
} from './BoostMultiplePackage.styled';
import { ProfilePlanResData } from 'services/commonApi/commonApi.services';
import { Box, Grid } from '@mui/material';
import { PackageTypography } from './boostProfile.styled';
import Image from 'next/image';
import StyledBoostChip from 'components/UIComponents/UIStyledBoostChip';

const BoostMultiplePackage = ({
  allPlans,
  handleBoostOpen
}: {
  allPlans: ProfilePlanResData[];
  handleBoostOpen: (planDetails: ProfilePlanResData) => void;
}) => {
  return (
    <>
      <BoostPackageMainBoxContainer>
        <UINewTypography variant="h5">
          <FormattedMessage id="ChooseABoostPackageToSpotligh" />
        </UINewTypography>
        <Box>
          <Grid container spacing={2.5} rowGap={1}>
            {allPlans?.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <PackageContainer onClick={() => handleBoostOpen(plan)}>
                  <FirstBoxContainer>
                    {Boolean(plan.is_free) && (
                      <HighlyAvailableButtonBoxBoost>
                        <HighlyAvailableBoxBoost>
                          <Image
                            src="/images/boostProfile/fire-ani.gif"
                            height={38}
                            width={24}
                            alt="fire_icon"
                            style={{
                              zIndex: 10,
                              left: '28px',
                              position: 'absolute',
                              bottom: '-72px'
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: '-72px',
                              left: '40px'
                            }}
                          >
                            <StyledBoostChip>
                              <UINewTypography variant="bodyUltraLarge" color="#000" sx={{ textWrap: 'nowrap' }}>
                                <FormattedMessage id="1BoostFREE" />
                              </UINewTypography>
                            </StyledBoostChip>
                          </Box>
                        </HighlyAvailableBoxBoost>
                      </HighlyAvailableButtonBoxBoost>
                    )}
                    <ImagSubContainer>
                      <MainImagContainer src={plan.link ?? '/images/boostFeature/boostPackOne.png'} />
                      <BoxFirstTextContainer>
                        <CreditCardImage src="/images/icons/boost-timer-icon.svg" />
                        <PackageTypography>
                          {plan.duration} <FormattedMessage id="Hours" />
                        </PackageTypography>
                      </BoxFirstTextContainer>
                      <BoxSecondTextContainer>
                        {!plan.is_free && (
                          <CreditBuyText variant="bodySmall" color="secondary.700">
                            <FormattedMessage id="BuyNowAt" />
                          </CreditBuyText>
                        )}
                        <DollarCreditText color="text.secondary">
                          {plan.is_free ? <FormattedMessage id="Free" /> : `$${plan.cost}`}
                        </DollarCreditText>
                      </BoxSecondTextContainer>
                    </ImagSubContainer>
                  </FirstBoxContainer>
                </PackageContainer>
              </Grid>
            ))}
          </Grid>
        </Box>
      </BoostPackageMainBoxContainer>
    </>
  );
};

export default BoostMultiplePackage;
