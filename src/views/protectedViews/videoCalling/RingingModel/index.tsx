'use client';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider } from '@mui/material';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { DialogContentFristBox, DialogContentMain, DialogContentSecondBox, DialogTitleBox, SecondBoxContent } from './RingingModel.styled';
import VideoCalling from '../commonComponent';
import { FormattedMessage } from 'react-intl';

const RingingModel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <DialogContentMain open={true} onClose={onClose} fullWidth>
      <DialogTitleBox id="responsive-modal-title">
        <UINewTypography variant="h6">
          <FormattedMessage id="VideoCalling" />
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
            border: '1px solid #232027'
          }}
        />
      </Box>
      <DialogContent sx={{ p: 0 }}>
        <DialogContentFristBox>
          <DialogContentSecondBox>
            <SecondBoxContent>
              <VideoCalling showHeart={false} />
              <UINewTypography variant="bodyLight" color="text.secondary">
                <FormattedMessage id="Ringing" />
              </UINewTypography>
            </SecondBoxContent>
            <Box component="img" src="/images/icons/ringing-icon.png" width={40} height={40} />
          </DialogContentSecondBox>
        </DialogContentFristBox>
      </DialogContent>
    </DialogContentMain>
  );
};

export default RingingModel;
