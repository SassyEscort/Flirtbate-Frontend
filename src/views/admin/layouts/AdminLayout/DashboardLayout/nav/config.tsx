import CampaignIcon from '@mui/icons-material/Campaign';
import LineAxis from '@mui/icons-material/LineAxis';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';

export const getNavConfig = (id?: number) => {
  const navConfig = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: <LineAxis />
    },
    {
      title: 'Model',
      path: '/admin/model',
      icon: <CampaignIcon />
    },
    {
      title: 'Customer',
      path: '/admin/customer',
      icon: <PersonIcon />
    },
    {
      title: 'Payout',
      path: '/admin/payout',
      icon: <PaymentsIcon />
    },
    {
      title: 'Call Price',
      path: '/admin/call-price',
      icon: <PaidIcon />
    }
  ];

  return navConfig.filter(Boolean);
};
