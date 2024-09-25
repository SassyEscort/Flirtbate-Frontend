'use client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import UIThemeButton from 'components/UIComponents/UIStyledLoadingButton';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import { useEffect, useState } from 'react';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { getUserDataClient } from 'utils/getSessionData';
import LanguageDropdown from 'components/common/LanguageDropdown';
import { MODEL_ACTIVE_STEP } from 'constants/workerVerification';
import Logout from 'views/protectedViews/logout';
import ProfileMenu from 'views/protectedViews/protectedLayout/Header/TopNavItem/WorkerNavItem/ProfileMenu';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { FirstBoxContainer, SecBoxContainer, ThirdBoxContainer } from './ModelHeaderAuthComponent.styled';
import { useAuthContext } from '../../../../../context/AuthContext';

export type NotificationFilters = {
  page: number;
  isRead?: number;
};

const ModelHeaderAuthComponent = () => {
  const { isCustomer } = useAuthContext();

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [modelDetails, setModelDetails] = useState<ModelDetailsResponse>();
  const [anchorElLogout, setAnchorElLogout] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElLogout);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const firstChar = modelDetails?.name ? modelDetails.name.charAt(0).toUpperCase() : '';

  const handleClickLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLogout(event.currentTarget);
  };
  const handleCloseLogout = () => {
    setAnchorElLogout(null);
  };

  const handleOpenLogout = () => {
    setIsLogoutOpen(true);
  };

  const handleCloseLogoutt = () => {
    setIsLogoutOpen(false);
  };

  const handleCloseMenu = () => {
    setOpenProfileMenu(false);
    setAnchorEl(null);
  };

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
    modelDetails();
  }, [isCustomer, token.id, token.token]);

  const isSmUP = useMediaQuery(theme.breakpoints.up('sm'));

  const uploadedImageURL = '/images/headerv2/profilePic.png';

  const isVerificationPendingOrCompleted = (step: string | undefined) => {
    return step === MODEL_ACTIVE_STEP.IN_REVIEW || step === MODEL_ACTIVE_STEP.ONBOARDED || step === MODEL_ACTIVE_STEP.VERIFIED;
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={{ xs: 2.5, sm: 4.5 }}>
        <Box display="flex">
          <LanguageDropdown />
        </Box>

        <IconButton sx={{ height: 24, width: 24 }}>
          <>
            <ThirdBoxContainer>
              <Box component="img" src="/images/header/dot.png" position="absolute" />
              <Box component="img" src="/images/header/noti.png" />
            </ThirdBoxContainer>
          </>
        </IconButton>
        <FirstBoxContainer onClick={handleClickLogout}>
          <SecBoxContainer>
            <IconButton id="profile-menu" aria-haspopup="true" disableFocusRipple disableRipple sx={{ p: 0 }}>
              <Avatar
                alt="User Photo"
                src={uploadedImageURL}
                sx={{
                  height: 24,
                  width: 24
                }}
              />
            </IconButton>
            {isMdUp && (
              <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                {modelDetails?.name}
              </UINewTypography>
            )}
          </SecBoxContainer>
          <Menu
            id="basic-menu"
            anchorEl={anchorElLogout}
            open={open}
            onClose={handleCloseLogout}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            sx={{ '& .MuiMenu-paper > ul': { backgroundColor: 'secondary.dark !important' } }}
          >
            <MenuItem onClick={handleCloseLogout}>
              <ListItemIcon>
                <IconButton id="profile-menu" aria-haspopup="true" disableFocusRipple disableRipple sx={{ p: 0 }}>
                  <Box component="img" src="/images/icons/userLine.png" sx={{ width: '24px', height: '24px' }} />
                </IconButton>
              </ListItemIcon>
              <Link href="/model/dashboard" onClick={handleCloseLogout}>
                <ListItemText>
                  <UINewTypography variant="bodyLight" color="text.secondary">
                    <FormattedMessage id="MyProfile" />
                  </UINewTypography>
                </ListItemText>
              </Link>
            </MenuItem>
            <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
            <MenuItem onClick={handleOpenLogout}>
              <ListItemIcon>
                <IconButton id="profile-menu" aria-haspopup="true" disableFocusRipple disableRipple sx={{ p: 0 }}>
                  <Box component="img" src="/images/profile-vector/Vector-6.png" sx={{ width: '20px', height: '20px' }} />
                </IconButton>
              </ListItemIcon>
              <ListItemText>
                <UINewTypography variant="bodyLight" color="text.secondary">
                  <FormattedMessage id="LogOut" />
                </UINewTypography>
              </ListItemText>
            </MenuItem>
            <Logout open={isLogoutOpen} onClose={handleCloseLogoutt} />
          </Menu>
          <ProfileMenu profilePic={firstChar} open={openProfileMenu} handleClose={handleCloseMenu} anchorEl={anchorEl} />
        </FirstBoxContainer>

        {isSmUP && !isVerificationPendingOrCompleted(modelDetails?.verification_step) && (
          <Link href="/model/profile">
            <UIThemeButton variant="contained" sx={{ width: '195px', height: '48px', borderRadius: '8px' }}>
              <UINewTypography variant="body" color="primary.200" whiteSpace="nowrap">
                <FormattedMessage id="CompleteYourProfile" />
              </UINewTypography>
            </UIThemeButton>
          </Link>
        )}
      </Box>
    </>
  );
};

export default ModelHeaderAuthComponent;
