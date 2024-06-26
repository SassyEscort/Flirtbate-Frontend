'use client';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { useMemo, useState } from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FormattedMessage } from 'react-intl';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import { TokenIdType } from 'views/protectedModelViews/verification';
import UploadImage from 'views/protectedModelViews/verification/stepThree/uploadImage';
import VerificationStepOne from 'views/protectedModelViews/verification/stepOne';
import DashboardPriceView from '../dashboardPriceView';
import { SelectDropdown } from './SidebarDropDown.styled';
import { Box, SelectChangeEvent } from '@mui/material';

const profileMenuList = [
  { menuName: <FormattedMessage id="Photos" />, id: 0 },
  { menuName: <FormattedMessage id="ProfileDetails" />, id: 1 },
  { menuName: <FormattedMessage id="Prices" />, id: 2 }
];

const MobileSidebar = ({
  modelDetails,
  token,
  handleModelApiChange
}: {
  modelDetails: ModelDetailsResponse;
  token: TokenIdType;
  handleModelApiChange: () => void;
}) => {
  const [menuId, setMenuId] = useState(0);
  const handleMenu = (event: SelectChangeEvent<unknown>) => {
    setMenuId(Number(event.target.value));
  };
  const handleSave = () => {
    setMenuId(0);
  };

  const handleSaveDetails = () => {
    setMenuId(1);
  };
  const modelPhotos = useMemo(() => modelDetails?.photos?.filter((data) => !data.is_document), [modelDetails?.photos]);

  return (
    <FormControl id="myProfile" sx={{ width: '100%' }}>
      <Box sx={{ mb: 4.625 }}>
        <UINewTypography variant="h2" color="text.secondary">
          <FormattedMessage id="MyProfile" />
        </UINewTypography>
      </Box>
      <SelectDropdown
        value={menuId}
        onChange={handleMenu}
        displayEmpty
        IconComponent={ExpandMore}
        renderValue={(selected) => {
          return profileMenuList.find((menu) => menu.id === selected)?.menuName;
        }}
        MenuProps={{ disableScrollLock: true }}
      >
        {profileMenuList.map((list) => (
          <MenuItem key={list.id} value={list.id}>
            {menuId === list.id ? (
              <UINewTypography variant="buttonLargeMenu" color="primary.400">
                {list.menuName}
              </UINewTypography>
            ) : (
              <UINewTypography variant="buttonLargeMenu">{list.menuName}</UINewTypography>
            )}
          </MenuItem>
        ))}
      </SelectDropdown>
      {menuId === 0 ? (
        <Box mt={2}>
          <UploadImage
            isEdit={true}
            workerPhotos={modelPhotos ?? []}
            token={token}
            handleModelApiChange={handleModelApiChange}
            handleNext={handleSave}
            isReviewEdit={false}
          />
        </Box>
      ) : menuId === 1 ? (
        <VerificationStepOne
          isEdit={true}
          modelDetails={modelDetails}
          token={token}
          handleNext={handleSaveDetails}
          handleModelApiChange={handleModelApiChange}
          isReviewEdit={false}
        />
      ) : (
        <DashboardPriceView isEdit={true} token={token} modelDetails={modelDetails} handleModelApiChange={handleModelApiChange} />
      )}
    </FormControl>
  );
};

export default MobileSidebar;
