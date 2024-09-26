'use client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MainLayout from '../layouts/AdminLayout/DashboardLayout';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { Chip, CircularProgress, IconButton, MenuItem } from '@mui/material';
import moment from 'moment';
import { MoreVert, Visibility } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { PaginationSortByOption } from 'components/common/CustomPaginations/type';
import PaginationSortBy from 'components/common/CustomPaginations/PaginationSortBy';
import { PAGE_SIZE } from 'constants/pageConstants';
import TablePager from 'components/common/CustomPaginations/TablePager';
import { StyledPopover } from './CallLogs.styled';
import CallLogsListHead from './CallLogsListHead';
import CallLogsModel from './CallLogsModel';
import { callLogDataResponse, callLogsDetailsService } from 'services/adminServices/call-list/callListDetailsService';
import { debounce } from 'lodash';
import { CALL_LOG_ACTION } from 'constants/payoutsConstants';
import Link from 'next/link';
import { formatFullDate } from 'utils/dateAndTime';
import ReportFilters from 'components/Admin/ReportFilters/ReportFilters';

export type PaginationType = {
  page: number;
  offset: number;
  pageSize: number;
  orderField: string;
  sort_order: string;
  search_field: string;
  duration: string;
  fromDate: string;
  toDate: string;
};

export default function CallLogsContainer() {
  const [selectedPayoutData, setSelectedPayoutData] = useState<callLogDataResponse | null>(null);
  const [data, setData] = useState<callLogDataResponse[]>([]);
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [totalRecords, setTotalRecords] = useState(0);

  const currentMoment = moment();
  const oneMonthAgoMoment = moment().subtract(1, 'day');
  const fromDate = oneMonthAgoMoment.format('YYYY/MM/DD');
  const toDate = currentMoment.format('YYYY/MM/DD');
  const [filters, setFilters] = useState<PaginationType>({
    page: 1,
    offset: 0,
    pageSize: PAGE_SIZE,
    orderField: 'newest',
    sort_order: 'desc',
    search_field: '',
    duration: 'day',
    fromDate: fromDate,
    toDate: toDate
  });

  const SORT_BY_OPTIONS: PaginationSortByOption[] = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' }
  ];
  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();

      if (data) {
        setToken({ id: data.id, token: data.token });
      }
    };

    userToken();
  }, [token.token]);

  const handelFetch = async () => {
    setIsLoading(true);
    const res = await callLogsDetailsService.getCallLogsDetails(
      token.token,
      filters.pageSize,
      filters.offset,
      filters.search_field,
      filters.fromDate,
      filters.toDate
    );

    if (res) {
      if (res.code == 200) {
        setData(res?.data?.call_logs);
        setTotalRecords(res?.data?.aggregate?.total_rows);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token.token) {
      handelFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token.token, filters]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
    setAnchorEl(null);
  };
  const handleOpenCredit = (value: callLogDataResponse) => {
    setSelectedPayoutData(value);
    setCreditModalOpen(true);
  };
  const handleCloseCredit = () => {
    setCreditModalOpen(false);
  };

  const handleChangeFilter = useCallback((value: PaginationType) => {
    setFilters(value);
  }, []);

  const handleChangePage = useCallback(
    (value: number) => {
      const offset = (value - 1) * filters.pageSize;
      handleChangeFilter({ ...filters, page: value, offset: offset });
    },
    [filters, handleChangeFilter]
  );

  const handleChangePageSize = useCallback(
    (value: number) => {
      handleChangeFilter({ ...filters, pageSize: value, page: 1 });
    },
    [filters, handleChangeFilter]
  );

  const handleChangeOrderBy = useCallback(
    (field: string, type: string) => {
      handleChangeFilter({
        ...filters,
        sort_order: type,
        orderField: field,
        page: 1
      });
    },
    [filters, handleChangeFilter]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeSearch = useCallback(
    debounce((val: string) => {
      handleChangeFilter({ ...filters, search_field: val, page: 1 });
    }, 500),
    [filters, handleChangeFilter]
  );

  const handleChangeSearch = (val: string) => {
    debouncedChangeSearch(val);
  };

  const handleFilterDurationChange = (duration: string, fromDate: string, toDate: string) => {
    handleChangeFilter({ ...filters, duration, fromDate, toDate, page: 1 });
  };

  return (
    <MainLayout>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Call Logs History
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={1}>
          <ReportFilters
            duration={filters.duration}
            fromDate={filters.fromDate}
            toDate={filters.toDate}
            onFilterDurationChange={handleFilterDurationChange}
            handleChangeSearch={handleChangeSearch}
          />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
          <PaginationSortBy
            sortByOptions={SORT_BY_OPTIONS}
            orderField={filters.orderField}
            orderType={filters.sort_order}
            handleChangeOrderBy={handleChangeOrderBy}
          />
        </Box>
        <Card>
          <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ width: '100%' }}>
              <Table>
                <CallLogsListHead />
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : data?.length ? (
                    data?.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#757575de'
                            }
                          }}
                        >
                          <Link href={`/admin/model/details/${item?.model_id}`}>{item?.model_name || '-'}</Link>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#757575de'
                            }
                          }}
                        >
                          <Link href={`/admin/model/details/${item?.model_id}`}>{item?.model_email || '-'}</Link>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.customer_name || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.customer_email || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.status === CALL_LOG_ACTION.UNANSWERED ? (
                            <Chip label="Unanswered" color="warning" />
                          ) : item?.status === CALL_LOG_ACTION.ENDED ? (
                            <Chip label="Ended" color="success" />
                          ) : item?.status === CALL_LOG_ACTION.CANCELLED ? (
                            <Chip label="Cancelled" color="error" />
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {formatFullDate(item.created_at)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.credits_used || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.call_type || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.credits_per_minute || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.rate_per_minute ? `€${item.rate_per_minute?.toFixed(2)}` : '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.amount_earned ? `€${item.amount_earned?.toFixed(2)}` : '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.start_time && item?.end_time
                            ? moment(item.end_time).diff(moment(item.start_time), 'minutes') + ' mins'
                            : '-'}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => {
                              setSelectedPayoutData(item);
                              handleOpenMenu(e);
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                          <Typography variant="body1">Call logs history not found</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {data && data.length > 0 && (
              <Box sx={{ width: '100%', p: { xs: 1, md: 2 } }}>
                <TablePager
                  page={filters.page}
                  rowsPerPage={filters.pageSize}
                  handleChangePage={handleChangePage}
                  handleChangePageSize={handleChangePageSize}
                  totalRecords={totalRecords}
                />
              </Box>
            )}
          </Paper>
        </Card>
      </Container>
      <StyledPopover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            if (!selectedPayoutData) return;
            handleOpenCredit(selectedPayoutData);
            handleCloseMenu();
          }}
        >
          <Visibility sx={{ mr: 2 }} />
          View Details
        </MenuItem>
      </StyledPopover>
      <CallLogsModel open={creditModalOpen} onClose={handleCloseCredit} selectedPayoutData={selectedPayoutData} />
    </MainLayout>
  );
}
