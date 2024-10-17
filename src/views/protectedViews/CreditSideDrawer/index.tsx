import { memo, useCallback, useEffect, useState } from 'react';

import {
  CloseImgIcon,
  CreditAmountBox,
  CreditInfoBox,
  CreditListContainer,
  CreditListMainBox,
  CreditLoaderBox,
  CreditPopularChip,
  CreditPriceBox,
  CreditSideMainDrawer,
  CreditTypography,
  CreditsContent,
  CreditsHeader,
  CurrentBalanceBox,
  CurrentBalanceBoxWrapper,
  CurrentBalanceTypography,
  FirstTimeChip,
  FirstTimeImageBox,
  FirstTimeTypography,
  MainImageBox,
  TitleSerachBox
} from './CreditSideDrawer.styled';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { CustomerCredit, ModelCreditRes } from 'services/customerCredit/customerCredit.service';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { useCallFeatureContext } from '../../../../context/CallFeatureContext';
import { useRouter } from 'next/navigation';
import { gaEventTrigger } from 'utils/analytics';
import { CustomerDetails } from 'services/customerDetails/customerDetails.services';
import { FormattedMessage } from 'react-intl';
import { useAuthContext } from '../../../../context/AuthContext';
import { CUSTOM_PLAN_TAG } from 'constants/customPlan.constant';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const CreditSideDrawer = ({
  open,
  handleClose,
  balance,
  customerDetails
}: {
  open: boolean;
  handleClose: () => void;
  balance: number;
  customerDetails: CustomerDetails | undefined;
}) => {
  const [creditsListing, setCreditsListing] = useState<ModelCreditRes[]>([]);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { isFreeCreditAvailable } = useAuthContext();

  const { user } = useCallFeatureContext();
  const customerData = JSON.parse(user || '{}');

  const router = useRouter();

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      if (data) {
        setToken({ id: data.id, token: data.token });
      }
    };
    userToken();
  }, []);

  const getCreditsListing = useCallback(async () => {
    setIsLoading(true);
    if (token.token) {
      const getModel = await CustomerCredit.getCustomerCredit(token.token);
      setCreditsListing(getModel.data);
    }
    setIsLoading(false);
  }, [token.token]);

  const handleCreditClick = async (listCredit: ModelCreditRes) => {
    const customerInfo = {
      email: customerData?.customer_email,
      name: customerData?.customer_name,
      username: customerData?.customer_user_name,
      model_username: '',
      plan_details: listCredit,
      source: 'Credit Page'
    };

    gaEventTrigger('Credits_Purchase_Initiated', {
      action: 'Credits_Purchase_Initiated',
      category: 'Button',
      label: 'Credits_Purchase_Initiated',
      value: JSON.stringify(customerInfo)
    });
    const res = await CustomerCredit.modelCreditAmount(token.token, listCredit.id, 0, false);
    if (res) {
      router.push(res?.data?.url);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (open && token.token && customerDetails && creditsListing?.length === 0) {
      getCreditsListing();
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, open]);

  return (
    <CreditSideMainDrawer anchor="right" open={open} onClose={handleClose}>
      {isLoading ? (
        <CreditLoaderBox>
          <CircularProgress />
        </CreditLoaderBox>
      ) : (
        <>
          <CreditsHeader>
            <TitleSerachBox>
              <UINewTypography variant="h3" fontSize={30} color="text.secondary">
                <FormattedMessage id="Addcredits" />
              </UINewTypography>
            </TitleSerachBox>
            <IconButton onClick={handleClose}>
              <CloseImgIcon />
            </IconButton>
          </CreditsHeader>
          <CreditsContent>
            <CurrentBalanceBox>
              <CurrentBalanceTypography>
                <FormattedMessage id="CurrentBalance" /> :
              </CurrentBalanceTypography>
              <CurrentBalanceBoxWrapper>
                <Image loading="lazy" src="/images/credits/coinwthIcon.png" alt="coin.png" width={26} height={26} />
                <CurrentBalanceTypography>{balance?.toFixed(2)}</CurrentBalanceTypography>
              </CurrentBalanceBoxWrapper>
            </CurrentBalanceBox>
            <MainImageBox />
            <CreditListMainBox>
              {/* FREE CRDITS  */}
              {customerDetails && !Boolean(customerDetails?.free_credits_claimed) && Boolean(isFreeCreditAvailable) && (
                <CreditListContainer
                  sx={{
                    background: 'linear-gradient(90deg, #FECD3D 11.5%, #FFF1C6 52%, #FF69C1 90%)',
                    border: 'none'
                  }}
                  onClick={() => router.push('/profile')}
                >
                  <CreditInfoBox>
                    <Image loading="lazy" src="/images/credits/coinwthIcon.png" alt="coin.png" width={18} height={18} />
                    <Box>
                      <UINewTypography variant="buttonLargeMenu" color={'primary.200'}>
                        <FormattedMessage id="ClaimFreeCredits" />
                      </UINewTypography>
                    </Box>
                  </CreditInfoBox>
                  <CreditPriceBox>
                    <Image loading="lazy" src="/images/home/gitftsecond.png" alt="gift-icon" width={24} height={29} />
                    {/* <CreditTypography color={'primary.200'}>
                      <FormattedMessage id="FREE" />
                    </CreditTypography> */}
                  </CreditPriceBox>
                </CreditListContainer>
              )}

              {/* MOST POPULAR CRDITS  1*/}
              {creditsListing &&
                creditsListing?.map((item, index) => {
                  return (
                    <CreditListContainer
                      sx={{
                        background:
                          item?.tag === CUSTOM_PLAN_TAG.MOST_POPULAR
                            ? 'linear-gradient(90deg, #FF68C0 0%, #9F1666 100%)'
                            : item?.tag === CUSTOM_PLAN_TAG.BEST_VALUE
                              ? 'linear-gradient(90deg, #B88A4A 0%, #E0AA3E 31.5%, #E0AA3E 61.5%, #F9F295 100%)'
                              : '',
                        position: 'relative',
                        border: item?.tag === CUSTOM_PLAN_TAG.MOST_POPULAR || item?.tag === CUSTOM_PLAN_TAG.BEST_VALUE ? 'none' : ''
                      }}
                      onClick={() => handleCreditClick(item)}
                      key={index}
                    >
                      {(item?.tag === CUSTOM_PLAN_TAG.MOST_POPULAR || item?.tag === CUSTOM_PLAN_TAG.BEST_VALUE) && (
                        <CreditPopularChip>
                          {item?.tag === CUSTOM_PLAN_TAG.MOST_POPULAR ? (
                            <Image loading="lazy" src="/images/credits/StarPink.svg" alt="start-icon" width={16} height={16} />
                          ) : (
                            <Image loading="lazy" src="/images/credits/dollar.svg" alt="doller-icon" width={9} height={18} />
                          )}
                          <UINewTypography variant="bodySmallBold" color="primary.400">
                            {item?.tag === CUSTOM_PLAN_TAG.MOST_POPULAR ? (
                              <FormattedMessage id="MostPopular" />
                            ) : (
                              <FormattedMessage id="BestValue" />
                            )}
                          </UINewTypography>
                        </CreditPopularChip>
                      )}

                      {item?.tag === CUSTOM_PLAN_TAG.FIRST_TIME_ONLY && (
                        <FirstTimeChip>
                          <FirstTimeImageBox>
                            <Image
                              loading="lazy"
                              src="/images/credits/firstTime.png"
                              alt="firstTimeIcon"
                              width={127}
                              height={24}
                              style={{ boxShadow: '0px 8px 32px 0px #FFBE6666' }}
                            />
                            <FirstTimeTypography variant="bodySmallBold" position="absolute">
                              first time free
                            </FirstTimeTypography>
                          </FirstTimeImageBox>
                        </FirstTimeChip>
                      )}
                      <CreditInfoBox>
                        <Image loading="lazy" src="/images/credits/coinwthIcon.png" alt="coin.png" width={18} height={18} />
                        <Box>
                          <UINewTypography variant="SubtitleSmallMedium" color="white.main">
                            {item?.credits} {(item?.tag === CUSTOM_PLAN_TAG.FIRST_TIME_ONLY && '+ 10') || ''}{' '}
                            <FormattedMessage id="Credits" />
                          </UINewTypography>
                        </Box>
                      </CreditInfoBox>
                      <CreditPriceBox>
                        <CreditAmountBox>
                          <UINewTypography color="text.primary" variant="subtitle" sx={{ textDecorationLine: 'line-through' }}>
                            ${item?.amount}
                          </UINewTypography>
                          <CreditTypography color="white.main">${item?.amount}</CreditTypography>
                        </CreditAmountBox>
                      </CreditPriceBox>
                    </CreditListContainer>
                  );
                })}

              {/* LIST END */}
            </CreditListMainBox>
          </CreditsContent>
        </>
      )}
    </CreditSideMainDrawer>
  );
};

export default memo(CreditSideDrawer);
