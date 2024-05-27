import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { usePathname } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'themes/theme';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import {
  CommonMenuBox,
  MobileComponentBoxContainer,
  MobileComponentSecBoxContainer,
  MobileTextStyleContainer,
  SelectedTab
} from './nav.styled';
import Link from 'next/link';
import { DashboardModelTabs } from 'constants/modelConstants';
import ModelNavbar from './modelNavbar';

ModelNav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func
};

interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export default function ModelNav({ openNav, onCloseNav }: NavProps) {
  const router = usePathname();

  const maindashboardTabIndex: { [key: string]: number } = {
    dashboard: 1,
    earnings: 2,
    favourites: 3,
    payouts: 4,
    helpandinfo: 5,
    logout: 6
  };

  const modifiedPath = router.split('/profile').join('').split('/').join('');

  const tabIndex = maindashboardTabIndex[modifiedPath] || 2;

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box component="nav" sx={{ flexShrink: { lg: 0 } }}>
      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        open={isMdUp ? true : openNav}
        onClose={onCloseNav}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            border: 'none',
            width: 299,
            position: 'static'
          }
        }}
        sx={{ height: '100%', width: 299 }}
      >
        <ModelNavbar tabIndex={tabIndex} />
      </Drawer>
      {isMdDown && (
        <MobileComponentBoxContainer>
          <Tabs
            value={value}
            variant="scrollable"
            onChange={handleChange}
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            {DashboardModelTabs.map((tab, index) => {
              return index === tabIndex - 1 ? (
                <CommonMenuBox key={index} sx={{ color: 'text.primary' }}>
                  <Link prefetch={false} href={tab.path} style={{ textDecoration: 'none' }}>
                    <SelectedTab>
                      <Box
                        component="img"
                        width={20}
                        height="auto"
                        src={tab.img}
                        sx={{
                          filter: 'invert(39%) sepia(43%) saturate(1339%) hue-rotate(280deg) brightness(87%) contrast(103%)'
                        }}
                      />
                      <Box sx={{ color: 'primary.400' }}>
                        <MobileTextStyleContainer label={tab.name} />
                      </Box>
                    </SelectedTab>
                  </Link>
                </CommonMenuBox>
              ) : (
                <CommonMenuBox key={index} sx={{ color: 'text.primary' }}>
                  <Link prefetch={false} href={tab.path} style={{ textDecoration: 'none' }}>
                    <MobileComponentSecBoxContainer>
                      <Box component="img" src={tab.img} width={20} height="auto" />
                      <MobileTextStyleContainer label={tab.name} />
                    </MobileComponentSecBoxContainer>
                  </Link>
                </CommonMenuBox>
              );
            })}
          </Tabs>
          <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
        </MobileComponentBoxContainer>
      )}
    </Box>
  );
}