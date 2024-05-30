'use client';

import Box from '@mui/material/Box';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { FormattedMessage } from 'react-intl';
import InvoiceDate from './searchFilters/invoiceDate';
import Status from './searchFilters/status';
import {
  FilterDropdownBox,
  FilterMainBox,
  MainBox,
  ResetMainBox,
  StackBox,
  TableBox,
  TypographyBox,
  UINewTypographyBox
} from './payoutsAndInvoicesTable.styled';
import BillingTable from './billingTable/BillingTable';
import PaginationSearch from './searchFilters/paginationSearch/PaginationSearch';
import HomeMainContainer from 'views/guestViews/guestLayout/homeContainer';
import { Divider } from '@mui/material';

const PayoutsAndInvoices = () => {
  return (
    <>
      <HomeMainContainer>
        <MainBox>
          <Box>
            <UINewTypographyBox variant="h2">
              <FormattedMessage id="YourPastPayouts" />
            </UINewTypographyBox>
          </Box>
          <FilterDropdownBox>
            <StackBox direction="row">
              <PaginationSearch placeholder={'Search'} />
            </StackBox>
            <FilterMainBox>
              <InvoiceDate />
              <Status />
            </FilterMainBox>
            <ResetMainBox>
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'text.disabled', height: '40px', alignItems: 'center' }} />
              <UINewTypography variant="bodyLight" color="text.disabled">
                <FormattedMessage id="Reset" />
              </UINewTypography>
            </ResetMainBox>
          </FilterDropdownBox>
          <TypographyBox>
            <UINewTypography variant="SubtitleSmallMedium">
              <FormattedMessage id="TotalOfInvoices" />
            </UINewTypography>
            <UINewTypography variant="buttonLargeBold">
              <FormattedMessage id="DownloadAll" />
            </UINewTypography>
          </TypographyBox>
          <TableBox>
            <BillingTable />
          </TableBox>
        </MainBox>
      </HomeMainContainer>
    </>
  );
};

export default PayoutsAndInvoices;
