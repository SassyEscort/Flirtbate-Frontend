import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import LanguageDropdown from 'components/common/LanguageDropdown';
import { Menu, MenuItem, useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import ProfileMenu from './ProfileMenu';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { CustomerDetails, CustomerDetailsService } from 'services/customerDetails/customerDetails.services';
import { getUserDataClientNew } from 'utils/getSessionData';
import { CommonMenuBox } from 'views/protectedDashboardViews/dashboardNavbar/nav.styled';
import UINewTypography from 'components/UIComponents/UINewTypography';
import Logout from 'views/protectedViews/logout';
import { FormattedMessage } from 'react-intl';

export type NotificationFilters = {
  page: number;
  isRead?: number;
};

const HeaderAuthComponent = () => {
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElLogout, setAnchorElLogout] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElLogout);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>();

  const uploadedImageURL = '/images/headerv2/profilePic.png';
  const firstChar = customerDetails?.customer_name ? customerDetails.customer_name.charAt(0).toUpperCase() : '';

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

  useEffect(() => {
    const userToken = async () => {
      const data: any = await getUserDataClientNew();

      const pictureData = JSON.parse(data.picture);
      const token = pictureData.token;

      setToken({ id: data.id, token: token });
    };

    userToken();
  }, []);

  useEffect(() => {
    const customerDetails = async () => {
      const customerData = await CustomerDetailsService.customerModelDetails(token.token);
      setCustomerDetails(customerData.data);
    };
    if (token.token) {
      customerDetails();
    }
  }, [token.id, token.token]);

  const handleOpenLogout = () => {
    setIsLogoutOpen(true);
  };

  const handleCloseLogoutt = () => {
    setIsLogoutOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={{ xs: 2.5, sm: 4.5 }}>
        <Box display="flex">
          <LanguageDropdown />
        </Box>
        {isMdUp && (
          <Box alignItems="center" gap={1} display="flex">
            <Box component="img" src="/images/header/coin.png" />
            <Typography variant="buttonLargeMenu" color="text.secondary">
              40
            </Typography>
          </Box>
        )}

        {isMdUp && (
          <IconButton sx={{ height: 24, width: 24 }}>
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  position: 'relative'
                }}
              >
                <Box component="img" src="/images/header/heart.png" />
              </Box>
            </>
          </IconButton>
        )}
        <IconButton sx={{ height: 24, width: 24 }}>
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                position: 'relative'
              }}
            >
              <Box component="img" src="/images/header/dot.png" position="absolute" />
              <Box component="img" src="/images/header/noti.png" />
            </Box>
          </>
        </IconButton>
        <Box display="flex" alignItems="center" gap={1}>
          <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer' }} onClick={handleClickLogout}>
            <Link href="/profile">
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
                <Typography variant="buttonLargeMenu" color="text.secondary">
                  {customerDetails?.customer_name || ''}
                </Typography>
              )}
            </Link>
          </Box>
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
            <MenuItem>
              <CommonMenuBox sx={{ color: 'text.primary' }} onClick={handleOpenLogout}>
                <Box component="img" src="/images/profile-vector/Vector-6.png" height={16} mr={1} />
                <UINewTypography variant="buttonLargeMenu">
                  <FormattedMessage id="LogOut" />
                </UINewTypography>
              </CommonMenuBox>
              <Logout open={isLogoutOpen} onClose={handleCloseLogoutt} />
            </MenuItem>
          </Menu>
          <ProfileMenu profilePic={uploadedImageURL} open={openProfileMenu} handleClose={handleCloseMenu} anchorEl={anchorEl} />
        </Box>
      </Box>
    </>
  );
};

export default HeaderAuthComponent;
