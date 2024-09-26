import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { ModelEarningHistoryPageDetailsRes } from 'services/modelEarningHistory/typs';
import moment from 'moment';
import { DataNotBox } from '../EarningHistory.styled';
import { FormattedMessage } from 'react-intl';
import theme from 'themes/theme';

const TableData = ({ modelEarningHistory }: { modelEarningHistory: ModelEarningHistoryPageDetailsRes }) => {
  return (
    <TableBody>
      {modelEarningHistory?.data?.ledger_details?.length ? (
        modelEarningHistory?.data?.ledger_details?.map((dp, index) => (
          <TableRow key={index} sx={{ '& .MuiTableCell-root': { borderBottomColor: theme.palette.primary[700], padding: '24px 16px' } }}>
            <TableCell>
              <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                {dp?.customer_name ? dp?.customer_name : ' - '}
              </UINewTypography>
            </TableCell>
            <TableCell>
              <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                {dp?.call_duration
                  ? moment
                      .duration(dp?.call_duration)
                      .asMinutes()
                      ?.toFixed(2)
                  : '-'}
              </UINewTypography>
            </TableCell>{' '}
            <TableCell>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  component="img"
                  src="/images/workercards/dollar-img.avif"
                  sx={{
                    width: '20px',
                    height: '20px'
                  }}
                />
                <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                  {dp.credits_used}
                </UINewTypography>
              </Box>
            </TableCell>{' '}
            <TableCell>
              <UINewTypography variant="buttonLargeMenu" color="text.secondary">
                {moment(dp?.created_at).format('DD MMMM YYYY')}
              </UINewTypography>
            </TableCell>
            <TableCell>
              <UINewTypography variant="body" color="text.secondary">
                $ {dp?.amount}
              </UINewTypography>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} sx={{ border: 'none' }}>
            <DataNotBox>
              <UINewTypography variant="buttonLargeMenu">
                <FormattedMessage id="NoDataToShowHere" />
              </UINewTypography>
            </DataNotBox>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableData;
