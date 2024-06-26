'use client';

import UINewTypography from 'components/UIComponents/UINewTypography';
import { FormattedMessage } from 'react-intl';
import InvoiceDate from './searchFilters/invoiceDate';
import Status from './searchFilters/status';
import {
  FilterDropdownBox,
  FilterMainBox,
  FilterSecondBox,
  MainBox,
  ResetMainBox,
  SecondBox,
  StackBox,
  StyledTableRow,
  TableBox,
  TypographyBox,
  TypographyBoxTotalOfInvoices,
  UINewTypographyBox
} from './payoutsAndInvoicesTable.styled';
import BillingTable from './billingTable/BillingTable';
import PaginationSearch from './searchFilters/paginationSearch/PaginationSearch';
import HomeMainContainer from 'views/guestViews/guestLayout/homeContainer';

import Divider from '@mui/material/Divider';
import TableCell from '@mui/material/TableCell';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { getUserDataClient } from 'utils/getSessionData';
import { CircularProgress } from '@mui/material';
import { PayoutService } from 'services/payout/payout.service';
import { ModelPastPayoutDetailRes } from 'services/payout/types';
import { PaginationBox } from './billingTable/BillingTable.styled';
import { UITheme2Pagination } from 'components/UIComponents/PaginationV2/Pagination.styled';
import PaginationInWords from 'components/UIComponents/PaginationINWords';
import { debounce } from 'lodash';

export type PaginationType = {
  page: number;
  offset: number;
  pageSize: number;
  filter_text: string;
};

const PayoutsAndInvoices = () => {
  const [modelPayoutList, setModelPayoutList] = useState<ModelPastPayoutDetailRes>();
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [total_rows, setTotalRows] = useState(0);
  const [filters, setFilters] = useState({
    page: 0,
    pageSize: 20,
    offset: 0,
    filter_text: ''
  });

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      if (data && token) {
        setToken({ id: data.id, token: data.token });
      }
    };

    userToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchModelPayout = async () => {
      try {
        const ModelPayoutListObject = {
          limit: filters.pageSize,
          offset: filters.offset,
          filter_text: filters.filter_text
        };
        if (token.token) {
          setIsLoading(true);
          const data = await PayoutService.modelPastPayoutList(ModelPayoutListObject, token.token);
          if (data) {
            setModelPayoutList(data);
            setTotalRows(data.data.aggregate.total_rows);
          }
          if (data.code === 200) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        toast.error(ErrorMessage);
      }
    };

    fetchModelPayout();
  }, [token.token, token.id, filters]);

  const handleChangeFilter = useCallback((value: PaginationType) => {
    setFilters(value);
  }, []);

  const handleChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      const offset = (value - 1) * filters.pageSize;
      handleChangeFilter({ ...filters, page: value, offset: offset });
      scrollToTable();
    },
    [filters, handleChangeFilter]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeSearch = useCallback(
    debounce((val: string) => {
      handleChangeFilter({ ...filters, filter_text: val, page: 1 });
    }, 300),
    [filters, handleChangeFilter]
  );

  const handleChangeSearch = (val: string) => {
    debouncedChangeSearch(val);
  };

  const scrollToTable = () => {
    const tableElement = document.getElementById('tableSection');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HomeMainContainer>
        <MainBox id="tableSection">
          <SecondBox>
            <UINewTypographyBox>
              <FormattedMessage id="YourPastPayouts" />
            </UINewTypographyBox>
          </SecondBox>
          <FilterDropdownBox id="search">
            <StackBox direction="row" color="text.secondary">
              <PaginationSearch placeholder={'Search'} handleChangeSearch={handleChangeSearch} />
            </StackBox>
            <FilterMainBox>
              <FilterSecondBox>
                <InvoiceDate />
                <Status />
              </FilterSecondBox>

              <ResetMainBox>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'text.disabled', height: '40px', alignItems: 'center' }} />
                <UINewTypography variant="bodyLight" color="text.disabled">
                  <FormattedMessage id="Reset" />
                </UINewTypography>
              </ResetMainBox>
            </FilterMainBox>
          </FilterDropdownBox>
          <TypographyBox>
            <TypographyBoxTotalOfInvoices>
              <FormattedMessage id="TotalOfInvoices" />
            </TypographyBoxTotalOfInvoices>
          </TypographyBox>
          <TableBox>
            {isLoading ? (
              <StyledTableRow>
                <TableCell colSpan={10} sx={{ border: 'none' }}>
                  <CircularProgress />
                </TableCell>
              </StyledTableRow>
            ) : (
              <BillingTable modelPayoutList={modelPayoutList || ({} as ModelPastPayoutDetailRes)} />
            )}

            {total_rows > 0 && (
              <PaginationBox>
                <UITheme2Pagination
                  page={filters.page}
                  count={modelPayoutList ? Math.ceil(modelPayoutList.data.aggregate.total_rows / filters.pageSize) : 1}
                  onChange={handleChangePage}
                />
                <PaginationInWords
                  page={filters.page}
                  limit={filters.pageSize}
                  total_rows={total_rows}
                  offset={filters.offset}
                  isEscort={false}
                />
              </PaginationBox>
            )}
          </TableBox>
        </MainBox>
      </HomeMainContainer>
    </>
  );
};

export default PayoutsAndInvoices;
