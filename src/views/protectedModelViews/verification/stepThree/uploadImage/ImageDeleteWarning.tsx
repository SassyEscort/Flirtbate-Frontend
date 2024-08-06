import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider } from '@mui/material';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { signOut } from 'next-auth/react';
import StyleButtonV2 from 'components/UIComponents/StyleLoadingButton';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { usePathname } from 'next/navigation';
import { DialogContentSecondBox } from 'views/modelViews/checkInBox/CheckInBox.styled';
import {
  DialogContentMain,
  DialogTitleBox,
  DialogContentFristBox,
  DialogContentBoxQuestion,
  DialogContentBoxButton,
  DialogContentBoxUIThemeButton
} from 'views/protectedViews/logout/Logout.styled';

const ImageDeleteWarning = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const asPath = usePathname();

  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: asPath.startsWith('/model') ? '/model' : '/' });
    } catch (error) {
      toast.error('Error during sign-out:');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContentMain open={open} onClose={onClose} fullWidth>
      <DialogTitleBox id="responsive-modal-title">
        <UINewTypography variant="h6">
          <FormattedMessage id="ImagesDelete" />
        </UINewTypography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.text.secondary
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitleBox>
      <Box>
        <Divider
          sx={{
            px: 1,
            border: '1px solid #232027',
            display: { sm: 'block', display: 'none' }
          }}
        />
      </Box>
      <DialogContent sx={{ p: 0 }}>
        <DialogContentFristBox>
          <DialogContentSecondBox>
            <DialogContentBoxQuestion>
              <UINewTypography variant="h5" lineHeight="120%">
                <FormattedMessage id="AreYouSureImageDelete" />
              </UINewTypography>
            </DialogContentBoxQuestion>
            <DialogContentBoxButton>
              <StyleButtonV2 variant="contained" sx={{ width: '100%', maxWidth: '231px' }} onClick={handleConfirmDelete} loading={loading}>
                <UINewTypography variant="buttonLargeBold" color={'primary.200'}>
                  <FormattedMessage id="Confirm" />
                </UINewTypography>
              </StyleButtonV2>
              <DialogContentBoxUIThemeButton onClick={onClose}>
                <UINewTypography variant="buttonLargeBold" color={'primary.200'}>
                  <FormattedMessage id="Cancel" />
                </UINewTypography>
              </DialogContentBoxUIThemeButton>
            </DialogContentBoxButton>
          </DialogContentSecondBox>
        </DialogContentFristBox>
      </DialogContent>
    </DialogContentMain>
  );
};

export default ImageDeleteWarning;
