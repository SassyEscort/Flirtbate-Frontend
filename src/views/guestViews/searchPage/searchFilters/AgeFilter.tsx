import ExpandMore from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { StyledSelectInputLabel, UIStyledSelect } from 'components/UIComponents/UIStyledSelect';
import { AGES } from 'constants/searchConstants';
import { FormattedMessage } from 'react-intl';

const AgeFilter = () => {
  return (
    <FormControl id="age" sx={{ width: '100%', maxWidth: { lg: '203px', sm: '235px' } }}>
      <StyledSelectInputLabel>
        <FormattedMessage id="AgeRange" />
      </StyledSelectInputLabel>
      <UIStyledSelect MenuProps={{ disableScrollLock: true }} label="age range" name="age" labelId="age" IconComponent={ExpandMore}>
        {AGES.map((age, key: number) => {
          return (
            <MenuItem key={key} value={age.id}>
              <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                {age.title}
              </UINewTypography>
            </MenuItem>
          );
        })}
      </UIStyledSelect>
    </FormControl>
  );
};

export default AgeFilter;
