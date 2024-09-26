'use client';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { useCallback, useEffect, useState } from 'react';
import {
  BalanceInfoBox,
  BalanceInfoBoxV2,
  BoxFirstTextContainer,
  BoxSecondTextContainer,
  CreditBuyText,
  CreditCardImage,
  CreditCardText,
  CreditsMainContainer,
  CreditsSubContainer,
  DollarCreditText,
  FirstBoxContainer,
  HeadingContainer,
  ImagMainContainer,
  ImagSubContainer,
  LoaderBox,
  MainImagContainer,
  NewUIIconButton,
  OutOfCreditBox
} from './Credits.styled';
import { FormattedMessage } from 'react-intl';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { CustomerCredit, ModelCreditRes } from 'services/customerCredit/customerCredit.service';
import { getUserDataClient } from 'utils/getSessionData';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { CircularProgress, Divider, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from 'themes/theme';
import { useCallFeatureContext } from '../../../../../context/CallFeatureContext';
import { gaEventTrigger } from 'utils/analytics';

const ModelCredits = ({
  onClose,
  isOutOfCredits,
  userName,
  modelCreditPrice
}: {
  onClose: () => void;
  isOutOfCredits: boolean;
  userName: string;
  modelCreditPrice: number;
}) => {
  const [creditsListing, setCreditsListing] = useState<ModelCreditRes[]>([]);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useCallFeatureContext();

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const customerData = JSON.parse(user || '{}');

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
    if (token.token) {
      setIsLoading(true);
      const getModel = await CustomerCredit.getCustomerCredit(token.token);
      setCreditsListing(getModel?.data);
      setIsLoading(false);
    }
  }, [token.token]);

  const getCustomerCredit = useCallback(async () => {
    if (token.token) {
      const getModel = await ModelDetailsService.getModelWithDraw(token.token);
      setBalance(getModel?.data?.credits);
    }
  }, [token.token]);

  const handleCreditClick = async (listCredit: ModelCreditRes) => {
    setIsLoading(true);
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
    const res = await CustomerCredit.modelCreditAmount(token.token, listCredit.id, 1, false, userName);
    if (res) {
      router.push(res?.data?.url);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCreditsListing();
    getCustomerCredit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <CreditsMainContainer>
        <CreditsSubContainer>
          <HeadingContainer>
            <UINewTypography variant="h6">
              <FormattedMessage id="YouNeed" /> {modelCreditPrice} <FormattedMessage id="CreditsContinue" />{' '}
            </UINewTypography>
            <NewUIIconButton onClick={onClose}>
              <CloseIcon sx={{ color: theme.palette.text.secondary }} />
            </NewUIIconButton>
            {isSmUp && (
              <BalanceInfoBox>
                <UINewTypography variant="buttonLargeMenu" sx={{ paddingRight: '8px' }}>
                  <FormattedMessage id="Balance" />
                </UINewTypography>
                <CreditCardImage src="/images/workercards/dollar-img.avif" />

                <UINewTypography variant="buttonLargeMenu">{balance?.toFixed(2) || 0}</UINewTypography>
                <FormattedMessage id="Credits" />
              </BalanceInfoBox>
            )}
          </HeadingContainer>
          <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700', gap: 0 }} />
          {isSmDown && (
            <BalanceInfoBoxV2>
              <UINewTypography variant="buttonLargeMenu" sx={{ paddingRight: '8px' }}>
                <FormattedMessage id="Balance" />
              </UINewTypography>
              <CreditCardImage src="/images/workercards/dollar-img.avif" />

              <UINewTypography variant="buttonLargeMenu">{balance?.toFixed(2) || 0}</UINewTypography>
              <FormattedMessage id="Credits" />
            </BalanceInfoBoxV2>
          )}
          {isLoading ? (
            <LoaderBox>
              <CircularProgress />
            </LoaderBox>
          ) : (
            <ImagMainContainer>
              <OutOfCreditBox>
                <UINewTypography variant="h5">
                  <FormattedMessage id="PleaseChoose" />
                </UINewTypography>
              </OutOfCreditBox>
              <FirstBoxContainer>
                <Grid container sx={{ gap: 2, justifyContent: 'center' }}>
                  {creditsListing?.map((listCredit, index) => (
                    <ImagSubContainer key={index} onClick={() => handleCreditClick(listCredit)} sx={{ cursor: 'pointer' }}>
                      <MainImagContainer src={listCredit?.link} />
                      <BoxFirstTextContainer>
                        <CreditCardImage src="/images/workercards/coin-1.png" />
                        <CreditCardText variant="subtitle" color="text.secondary">
                          {listCredit?.credits}
                          <FormattedMessage id="Credits" />
                        </CreditCardText>
                      </BoxFirstTextContainer>
                      <BoxSecondTextContainer>
                        <CreditBuyText variant="bodySmall" color="secondary.700">
                          <FormattedMessage id="BuyNowAt" />
                        </CreditBuyText>
                        <DollarCreditText color="text.secondary">${listCredit?.amount}</DollarCreditText>
                      </BoxSecondTextContainer>
                    </ImagSubContainer>
                  ))}
                </Grid>
              </FirstBoxContainer>
            </ImagMainContainer>
          )}
        </CreditsSubContainer>
      </CreditsMainContainer>
    </>
  );
};

export default ModelCredits;
