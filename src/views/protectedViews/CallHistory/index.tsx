'use client';
import { Divider, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import UIThemeShadowButton from 'components/UIComponents/UIStyledShadowButton';
import React from 'react';
import {
  CallAgainBox,
  CallHistoryBoxContainer,
  CallHistoryCreditBox,
  CallHistoryMainContainer,
  CallHistoryName,
  CallHistoryPaginationContainer,
  CallHistoryText,
  CreditUsedBox,
  DividerContainer,
  ImgBoxContainer,
  SecImgBoxContainer,
  SecondContainer,
  SecondSubContainer,
  SecondSubFirstBox,
  SecondSubFirstPartBox,
  SecondSubFirstPartSecondBox,
  SecondSubFirstPartSecondBoxFirstText,
  SecondSubFirstPartSecondBoxSecText,
  SecondSubFirstPartThiredBox,
  SecondSubFirstPartThiredBoxText,
  SecondSubTextMainContainer,
  WorkerImg
} from './CallHistory.styled';
import MainLayoutNav from '../protectedLayout';
import UINewTypography from 'components/UIComponents/UINewTypography';
import theme from 'themes/theme';
import { FormattedMessage } from 'react-intl';
import { UITheme2Pagination } from 'components/UIComponents/PaginationV2/Pagination.styled';

const CallHistory = () => {
  const isSmDown = useMediaQuery(theme.breakpoints.down(330));
  return (
    <MainLayoutNav variant={'worker'} enlargedFooter={true}>
      <CallHistoryBoxContainer>
        <CallHistoryMainContainer>
          <CallHistoryText>
            <UINewTypography variant="h2" color="text.secondary">
              <FormattedMessage id="CallsHistory" />
            </UINewTypography>
          </CallHistoryText>
          <SecondContainer>
            <SecondSubContainer>
              <SecondSubTextMainContainer>
                <SecondSubFirstBox>
                  <SecondSubFirstPartBox>
                    <WorkerImg src="/images/workercards/workercard-img.jpeg" />
                    <SecondSubFirstPartSecondBox>
                      <SecondSubFirstPartSecondBoxFirstText>
                        <CallHistoryName variant="h6" color="white.main" whiteSpace="nowrap">
                          Kat Winter
                        </CallHistoryName>
                        <SecondSubFirstPartSecondBoxSecText>
                          <UINewTypography variant="SubtitleSmallMedium" color="text.primary" lineHeight="120%">
                            24
                          </UINewTypography>
                          <Divider orientation="vertical" flexItem sx={{ borderColor: 'text.primary' }} />
                          <UINewTypography variant="SubtitleSmallMedium" color="text.primary" lineHeight="120%">
                            English, Spanish
                          </UINewTypography>
                        </SecondSubFirstPartSecondBoxSecText>
                      </SecondSubFirstPartSecondBoxFirstText>
                      <CallHistoryCreditBox>
                        <ImgBoxContainer src="/images/workercards/dollar-img.png" />
                        <UINewTypography variant="captionLargeBold" color="text.secondary">
                          20 credits/hr
                        </UINewTypography>
                      </CallHistoryCreditBox>
                    </SecondSubFirstPartSecondBox>
                  </SecondSubFirstPartBox>
                  {!isSmDown && (
                    <SecondSubFirstPartThiredBox marginRight={{ sm: '32px' }}>
                      <UINewTypography variant="buttonLargeMenu" color="text.primary">
                        Duration: 30 mins
                      </UINewTypography>
                      <CreditUsedBox>
                        <UINewTypography variant="buttonLargeMenu" color="text.primary" whiteSpace="nowrap">
                          Credits used:
                        </UINewTypography>
                        <SecondSubFirstPartThiredBoxText>
                          <ImgBoxContainer src="/images/workercards/dollar-img.png" />
                          <UINewTypography variant="buttonLargeMenu" color="text.primary">
                            35
                          </UINewTypography>
                        </SecondSubFirstPartThiredBoxText>
                      </CreditUsedBox>
                    </SecondSubFirstPartThiredBox>
                  )}
                </SecondSubFirstBox>
                {isSmDown && (
                  <SecondSubFirstPartThiredBox gap="8px !important">
                    <UINewTypography variant="buttonLargeMenu" color="text.primary">
                      Duration: 30 mins
                    </UINewTypography>
                    <CreditUsedBox>
                      <UINewTypography variant="buttonLargeMenu" color="text.primary" whiteSpace="nowrap">
                        Credits used:
                      </UINewTypography>
                      <SecondSubFirstPartThiredBoxText>
                        <ImgBoxContainer src="/images/workercards/dollar-img.png" />
                        <UINewTypography variant="buttonLargeMenu" color="text.primary">
                          35
                        </UINewTypography>
                      </SecondSubFirstPartThiredBoxText>
                    </CreditUsedBox>
                  </SecondSubFirstPartThiredBox>
                )}
                <CallAgainBox>
                  <UIThemeShadowButton variant="contained" sx={{ width: '100%', maxWidth: { xs: '363px', sm: '173px' } }}>
                    <Box sx={{ display: 'flex', gap: 1.25 }}>
                      <SecImgBoxContainer src="/images/home-connect-instantly-img.png" />
                      <Box sx={{ whiteSpace: 'nowrap' }}>
                        <UINewTypography variant="bodySemiBold" color="white.main">
                          <FormattedMessage id="CallAgain" />
                        </UINewTypography>
                      </Box>
                    </Box>
                  </UIThemeShadowButton>
                </CallAgainBox>
              </SecondSubTextMainContainer>
            </SecondSubContainer>
            <DividerContainer orientation="horizontal" flexItem />
          </SecondContainer>
        </CallHistoryMainContainer>
        <CallHistoryPaginationContainer>
          <UITheme2Pagination />
        </CallHistoryPaginationContainer>
      </CallHistoryBoxContainer>
    </MainLayoutNav>
  );
};

export default CallHistory;
