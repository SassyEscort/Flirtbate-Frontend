import React, { useRef } from 'react';
import {
  CreditContainer,
  FavoriteBorderIconContainer,
  FavoriteIconContainer,
  FirstSubContainerImgWorkerCard,
  FirstSubContainerWithoutImg,
  FlagAndLiveIconBoxContainer,
  HeartIconWorkerCard,
  HighlyAvailableBox,
  HighlyAvailableButtonBox,
  ImgWorkerCard,
  LiveIconSecBoxWorkerCard,
  LiveIconWorkerCard,
  MainWorkerCard,
  NameCardContainer,
  OfflineIconSecBoxWorkerCard,
  OfflineIconWorkerCard,
  ProfileCardContainer,
  SecondMainContainerWorkerCard,
  SecondSubContainerImgWorkerCard,
  SecondSubContainerWorkerCard,
  SeconderContainerWorkerCard,
  SubContainertWorkerCard,
  TextBoxContainer,
  UITypographyBox,
  UITypographyBoxContainer,
  WorkerCardContainer
} from './WorkerCard.styled';
import Divider from '@mui/material/Divider';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import { ModelHomeListing } from 'services/modelListing/modelListing.services';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import useImageOptimize from 'hooks/useImageOptimize';
import { countryWithFlag } from 'constants/country';
import { ModelFavRes } from 'services/customerFavorite/customerFavorite.service';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { toast } from 'react-toastify';
import { CustomerDetailsService } from 'services/customerDetails/customerDetails.services';
import { ErrorMessage } from 'constants/common.constants';
import { gaEventTrigger } from 'utils/analytics';
import StyleBoostUserButton from 'components/UIComponents/StyleBoostUserButton';
import { useAuthContext } from '../../../../../context/AuthContext';

const WorkerCard = ({
  modelDetails,
  isFavPage,
  token,
  handleLoginLiked,
  handleLoginOpen,
  handleLike,
  liked
}: {
  modelDetails: ModelHomeListing | ModelFavRes;
  isFavPage: boolean;
  token: TokenIdType;
  handleLoginLiked: (modelId: number) => void;
  handleLoginOpen: () => void;
  handleLike: (modelId: number) => void;
  liked: boolean;
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(425));

  const { isCustomer, user } = useAuthContext();

  const languages = modelDetails?.languages
    ?.map((language) => language?.language_name)
    .sort()
    .join(', ');
  const modelFlag = countryWithFlag.filter((country) => country.name === modelDetails?.country).map((data) => data.flag)[0];
  const imageUrlRef = useRef<HTMLElement>();

  useImageOptimize(imageUrlRef, modelDetails?.link ?? '', 'BG', false, false, modelDetails?.cords);

  const customerData = JSON.parse(user || '{}');

  const handleLikeClick = async (modelDetails: ModelHomeListing | ModelFavRes) => {
    try {
      if (!isCustomer) {
        handleLoginOpen();
        gaEventTrigger('Login_Button_clicked', { source: 'fav_button', category: 'Button' });
      } else if (token.token) {
        const data = await CustomerDetailsService.favouritePutId(modelDetails.id, token?.token);
        if (data?.code === 200) {
          handleLoginLiked(modelDetails.id);
          handleLike(modelDetails.id);
          const customerInfo = {
            email: customerData?.customer_email,
            name: customerData?.customer_name,
            username: customerData?.customer_user_name,
            model_username: modelDetails.user_name
          };
          const customerInfoString = JSON.stringify(customerInfo);
          gaEventTrigger('Model_Favorite_Clicked', {
            category: 'Button',
            label: 'Model_Favorite_Clicked',
            value: customerInfoString
          });
        } else {
          toast.error(ErrorMessage);
        }
      } else {
        handleLoginOpen();
      }
    } catch (erro) {
      toast.error(ErrorMessage);
    }
  };

  const handleIconClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    handleLikeClick(modelDetails);
  };
  return (
    <MainWorkerCard>
      <ImgWorkerCard ref={imageUrlRef} />
      <HeartIconWorkerCard>
        {Boolean(modelDetails?.profile_plan_purchased) && (
          <HighlyAvailableButtonBox>
            <HighlyAvailableBox>
              <video
                src="/images/boostProfile/fire-ani.webm"
                height={57}
                width={42}
                autoPlay
                loop
                muted
                style={{ zIndex: 10, left: isTablet ? '-20px' : isMdDown ? '-30px' : '-22px', position: 'absolute', top: '-14px' }}
              />

              <StyleBoostUserButton>
                <UINewTypography variant="bodyUltraLarge" color="#ffff">
                  <FormattedMessage id="HighlyAvailable" />
                </UINewTypography>
              </StyleBoostUserButton>
            </HighlyAvailableBox>
          </HighlyAvailableButtonBox>
        )}
        {isFavPage || liked || modelDetails?.favourite === 1 ? (
          <FavoriteIconContainer sx={{ color: 'error.main' }} />
        ) : (
          <FavoriteBorderIconContainer onClick={handleIconClick} />
        )}
      </HeartIconWorkerCard>
      <WorkerCardContainer>
        <SeconderContainerWorkerCard>
          <SubContainertWorkerCard>
            <ProfileCardContainer>
              <NameCardContainer>
                <TextBoxContainer>
                  <UINewTypography variant="newTitle" color="#ffff">
                    {modelDetails?.name?.charAt(0)?.toUpperCase() + modelDetails?.name?.slice(1)}
                  </UINewTypography>
                </TextBoxContainer>
                <FlagAndLiveIconBoxContainer>
                  {modelDetails?.is_online === 1 ? (
                    <>
                      <LiveIconWorkerCard>
                        <LiveIconSecBoxWorkerCard sx={{ backgroundColor: 'success.100' }} />
                      </LiveIconWorkerCard>
                    </>
                  ) : (
                    <>
                      <OfflineIconWorkerCard>
                        <OfflineIconSecBoxWorkerCard />
                      </OfflineIconWorkerCard>
                    </>
                  )}
                  {modelFlag ? <FirstSubContainerImgWorkerCard src={modelFlag} /> : <FirstSubContainerWithoutImg />}
                </FlagAndLiveIconBoxContainer>
              </NameCardContainer>
              {!isMobile && (
                <CreditContainer>
                  <SecondSubContainerImgWorkerCard src="/images/workercards/dollar-img.avif" />
                  <UINewTypography variant="captionLargeBold" color="text.secondary">
                    {!modelDetails?.credits_per_minute ? (
                      <FormattedMessage id="NoPrice" />
                    ) : (
                      <>
                        {modelDetails?.credits_per_minute} <FormattedMessage id="CreditsMin" />
                      </>
                    )}
                  </UINewTypography>
                </CreditContainer>
              )}
            </ProfileCardContainer>
            <SecondMainContainerWorkerCard>
              <SecondSubContainerWorkerCard>
                <UITypographyBox variant="SubtitleSmallMedium" color="text.primary">
                  {moment().diff(modelDetails?.dob, 'years')}
                </UITypographyBox>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'text.primary' }} />
                <UITypographyBoxContainer variant="SubtitleSmallMedium">{languages}</UITypographyBoxContainer>
              </SecondSubContainerWorkerCard>
            </SecondMainContainerWorkerCard>
            {isMobile && (
              <CreditContainer sx={{ marginTop: isSmallScreen ? 1.5 : 1 }}>
                <SecondSubContainerImgWorkerCard src="/images/workercards/dollar-img.avif" />
                <UINewTypography variant="captionLargeBold" color="text.secondary">
                  {!modelDetails?.price_per_minute ? (
                    <FormattedMessage id="NoPrice" />
                  ) : (
                    <>
                      {modelDetails?.credits_per_minute} <FormattedMessage id="CreditsMin" />
                    </>
                  )}
                </UINewTypography>
              </CreditContainer>
            )}
          </SubContainertWorkerCard>
        </SeconderContainerWorkerCard>
      </WorkerCardContainer>
    </MainWorkerCard>
  );
};

export default WorkerCard;
