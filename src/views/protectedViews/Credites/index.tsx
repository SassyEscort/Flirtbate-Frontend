'use client';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { useCallback, useEffect, useState } from 'react';
import { SecondSubContainerImgWorkerCard } from 'views/guestViews/commonComponents/WorkerCard/WorkerCard.styled';
import {
  BoxFirstTextContainer,
  BoxSecondTextContainer,
  CreditBuyText,
  CreditCardImage,
  CreditCardText,
  CreditsMainContainer,
  CreditsSubContainer,
  DollarCreditText,
  FirsTextMainContainer,
  FirsTextSubContainer,
  FirstBoxContainer,
  ImagMainContainer,
  ImagSubContainer,
  LoaderBox,
  MainImagContainer,
  SecondBoxContainer,
  TextMainContainer
} from './Credits.styled';
import MainLayoutNav from '../protectedLayout';
import { FormattedMessage } from 'react-intl';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { CustomerCredit, ModelCreditRes } from 'services/customerCredit/customerCredit.service';
import { getUserDataClient } from 'utils/getSessionData';
import Grid from '@mui/material/Grid';
import { useRouter, useSearchParams } from 'next/navigation';
import UIStyledDialog from 'components/UIComponents/UIStyledDialog';
import CreditsAdded from '../CreditsAdded/CreditsAdded';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import Loader from 'components/Loader';
import { CircularProgress } from '@mui/material';
import { gaEventTrigger } from 'utils/analytics';
import { useCallFeatureContext } from '../../../../context/CallFeatureContext';

export type CustomerInfo = {
  email: string;
  name: string;
  username: string;
};

const Credits = () => {
  const [open, setOpen] = useState(false);
  const [creditsListing, setCreditsListing] = useState<ModelCreditRes[]>([]);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [balance, setBalance] = useState(0);
  const [addedCredits, setAddedCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useCallFeatureContext();
  const customerData = JSON.parse(user || '{}');

  const credit = searchParams.get('credit');
  const totalBal = searchParams.get('total_amount_after_txn');

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
      setCreditsListing(getModel.data);
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
    const res = await CustomerCredit.modelCreditAmount(token.token, listCredit.id, 0, false);
    if (res) {
      router.push(res?.data?.url);
    }
    setIsLoading(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setBalance(Number(totalBal));
    setAddedCredits(Number(credit));
    getCustomerCredit();
    if (credit) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // useEffect(() => {
  //   if (credit) {
  //     gaEventTrigger(
  //       'Credits_Purchase_Success',
  //       {
  //         action: 'Credits_Purchase_Success',
  //         category: 'Page change',
  //         label: 'Credits_Purchase_Success',
  //         value: JSON.stringify(customerInformation)
  //       },
  //       Number(totalBal)
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    getCreditsListing();
    getCustomerCredit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <MainLayoutNav variant={'worker'} enlargedFooter={true}>
      {isLoading && <Loader />}
      <CreditsMainContainer>
        <CreditsSubContainer>
          <TextMainContainer>
            <FirsTextMainContainer>
              <UINewTypography variant="h2" color="text.secondary">
                <FormattedMessage id="Credits" />
              </UINewTypography>
              <FirsTextSubContainer>
                <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                  <FormattedMessage id="Balance" />
                </UINewTypography>
                <SecondBoxContainer>
                  <SecondSubContainerImgWorkerCard src="/images/workercards/coin-1.png" />
                  <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                    {balance.toFixed(2)}
                  </UINewTypography>
                </SecondBoxContainer>
              </FirsTextSubContainer>
            </FirsTextMainContainer>
          </TextMainContainer>

          {isLoading ? (
            <LoaderBox>
              <CircularProgress />
            </LoaderBox>
          ) : (
            <ImagMainContainer>
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
                        <DollarCreditText color="text.secondary">${listCredit?.amount.toFixed(2)}</DollarCreditText>
                      </BoxSecondTextContainer>
                    </ImagSubContainer>
                  ))}
                </Grid>
              </FirstBoxContainer>
            </ImagMainContainer>
          )}
        </CreditsSubContainer>
      </CreditsMainContainer>
      <UIStyledDialog scroll="body" open={open} maxWidth="md" fullWidth>
        <CreditsAdded addedCredits={addedCredits} newBalance={balance} onClose={handleClose} isOutOfCredits={false} />
      </UIStyledDialog>
    </MainLayoutNav>
  );
};

export default Credits;
