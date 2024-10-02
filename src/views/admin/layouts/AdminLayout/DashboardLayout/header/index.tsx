import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountPopover from './AccountPopover';
import NotificationsNone from '@mui/icons-material/NotificationsNone';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { bgBlur } from 'utils/Admin/cssStyles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Root } from 'services/notification/type';
import { NotificationDetailsService } from 'services/notification/notification.services';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { NotificationFiltersDashboard } from 'views/protectedDashboardViews/dashboardNavItem/HeaderAuthComponent';
import { NotificationBadge } from './AccountPopover.styled';
import NotificationModal from './NotificationModal';
import PaginationSearch from 'components/common/CustomPaginations/PaginationSearch';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 64;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`
  },
  paddingRight: '0 !important'
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

Header.propTypes = {
  onOpenNav: PropTypes.func
};

interface HeaderProps {
  onOpenNav: () => void;
}

export default function Header({ onOpenNav }: HeaderProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<NotificationFiltersDashboard>({
    page: 1,
    pageSize: 10,
    offset: 0
  });
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [notificationDetails, setNotificationDetails] = useState<Root>();
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [anchorElNotification, setAnchorElNotification] = useState<HTMLButtonElement | null>(null);

  const notificationCount = useRef(0);
  const unReadCount = notificationDetails?.data?.aggregate?.enabled && notificationDetails?.data?.aggregate?.enabled > 0;

  const handleChangeFilter = (value: NotificationFiltersDashboard) => {
    setFilters(value);
  };

  const handleOpenNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenNotification(true);
    setAnchorElNotification(event.currentTarget);
  };

  const handleDeductNotificationCount = () => {
    notificationCount.current = notificationCount.current - 1;
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
    setAnchorElNotification(null);
  };

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      setToken({ id: data.id, token: data.token });
    };

    userToken();
  }, []);

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

  const debouncedChangeSearch = debounce((val: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('search', val);
    if (val === '') {
      searchParams.delete('search');
    }

    router.push(`?${searchParams.toString()}`);
  }, 500);

  const handleChangeSearch = (val: string) => {
    debouncedChangeSearch(val);
  };

  return (
    <>
      <StyledRoot>
        <StyledToolbar>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary',
              display: { lg: 'none' }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1, width: '50%' }}>
              <PaginationSearch placeholder="Search" handleChangeSearch={handleChangeSearch} />
            </Box>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1
            }}
          >
            <IconButton onClick={handleOpenNotification}>
              {unReadCount ? (
                <NotificationBadge variant="dot" color="error">
                  <NotificationsNone sx={{ color: 'secondary.dark' }} />
                </NotificationBadge>
              ) : (
                <NotificationsNone sx={{ color: 'secondary.dark' }} />
              )}
            </IconButton>
            <AccountPopover />
          </Stack>
        </StyledToolbar>
      </StyledRoot>
      {notificationDetails && (
        <NotificationModal
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
}
