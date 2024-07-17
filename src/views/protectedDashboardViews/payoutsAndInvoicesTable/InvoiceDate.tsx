import { useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, Button, Modal } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { InvoiceBox } from 'components/UIComponents/UIStyledSelect';
import UINewTypography from 'components/UIComponents/UINewTypography';
import UIThemeButton from 'components/UIComponents/UIStyledLoadingButton';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

const InvoiceDate = ({ handleDateChange }: { handleDateChange: (startDate: Date | null, endDate: Date | null) => void }) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = (ranges: { selection: DateRange }) => {
    const { startDate, endDate } = ranges.selection;
    setState([
      {
        startDate,
        endDate,
        key: 'selection'
      }
    ]);
    handleDateChange(startDate, endDate);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>
        <InvoiceBox>
          <UINewTypography variant="buttonLargeMenu">
            <FormattedMessage id="InvoiceDate" />
          </UINewTypography>
        </InvoiceBox>
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="date-range-picker" aria-describedby="date-range-picker-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <DateRangePicker ranges={state} onChange={handleSelect} moveRangeOnFirstSelection={false} months={2} direction="horizontal" />
          <UIThemeButton
            variant="contained"
            onClick={() => {
              const startDate = state[0]?.startDate ?? null;
              const endDate = state[0]?.endDate ?? null;
              handleDateChange(startDate, endDate);
              handleClose();
            }}
            sx={{
              backgroundColor: '#3d91ff',
              mt: 2
            }}
          >
            <UINewTypography variant="buttonLargeMenu" color="text.primary">
              <FormattedMessage id="Apply" />
            </UINewTypography>
          </UIThemeButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default InvoiceDate;
