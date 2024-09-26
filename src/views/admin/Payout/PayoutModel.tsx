/* eslint-disable @typescript-eslint/no-unused-vars */
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { DetailsDialogContent } from './Payout.styled';
import { payoutDataResponse } from 'services/adminServices/payout/payoutDetailsService';

const PayoutModel = ({
  open,
  onClose,
  selectedPayoutData
}: {
  open: boolean;
  onClose: () => void;
  selectedPayoutData: payoutDataResponse | null;
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle id="responsive-modal-title" display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Typography variant="subtitle">Payout History</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DetailsDialogContent dividers>
      {selectedPayoutData && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td>
                <strong>Model Name</strong>
              </td>
              <td>{selectedPayoutData?.name || '-'}</td>
            </tr>
            <tr>
              <td>
                <strong>Bank Name</strong>
              </td>
              <td>{selectedPayoutData?.bank_name || '-'}</td>
            </tr>
            <tr>
              <td>
                <strong>Account Name</strong>
              </td>
              <td>{selectedPayoutData?.account_name || '-'}</td>
            </tr>
            <tr>
              <td>
                <strong>Iban Number</strong>
              </td>
              <td>{selectedPayoutData?.iban_number || '-'}</td>
            </tr>
            <tr>
              <td>
                <strong>Payout Amount</strong>
              </td>
              <td>{selectedPayoutData?.amount ? `$${selectedPayoutData.amount?.toFixed(2)}` : '-'}</td>
            </tr>
            <tr>
              <td>
                <strong>Status</strong>
              </td>
              <td>{selectedPayoutData?.state || '-'}</td>
            </tr>
            <tr>
              <td>
                <strong>Created Date</strong>
              </td>
              <td>{selectedPayoutData?.created_at ? moment(selectedPayoutData.created_at).format('MMMM DD, YYYY hh:mm A') : '-'}</td>
            </tr>
          </tbody>
        </table>
      )}
    </DetailsDialogContent>
  </Dialog>
);

export default PayoutModel;
