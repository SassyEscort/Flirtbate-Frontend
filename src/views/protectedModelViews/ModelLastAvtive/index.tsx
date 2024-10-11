'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { getUserDataClient } from 'utils/getSessionData';
import { ErrorMessage } from 'constants/common.constants';
import { User } from 'app/(guest)/layout';
import { useAuthContext } from '../../../../context/AuthContext';

const ModelLastActive = () => {
  const { session } = useAuthContext();
  const [token, setToken] = useState<string>('');
  const user = (session?.user as User)?.picture;
  const providerData = user && JSON.parse(user || '{}');

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const data = await getUserDataClient();
        setToken(data.token);
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };
    if ((session?.user as User)?.provider === 'providerCustom' && providerData?.role === 'model') {
      fetchUserToken();
    }
  }, [providerData, session]);

  useEffect(() => {
    if (token && (session?.user as User)?.provider === 'providerCustom' && providerData?.role === 'model') {
      const fetchModelLastActive = async () => {
        try {
          const response = await ModelDetailsService.modelLastActive(token);
          if (response.data) {
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          console.log('16');
          toast.error(ErrorMessage);
        }
      };
      fetchModelLastActive();
      const intervalId = setInterval(fetchModelLastActive, 15000);
      return () => clearInterval(intervalId);
    }
  }, [providerData, session?.user, token]);
  return <></>;
};

export default ModelLastActive;
