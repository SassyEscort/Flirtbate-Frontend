'use client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import ProfileMenu from './ProfileMenu';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { CustomerDetails, CustomerDetailsService } from 'services/customerDetails/customerDetails.services';
import { getUserDataClient } from 'utils/getSessionData';
import Logout from 'views/protectedViews/logout';
import { FormattedMessage } from 'react-intl';
import LanguageDropdown from 'components/common/LanguageDropdown';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { NotificationDetailsService } from 'services/notification/notification.services';
import { Root } from 'services/notification/type';
import MyProfileChangePassword from 'views/protectedViews/myProfile/MyProfileChangePassword';
import { IconButtonBoxInner, UnReadCountMain } from 'views/protectedDashboardViews/dashboardNavItem/DashboardMenu.styled';
import { IconButtonBoxNew } from './Notification.styled';
import { HeaderMainBox } from './HeaderAuthComponent.styled';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { useCallFeatureContext } from '../../../../../../../context/CallFeatureContext';
import NotificationModalCustomerV2 from './NotificationModalCustomerV2';

export type NotificationFilters = {
  page: number;
  offset: number;
  pageSize: number;
};

const HeaderAuthComponent = () => {
  const { isCallEnded, avaialbleCredits, getToken, isNameChange } = useCallFeatureContext();

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElLogout, setAnchorElLogout] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElLogout);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>();
  const [balance, setBalance] = useState(0);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [anchorElNotification, setAnchorElNotification] = useState<HTMLButtonElement | null>(null);
  const [filters, setFilters] = useState<NotificationFilters>({
    page: 1,
    pageSize: 10,
    offset: 0
  });
  const [notificationDetails, setNotificationDetails] = useState<Root>();
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const uploadedImageURL = '/images/headerv2/profilePic.png';
  const firstChar = customerDetails?.customer_name ? customerDetails.customer_name.charAt(0).toUpperCase() : '';
  const notificationCount = useRef(0);

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChnagePassword = () => {
    setOpenChangePassword(false);
  };

  const handleClickLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLogout(event.currentTarget);
  };
  const handleCloseLogout = () => {
    setAnchorElLogout(null);
  };

  const handleCloseMenu = () => {
    setOpenProfileMenu(false);
    setAnchorEl(null);
  };

  const handleOpenNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenNotification(true);
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
    setAnchorElNotification(null);
  };

  const handleChangeFilter = (value: NotificationFilters) => {
    setFilters(value);
  };

  const handleDeductNotificationCount = () => {
    notificationCount.current = notificationCount.current - 1;
  };

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      getToken({ id: data?.id, token: data?.token });
      setToken({ id: data?.id, token: data?.token });
    };

    userToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCallEnded]);

  const handleCallback = useCallback(async () => {
    const notificationDetails = async () => {
      const ModelPayoutListObject = {
        limit: filters.pageSize,
        offset: filters.offset
      };
      const modelData = await NotificationDetailsService.getNotificationDetails(token.token, ModelPayoutListObject);
      setNotificationDetails(modelData);
    };

    if (token.token) {
      await notificationDetails();
    }
  }, [filters, token.token]);

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  useEffect(() => {
    const customerDetails = async () => {
      const customerData = await CustomerDetailsService.customerModelDetails(token.token);
      setCustomerDetails(customerData.data);
    };
    if (token.token) {
      customerDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token.id, token.token, isCallEnded, isNameChange]);

  useEffect(() => {
    const getCustomerCredit = async () => {
      if (token.token) {
        const getModel = await ModelDetailsService.getModelWithDraw(token.token);
        if (getModel?.data?.credits === null) {
          setBalance(0);
        } else {
          setBalance(getModel?.data?.credits);
        }
      }
    };

    if (token.token) {
      getCustomerCredit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token.id, token.token, isCallEnded]);

  useEffect(() => {
    if (isCallEnded && avaialbleCredits !== undefined) {
      setBalance(avaialbleCredits);
    }
  }, [avaialbleCredits, isCallEnded]);

  const handleOpenLogout = () => {
    setIsLogoutOpen(true);
  };

  const handleCloseLogoutt = () => {
    setIsLogoutOpen(false);
  };

  const unReadCount = notificationDetails?.data?.aggregate?.enabled && notificationDetails?.data?.aggregate?.enabled > 0;

  return (
    <>
      <HeaderMainBox>
        <Box display="flex">
          <LanguageDropdown />
        </Box>
        {isMdUp && (
          <Link href="/profile/credit">
            <Box alignItems="center" gap={1} display="flex">
              <Box component="img" src="/images/header/coin.png" />
              <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                {balance?.toFixed(2) || 0}
              </UINewTypography>
            </Box>
          </Link>
        )}

        {isMdUp && (
          <Link href="/profile/favourites" style={{ textDecoration: 'none' }}>
            <IconButton sx={{ height: 24, width: 24 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  position: 'relative'
                }}
              >
                <Box component="img" src="/images/header/heart.png" />
              </Box>
            </IconButton>
          </Link>
        )}

        <IconButton onClick={handleOpenNotification}>
          {unReadCount ? (
            <UnReadCountMain>
              <Box component="img" src="/images/header/dot.png" position="absolute" />
              <Box component="img" src="/images/header/noti.png" />
            </UnReadCountMain>
          ) : (
            <UnReadCountMain>
              <Box component="img" src="/images/header/noti.png" />
            </UnReadCountMain>
          )}
        </IconButton>
        <IconButtonBoxNew>
          <IconButtonBoxInner onClick={handleClickLogout}>
            <IconButton
              id="profile-menu"
              aria-controls={openProfileMenu ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openProfileMenu}
              disableFocusRipple
              disableRipple
              sx={{ p: 1 }}
            >
              <Avatar
                alt="User Photo"
                sx={{
                  height: 24,
                  width: 24
                }}
              >
                {firstChar}
              </Avatar>
            </IconButton>
            {isMdUp && (
              <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                {customerDetails?.customer_name || ''}
              </UINewTypography>
            )}
          </IconButtonBoxInner>
          <Menu
            id="basic-menu"
            anchorEl={anchorElLogout}
            open={open}
            onClose={handleCloseLogout}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            sx={{ '& .MuiMenu-paper > ul': { backgroundColor: '#1E0815 !important' } }}
          >
            <MenuItem onClick={handleCloseLogout}>
              <ListItemIcon>
                <Link href="/profile" onClick={handleCloseLogout}>
                  <IconButton id="profile-menu" aria-haspopup="true" disableFocusRipple disableRipple sx={{ p: 0 }}>
                    <Box component="img" src="/images/icons/userLine.png" sx={{ width: '24px', height: '24px' }} />
                  </IconButton>
                </Link>
              </ListItemIcon>
              <Link href="/profile" onClick={handleCloseLogout}>
                <ListItemText>
                  <UINewTypography variant="bodyLight" color="text.secondary">
                    <FormattedMessage id="MyProfile" />
                  </UINewTypography>
                </ListItemText>
              </Link>
            </MenuItem>
            <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
            {isMdDown && (
              <>
                <Link href="/profile/credit">
                  <MenuItem>
                    <ListItemIcon>
                      <IconButton id="profile-menu" aria-haspopup="true" disableFocusRipple disableRipple sx={{ p: 0 }}>
                        <Box component="img" src="/images/header/coin.png" />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText>
                      <UINewTypography variant="bodyLight" color="text.secondary">
                        {balance?.toFixed(2) || 0}
                      </UINewTypography>
                    </ListItemText>
                  </MenuItem>
                </Link>
                <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
              </>
            )}
            {isMdDown && (
              <>
                <MenuItem>
                  <ListItemIcon>
                    <IconButton id="profile-menu" aria-haspopup="true" disableFocusRipple disableRipple sx={{ p: 0 }}>
                      <Link href="/profile/favourites" style={{ textDecoration: 'none' }}>
                        <IconButton sx={{ height: 24, width: 24 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row-reverse',
                              position: 'relative'
                            }}
                          >
                            <Box component="img" src="/images/header/heart.png" />
                          </Box>
                        </IconButton>
                      </Link>
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText>
                    <Link href="/profile/favourites">
                      <UINewTypography variant="bodyLight" color="text.secondary">
                        <FormattedMessage id="Favourites" />
                      </UINewTypography>
                    </Link>
                  </ListItemText>
                </MenuItem>
                <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
              </>
            )}
            <MenuItem onClick={handleOpenChangePassword}>
              <ListItemIcon>
                <IconButton id="profile-menu" aria-haspopup="true" disableFocusRipple disableRipple sx={{ p: 0 }}>
                  <Box component="img" src="/images/icons/changepassword-img.png" sx={{ width: '24px', height: '24px' }} />
                </IconButton>
              </ListItemIcon>
              <ListItemText>
                <UINewTypography variant="bodyLight" color="text.secondary">
                  <FormattedMessage id="ChangePassword" />
                </UINewTypography>
              </ListItemText>
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
          <ProfileMenu profilePic={uploadedImageURL} open={openProfileMenu} handleClose={handleCloseMenu} anchorEl={anchorEl} />
          <MyProfileChangePassword onOpen={openChangePassword} onClose={handleCloseChnagePassword} token={token} />
        </IconButtonBoxNew>
      </HeaderMainBox>
      {notificationDetails && (
        <NotificationModalCustomerV2
          notificationDetails={notificationDetails ?? ({} as Root)}
          open={openNotification}
          anchorEl={anchorElNotification}
          filters={filters}
          handleClose={handleCloseNotification}
          handleChangeFilter={handleChangeFilter}
          handleDeductNotificationCount={handleDeductNotificationCount}
          token={token}
          handleCallback={handleCallback}
        />
      )}
    </>
  );
};

export default HeaderAuthComponent;
