import Box from '@mui/material/Box';
import UINewTypography from 'components/UIComponents/UINewTypography';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import HomeMainModelContainer from 'views/modelViews/modelLayout/homeModelContainer';
import {
  SiderBarCircaleBox,
  SiderBarCircaleTextBox,
  SiderBarFirstBox,
  SiderBarMainContainer,
  SiderBarSecondBox,
  SiderBarSecondTextBox,
  SiderBarThiredBox,
  StartView,
  SwicthText,
  SwitchBox,
  TextViewStartBottom
} from './SideMenu.styled';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { PayoutService } from 'services/payout/payout.service';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import { FormattedMessage } from 'react-intl';

const SideMenu = ({
  modelDetails,
  token,
  handleModelApiChange
}: {
  modelDetails: ModelDetailsResponse;
  token: TokenIdType;
  handleModelApiChange: () => void;
}) => {
  const firstChar = modelDetails?.name ? modelDetails.name.charAt(0).toUpperCase() : '';

  const handleAvailability = async () => {
    try {
      if (token.token) {
        const data = await PayoutService.markOnline(token.token);
        if (data.code === 200) {
          handleModelApiChange();
        } else {
          toast.error(ErrorMessage);
        }
      }
    } catch (error) {
      toast.error(ErrorMessage);
    }
  };
  return (
    <HomeMainModelContainer>
      <SiderBarMainContainer>
        <SiderBarFirstBox>
          <SiderBarFirstBox>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SiderBarSecondBox>
                <SiderBarThiredBox>
                  <SiderBarCircaleBox></SiderBarCircaleBox>
                  <SiderBarCircaleTextBox>{firstChar}</SiderBarCircaleTextBox>
                </SiderBarThiredBox>
              </SiderBarSecondBox>

              <SiderBarSecondTextBox>
                <Box>
                  <UINewTypography variant="newTitle" color="text.primary">
                    {modelDetails?.name}
                  </UINewTypography>
                </Box>

                <SwicthText>
                  <StartView>
                    {[...Array(5)].map((_, index) => (
                      <StarRateRoundedIcon key={index} htmlColor="#FFB800" sx={{ width: '16px', height: '16px' }} />
                    ))}
                  </StartView>
                  <TextViewStartBottom>
                    <SwitchBox onClick={handleAvailability} checked={Boolean(modelDetails.is_online)} />

                    <UINewTypography variant="SubtitleSmallMedium" color="secondary.700" sx={{ textWrap: 'nowrap' }}>
                      {Boolean(modelDetails.is_online) ? <FormattedMessage id="Availability" /> : <FormattedMessage id="NotAvailable" />}
                    </UINewTypography>
                  </TextViewStartBottom>
                </SwicthText>
              </SiderBarSecondTextBox>
            </Box>
          </SiderBarFirstBox>
        </SiderBarFirstBox>
      </SiderBarMainContainer>
    </HomeMainModelContainer>
  );
};

export default SideMenu;
