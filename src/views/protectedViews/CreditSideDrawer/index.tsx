import { memo, useCallback, useEffect, useState } from 'react';

import {
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
  CurrentBalanceTypography,
  MainImageBox,
  TitleSerachBox
} from './CreditSideDrawer.styled';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { CustomerCredit, ModelCreditRes } from 'services/customerCredit/customerCredit.service';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { useCallFeatureContext } from '../../../../context/CallFeatureContext';
import { useRouter } from 'next/navigation';
import { gaEventTrigger } from 'utils/analytics';
import { CustomerDetails } from 'services/customerDetails/customerDetails.services';
import { FormattedMessage } from 'react-intl';

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
    if (open && token.token && customerDetails && creditsListing.length === 0) {
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
              <Close sx={{ color: 'text.secondary', height: 40, width: 40 }} />
            </IconButton>
          </CreditsHeader>
          <CreditsContent>
            <CurrentBalanceBox>
              <CurrentBalanceTypography>
                <FormattedMessage id="CurrentBalance" /> :
              </CurrentBalanceTypography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component={'img'} src="/images/credits/coinwthIcon.png" alt="coin.png" width={26} height={26} />
                <CurrentBalanceTypography>{balance?.toFixed(2)}</CurrentBalanceTypography>
              </Box>
            </CurrentBalanceBox>
            <MainImageBox />
            <CreditListMainBox>
              {/* FREE CRDITS  */}
              {customerDetails && customerDetails?.free_credits_claimed === 0 && (
                <CreditListContainer
                  sx={{
                    background: 'linear-gradient(90deg, #FECD3D 11.5%, #FFF1C6 52%, #FF69C1 90%)',
                    border: 'none'
                  }}
                  onClick={() => router.push('/profile')}
                >
                  <CreditInfoBox>
                    <Box component={'img'} src="/images/credits/coinwthIcon.png" alt="coin.png" width={18} height={18} />
                    <Box>
                      <UINewTypography variant="buttonLargeMenu" color={'primary.200'}>
                        20+10 <FormattedMessage id="Credits" />
                      </UINewTypography>
                    </Box>
                  </CreditInfoBox>
                  <CreditPriceBox>
                    <Box component={'img'} src="/images/home/gitftsecond.png" alt="coin.png" width={24} height={29} />
                    <CreditTypography color={'primary.200'}>
                      <FormattedMessage id="FREE" />
                    </CreditTypography>
                  </CreditPriceBox>
                </CreditListContainer>
              )}

              {/* MOST POPULAR CRDITS  1*/}
              {creditsListing &&
                creditsListing?.map((creditsListing, index) => (
                  <CreditListContainer
                    sx={{
                      background:
                        creditsListing?.tag === 'Most Popular'
                          ? 'linear-gradient(90deg, #FF68C0 0%, #9F1666 100%)'
                          : creditsListing?.tag === 'Best Value'
                            ? 'linear-gradient(90deg, #B88A4A 0%, #E0AA3E 31.5%, #E0AA3E 61.5%, #F9F295 100%)'
                            : '',
                      position: 'relative',
                      border: creditsListing?.tag !== null ? 'none' : ''
                    }}
                    onClick={() => handleCreditClick(creditsListing)}
                    key={index}
                  >
                    {creditsListing?.tag !== null && (
                      <CreditPopularChip>
                        {creditsListing?.tag === 'Most Popular' ? (
                          <Box component={'img'} src="/images/credits/StarPink.svg" alt="coin.png" width={16} height={16} />
                        ) : (
                          <Box component={'img'} src="/images/credits/dollar.svg" alt="coin.png" width={9} height={18} />
                        )}
                        <UINewTypography variant="bodySmallBold" color={'primary.400'}>
                          {creditsListing?.tag === 'Most Popular' ? (
                            <FormattedMessage id="MostPopular" />
                          ) : (
                            <FormattedMessage id="BestValue" />
                          )}
                        </UINewTypography>
                      </CreditPopularChip>
                    )}
                    <CreditInfoBox>
                      <Box component={'img'} src="/images/credits/coinwthIcon.png" alt="coin.png" width={18} height={18} />
                      <Box>
                        <UINewTypography variant="buttonLargeMenu" color={'white.main'}>
                          {creditsListing?.credits} <FormattedMessage id="Credits" />
                        </UINewTypography>
                      </Box>
                    </CreditInfoBox>
                    <CreditPriceBox>
                      <CreditTypography color={'white.main'}>${creditsListing?.amount}</CreditTypography>
                    </CreditPriceBox>
                  </CreditListContainer>
                ))}

              {/* LIST END */}
            </CreditListMainBox>
          </CreditsContent>
        </>
      )}
    </CreditSideMainDrawer>
  );
};

export default memo(CreditSideDrawer);
