'use client';

import Box from '@mui/material/Box';
import Link from 'next/link';
import {
  ReSubmitApplicationDescContainer,
  ReSubmitApplicationMain,
  ReSubmitApplicationMainContainer,
  ReSubmitApplicationTitleContainer
} from './ReSubmitApplication.styled';
import UINewTypography from 'components/UIComponents/UINewTypography';
import UIThemeButton from 'components/UIComponents/UIStyledLoadingButton';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import { useAuthContext } from '../../../../context/AuthContext';

const ProfileReject = () => {
  const { isCustomer } = useAuthContext();

  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [modelDetails, setModelDetails] = useState<ModelDetailsResponse>();

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      setToken({ id: data.id, token: data.token });
    };

    userToken();
  }, []);

  useEffect(() => {
    const modelDetails = async () => {
      const modelData = await ModelDetailsService.getModelDetails(token.token, isCustomer);
      setModelDetails(modelData.data);
    };
    if (token.token) {
      modelDetails();
    }
  }, [isCustomer, token.id, token.token]);

  return (
    <>
      <ReSubmitApplicationMainContainer>
        <ReSubmitApplicationMain>
          <Box component="img" src="\images\model\profile-reject.png" />
          <ReSubmitApplicationTitleContainer>
            <UINewTypography
              variant="h3"
              sx={{
                color: 'text.secondary',
                textAlign: 'center'
              }}
            >
              <FormattedMessage id="SorryToInform" />
            </UINewTypography>
            <ReSubmitApplicationDescContainer>
              <UINewTypography variant="bodyRegular">
                <FormattedMessage id="Reason" /> {modelDetails?.rejection_reason}
              </UINewTypography>
            </ReSubmitApplicationDescContainer>
          </ReSubmitApplicationTitleContainer>
          <Link prefetch={false} href="/model/profile">
            <UIThemeButton variant="contained">
              <FormattedMessage id="ReSubmitVerification" />
            </UIThemeButton>
          </Link>
        </ReSubmitApplicationMain>
      </ReSubmitApplicationMainContainer>
    </>
  );
};

export default ProfileReject;
