'use client';
import HomeMainContainer from 'views/guestViews/guestLayout/homeContainer';
import { EscortSlider } from './EscortSlider';
import { useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import EscortSliderMobile from './EscortSliderMobile';
import EscortPersonalDetail from './EscortPersonalDetail';
import EscortExplore from './EscortExplore';
import { GuestDetailsService } from 'services/guestDetails/guestDetails.services';
import { useEffect, useState } from 'react';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import { WorkerPhotos } from 'views/protectedModelViews/verification/stepThree/uploadImage';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { getUserDataClient } from 'utils/getSessionData';
import { usePathname } from 'next/navigation';
import Box from '@mui/system/Box';
import { useCallFeatureContext } from '../../../../../context/CallFeatureContext';
import { CallingService } from 'services/calling/calling.services';

const EscortDetailPage = () => {
  const path = usePathname();
  const userName = path.split('/')[2];

  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const [guestData, setGuestData] = useState<ModelDetailsResponse>();
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [isCreditAvailable, setIsCreditAvailable] = useState(false);

  const { handleCallInitiate } = useCallFeatureContext();

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      if (data) {
        setToken({ id: data.id, token: data.token });
      }
    };

    userToken();
  }, []);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        if (userName) {
          const data = await GuestDetailsService.GuestModelDetails(userName);
          if (data.code === 200) {
            setGuestData(data.data);
          } else {
            toast.error(data?.response?.data?.message);
          }
        }
      } catch (error) {
        toast.error(ErrorMessage);
      }
    };

    fetchGuestData();
  }, [userName]);

  useEffect(() => {
    const getCometChatInfo = async () => {
      if (guestData) {
        const getInfo = await CallingService.getCometChatInfo(guestData.id, token.token);
        if (getInfo?.data?.time_unit === 'minutes' && getInfo?.data?.available_call_duration >= 3) {
          setIsCreditAvailable(true);
        }
      }
    };
    getCometChatInfo();
  }, [guestData, token.token]);

  return (
    <>
      <HomeMainContainer>
        <Box sx={{ px: { xs: '15px', lg: '0' } }}>
          {isLgDown && guestData ? (
            <EscortSliderMobile
              workerPhotos={guestData?.photos ?? ([] as WorkerPhotos[])}
              modelId={guestData?.id ?? 0}
              token={token}
              handleCallInitiate={() => handleCallInitiate(guestData?.id, isCreditAvailable)}
            />
          ) : (
            guestData && (
              <EscortSlider
                workerPhotos={guestData?.photos ?? ([] as WorkerPhotos[])}
                modelId={guestData?.id ?? 0}
                token={token}
                handleCallInitiate={() => handleCallInitiate(guestData?.id, isCreditAvailable)}
              />
            )
          )}
          <EscortPersonalDetail guestData={guestData ?? ({} as ModelDetailsResponse)} />
          <EscortExplore />
        </Box>
      </HomeMainContainer>
    </>
  );
};

export default EscortDetailPage;
