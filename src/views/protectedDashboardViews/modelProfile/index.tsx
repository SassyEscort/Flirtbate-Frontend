'use client';
import { useCallback, useEffect, useState } from 'react';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import DashboardProfile from '..';
import ModelProfileContainer from './ModelProfileContainer';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { getUserDataClient } from 'utils/getSessionData';
import { useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import MobileSidebar from '../sidebarDropDown';
import { useAuthContext } from '../../../../context/AuthContext';

const ModelProfile = () => {
  const { isCustomer } = useAuthContext();

  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [modelDetails, setModelDetails] = useState<ModelDetailsResponse>();

  const islgDown = useMediaQuery(theme.breakpoints.down('lg'));

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

  const handleModelApiChange = useCallback(() => {
    const modelDetails = async () => {
      const modelData = await ModelDetailsService.getModelDetails(token.token, isCustomer);
      setModelDetails(modelData.data);
    };
    if (token.token) {
      modelDetails();
    }
  }, [isCustomer, token.token]);

  useEffect(() => {
    if (modelDetails?.profile_status === 'Rejected') {
      window.location.href = '/model/profile-reject';
    }
  }, [modelDetails?.profile_status]);

  return (
    <DashboardProfile>
      {islgDown ? (
        <MobileSidebar
          modelDetails={modelDetails ?? ({} as ModelDetailsResponse)}
          token={token}
          handleModelApiChange={handleModelApiChange}
        />
      ) : (
        <ModelProfileContainer
          modelDetails={modelDetails ?? ({} as ModelDetailsResponse)}
          token={token}
          handleModelApiChange={handleModelApiChange}
        />
      )}
    </DashboardProfile>
  );
};

export default ModelProfile;
