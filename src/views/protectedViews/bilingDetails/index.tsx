'use client';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, useMediaQuery } from '@mui/material';
import UINewTypography from 'components/UIComponents/UINewTypography';
import theme from 'themes/theme';
import { SecondSubContainerImgWorkerCard } from 'views/guestViews/commonComponents/WorkerCard/WorkerCard.styled';
import {
  DialogTitleContainer,
  MainContainer,
  FirstBox,
  SecondBox,
  ThreeBox,
  ButtonMainContainer,
  BoxImage,
  DialogContentBox,
  DialogBox,
  CreditsMainBox,
  CreditsPriceBox
} from './BillingDetails';
import WorkerCardMobile from 'views/guestViews/commonComponents/mobileWorkerCard';
import { FormattedMessage } from 'react-intl';
import { useCallFeatureContext } from '../../../../context/CallFeatureContext';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { ViewDetailsRes } from 'services/guestBilling/types';
import StyleButtonV2 from 'components/UIComponents/StyleLoadingButton';
import { TokenIdType } from 'views/protectedModelViews/verification';

const BillingDetails = ({
  open,
  handleClose,
  selectDetails,
  token
}: {
  open: boolean;
  handleClose: () => void;
  selectDetails: ViewDetailsRes;
  token: TokenIdType;
}) => {
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { isLoading } = useCallFeatureContext();
  const callDurationString = selectDetails.call_duration;
  const callDuration = moment.duration(callDurationString);
  const hours = Math.floor(callDuration.asHours());
  const minutes = callDuration.minutes();
  const seconds = callDuration.seconds();

  function formatDuration(hours: number, minutes: number, seconds: number) {
    let message = '';

    if (hours > 0) {
      message += `${hours} hour`;
    }
    if (minutes > 0) {
      if (hours > 0) {
        message += ', ';
      }
      message += `${minutes} minute`;
    }
    if (seconds > 0) {
      if (hours > 0 || minutes > 0) {
        message += ', ';
      }
      message += `${seconds} second`;
    }

    return message;
  }

  const message = formatDuration(hours, minutes, seconds);
  const handelExplore = () => {
    router.push('/');
    handleClose();
  };

  const handleVideoCall = (selectDetails: ViewDetailsRes) => {
    if (selectDetails.user_name) {
      router.push(`/details/${selectDetails.user_name}`);
    }
  };
  return (
    <DialogBox open={open} onClose={handleClose} fullWidth scroll="body">
      <DialogTitleContainer id="responsive-modal-title">
        <UINewTypography variant="h6" color="secondary.200">
          <FormattedMessage id="Details" />
        </UINewTypography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.text.secondary
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitleContainer>
      <Box>
        <Divider
          sx={{
            border: '1px solid #232027',
            display: { sm: 'block', display: 'none' }
          }}
        />
      </Box>
      <DialogContentBox>
        <MainContainer>
          <WorkerCardMobile modelDetails={selectDetails} token={token} />
          <FirstBox>
            <SecondBox>
              <ThreeBox>
                <CreditsMainBox>
                  <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                    <FormattedMessage id="CreditsUsed" />
                  </UINewTypography>
                  <CreditsPriceBox>
                    <SecondSubContainerImgWorkerCard src="/images/workercards/coin-details.png" />
                    <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                      {selectDetails?.credits?.toFixed(2) || 0}
                    </UINewTypography>
                  </CreditsPriceBox>
                </CreditsMainBox>
                <Box>
                  <UINewTypography variant="SubtitleSmallMedium" color="secondary.200">
                    {moment(selectDetails.created_at).format('hh:mm A, DD MMM YYYY')}
                  </UINewTypography>
                </Box>
              </ThreeBox>
              <Box>
                <UINewTypography variant="SubtitleSmallMedium" color="secondary.200">
                  <FormattedMessage id="Duration" />
                  {message}
                </UINewTypography>
              </Box>
            </SecondBox>
            <ButtonMainContainer>
              <StyleButtonV2
                loading={isLoading}
                onClick={() => {
                  handleVideoCall(selectDetails);
                }}
                sx={{
                  height: 'auto',
                  maxWidth: '100%',
                  '&.MuiButtonBase-root': { height: { xs: '40px', sm: '44px' } }
                }}
                fullWidth
                variant="contained"
              >
                <Box display="flex" alignItems="center" gap="10px">
                  <BoxImage src="/images/workercards/video-call.svg" alt="video-call" />
                  <UINewTypography color="common.white" variant="bodySemiBold" sx={{ whiteSpace: 'nowrap' }}>
                    {isSMDown ? <FormattedMessage id="StartVideoCall" /> : <FormattedMessage id="StartVideoCallAgain" />}
                  </UINewTypography>
                </Box>
              </StyleButtonV2>
              <UINewTypography
                onClick={handelExplore}
                variant="bodySemiBold"
                color="#FFFFFF"
                sx={{ textAlign: 'center', cursor: 'pointer' }}
              >
                <FormattedMessage id="ExploreMoreModels" />
              </UINewTypography>
            </ButtonMainContainer>
          </FirstBox>
        </MainContainer>
      </DialogContentBox>
    </DialogBox>
  );
};

export default BillingDetails;
