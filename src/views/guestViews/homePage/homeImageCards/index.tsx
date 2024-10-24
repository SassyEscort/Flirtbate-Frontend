'use client';
// import WorkerCard from 'views/guestViews/commonComponents/WorkerCard/WorkerCard';
import { ButtonMainBox, WorkerCardMainBox } from 'views/guestViews/commonComponents/WorkerCard/WorkerCard.styled';
import HomeMainContainer from 'views/guestViews/guestLayout/homeContainer';
import { ModelHomeListing } from 'services/modelListing/modelListing.services';
import { ModelFavRes } from 'services/customerFavorite/customerFavorite.service';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { lazy, Suspense, memo, useMemo, useState } from 'react';
import Link from 'next/link';
import { UITheme2Pagination } from 'components/UIComponents/PaginationV2/Pagination.styled';
import { SearchFiltersTypes } from 'views/guestViews/searchPage/searchFilters';
import { PaginationMainBox } from 'views/protectedDashboardViews/payoutRequest/PayoutRequest.styled';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { NotFoundModelBox } from './HomeImageCard.styled';
import { FormattedMessage } from 'react-intl';
import { gaEventTrigger } from 'utils/analytics';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import Loading from 'loading';
const UIStyledDialog = dynamic(() => import('components/UIComponents/UIStyledDialog'), {
  ssr: false,
  loading: Loading
});
const NewSignupStyledModalDialog = dynamic(() => import('components/UIComponents/NewSignupStyledModalDialog'), {
  ssr: false,
  loading: Loading
});
const PaginationInWords = dynamic(() => import('components/UIComponents/PaginationINWords'), {
  ssr: false,
  loading: Loading
});
const GuestForgetPasswordLink = dynamic(() => import('views/auth/guestForgetPasswordLink'), {
  ssr: false,
  loading: Loading
});
const GuestLogin = dynamic(() => import('views/auth/guestLogin'), {
  ssr: false,
  loading: Loading
});
const GuestSignup = dynamic(() => import('views/auth/guestSignup'), {
  ssr: false,
  loading: Loading
});
const HomePageFreeSignup = dynamic(() => import('views/auth/homePageFreeSignup'), {
  ssr: false,
  loading: Loading
});

const WorkerCard = lazy(() => import('views/guestViews/commonComponents/WorkerCard/WorkerCard'));

const HomeImageCard = ({
  modelListing,
  isFavPage,
  token,
  totalRows,
  handleChangePage,
  filters,
  isFreeCreditAvailable
}: {
  modelListing: ModelHomeListing[] | ModelFavRes[];
  isFavPage: boolean;
  token?: TokenIdType;
  totalRows?: number;
  handleChangePage?: (page: number) => void;
  filters?: SearchFiltersTypes;
  isFreeCreditAvailable: number;
}) => {
  const [favModelId, setFavModelId] = useState(0);
  const [open, setIsOpen] = useState(false);
  const [openLogin, setIsOpenLogin] = useState(false);
  const [openForgetPassLink, setOpenForgetPassLink] = useState(false);
  const [likedModels, setLikedModels] = useState<number[]>([]);
  const [freeSignupOpen, setFreeSignupOpen] = useState(false);

  const handleLoginLiked = (modelId: number) => {
    setFavModelId(modelId);
  };

  const handleSignupOpen = () => {
    setIsOpen(true);
    setIsOpenLogin(false);
  };

  const handleSignupClose = () => {
    setIsOpen(false);
  };

  const handleLoginOpen = () => {
    setIsOpen(false);
    setIsOpenLogin(true);
  };

  const handleLoginResetPasswordOpen = () => {
    setOpenForgetPassLink(false);
    setIsOpenLogin(true);
  };

  const handleLoginClose = () => {
    setIsOpenLogin(false);
    setFavModelId(0);
  };

  const handleResetPasswordLinkOpen = () => {
    setIsOpenLogin(false);
    setOpenForgetPassLink(true);
  };

  const handleResetPasswordLinkClose = () => {
    setOpenForgetPassLink(false);
  };

  const handleLike = useMemo(() => {
    return (modelId: number) => {
      const isLiked = likedModels.includes(modelId);
      if (isLiked) {
        setLikedModels(likedModels.filter((id) => id !== modelId));
      } else {
        setLikedModels([...likedModels, modelId]);
      }
    };
  }, [likedModels]);

  const handleChangePageUI = (event: React.ChangeEvent<unknown>, value: number) => {
    if (handleChangePage) handleChangePage(value);
  };

  const handleModelRedirect = (user_name: string) => {
    gaEventTrigger('model_clicked', {
      category: 'Button',
      label: 'model_clicked',
      value: user_name
    });
  };

  const handleFreeCreditSignupOpen = () => {
    gaEventTrigger('Signup_Button_clicked', { source: 'model_card', category: 'Button' });
    handleLoginClose();
    setFreeSignupOpen(true);
  };

  const handleFreeCreditSignupClose = () => {
    setFreeSignupOpen(false);
  };

  return (
    <HomeMainContainer>
      <WorkerCardMainBox id="tableSection">
        <Grid container spacing={{ xs: '13px', md: '15px' }} rowGap={{ xs: 0.875, lg: 2.125 }}>
          {modelListing?.map((item, index) => {
            return (
              <Grid item key={index} xs={6} sm={4} md={isFavPage ? 4 : 3} lg={isFavPage ? 4 : 3}>
                <Box display="flex" gap={2} flexDirection="column">
                  {favModelId === item.id ? (
                    <Box
                      component={Link}
                      prefetch={true}
                      shallow={true}
                      href={`/details/${item.user_name}`}
                      onClick={() => handleModelRedirect(item.user_name)}
                      sx={{
                        textDecoration: 'none',
                        height: '100%'
                      }}
                    >
                      <Suspense>
                        <WorkerCard
                          modelDetails={item}
                          isFavPage={isFavPage}
                          token={token ?? ({} as TokenIdType)}
                          handleLoginLiked={handleLoginLiked}
                          handleLoginOpen={handleLoginOpen}
                          handleLike={handleLike}
                          liked={likedModels.includes(item.id)}
                        />
                      </Suspense>
                    </Box>
                  ) : (
                    <Box
                      component={Link}
                      prefetch={true}
                      shallow={true}
                      href={`/details/${item.user_name}`}
                      sx={{
                        textDecoration: 'none',
                        height: '100%'
                      }}
                      onClick={() => handleModelRedirect(item.user_name)}
                    >
                      <Suspense>
                        <WorkerCard
                          modelDetails={item}
                          isFavPage={isFavPage}
                          token={token ?? ({} as TokenIdType)}
                          handleLoginLiked={handleLoginLiked}
                          handleLoginOpen={handleLoginOpen}
                          handleLike={handleLike}
                          liked={likedModels.includes(item.id)}
                        />
                      </Suspense>
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {typeof totalRows !== 'undefined' && filters && Number(totalRows) > 0 && (
          <ButtonMainBox>
            <PaginationMainBox>
              <UITheme2Pagination
                page={filters?.page}
                count={modelListing ? Math.ceil(totalRows / filters?.pageSize) : 1}
                onChange={handleChangePageUI}
                sx={{ backgroundColor: 'transparent' }}
              />
              <PaginationInWords
                page={filters?.page}
                limit={filters?.pageSize}
                total_rows={totalRows}
                offset={filters?.offset}
                isEscort={true}
              />
            </PaginationMainBox>
          </ButtonMainBox>
        )}
        {modelListing?.length > 0
          ? ''
          : !isFavPage && (
              <NotFoundModelBox>
                <UINewTypography variant="h1">
                  <FormattedMessage id="NoModelsFound" />
                </UINewTypography>
              </NotFoundModelBox>
            )}
      </WorkerCardMainBox>
      <NewSignupStyledModalDialog scroll="body" open={open} onClose={handleSignupClose} maxWidth="md" fullWidth>
        <GuestSignup onClose={handleSignupClose} onLoginOpen={handleLoginOpen} />
      </NewSignupStyledModalDialog>
      <UIStyledDialog scroll="body" open={openLogin} onClose={handleLoginClose} maxWidth="md" fullWidth>
        <GuestLogin
          isFreeCreditAvailable={isFreeCreditAvailable}
          onClose={handleLoginClose}
          onSignupOpen={handleSignupOpen}
          onFogotPasswordLinkOpen={handleResetPasswordLinkOpen}
          handleFreeCreditSignupOpen={handleFreeCreditSignupOpen}
          handleLoginOpen={handleLoginOpen}
          freeSignupOpen={freeSignupOpen}
          handleFreeCreditSignupClose={handleFreeCreditSignupClose}
          image="/images/auth/auth-model1.webp"
        />
      </UIStyledDialog>
      <UIStyledDialog scroll="body" open={openForgetPassLink} onClose={handleResetPasswordLinkClose} maxWidth="md" fullWidth>
        <GuestForgetPasswordLink onClose={handleResetPasswordLinkClose} onLoginOpen={handleLoginResetPasswordOpen} />
      </UIStyledDialog>
      <NewSignupStyledModalDialog scroll="body" open={freeSignupOpen} onClose={handleFreeCreditSignupClose} maxWidth="md" fullWidth>
        <HomePageFreeSignup onClose={handleFreeCreditSignupClose} onLoginOpen={handleLoginOpen} />
      </NewSignupStyledModalDialog>
    </HomeMainContainer>
  );
};

export default memo(HomeImageCard);
