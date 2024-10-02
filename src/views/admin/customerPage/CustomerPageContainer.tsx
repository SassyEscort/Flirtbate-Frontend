'use client';

import { useState, useCallback, useEffect } from 'react';
// import debounce from 'lodash/debounce';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import { formatFullDate } from 'utils/dateAndTime';
import { PAGE_SIZE } from 'constants/pageConstants';
import TablePager from 'components/common/CustomPaginations/TablePager';
import MenuItem from '@mui/material/MenuItem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { adminModelServices } from 'services/adminModel/adminModel.services';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import MainLayout from '../../../views/admin/layouts/AdminLayout/DashboardLayout';
import CustomerListHead from './CustomerListHead';
import {
  FilterBoxContainer,
  ModelActionPopover,
  NotFoundBox,
  StackBoxContainer,
  StackFirstBoxContainer,
  UserDescriptionText
} from './CustomerContainer.styled';
// import PaginationSearch from 'components/common/CustomPaginations/PaginationSearch';
import { CustomerDetailsPage } from 'services/adminModel/types';
import CustorModel from './CustomerModel';
import { Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { StyledSelectInputLabel } from 'components/UIComponents/StyleSelect';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { useSearchParams } from 'next/navigation';
import { getQueryParam } from 'utils/genericFunction';

export type WorkersPaginationType = {
  page: number;
  offset: number;
  pageSize: number;
  orderField: string;
  orderType: string;
  search_field: string;
  duration: string;
  fromDate: string;
  toDate: string;
  status: string;
  verificationStep: string;
  is_active: string;
};

// const SORT_BY_OPTIONS: PaginationSortByOption[] = [
//   { value: 'createdDate', label: 'Newest' },
//   { value: 'name', label: 'Name' },
//   { value: 'email', label: 'Email' }
// ];

export type TokenIdTypeAdmin = {
  token: string;
};

const IS_ACTIVE = [
  { value: '', label: 'Today' },
  { value: 'true', label: 'This week' },
  { value: 'false', label: 'Last 10 days' },
  { value: 'false', label: 'Last month' },
  { value: 'false', label: 'Date range' }
];

export default function CustomerPageContainer() {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<CustomerDetailsPage>();
  const [modelData, setModelData] = useState<CustomerDetailsPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [totalRecords, setTotalRecords] = useState(0);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [selectedPayoutData, setSelectedPayoutData] = useState<CustomerDetailsPage | null>(null);

  const searchParams = useSearchParams();

  const currentMoment = moment();
  const oneMonthAgoMoment = moment().subtract(1, 'month');
  const fromDate = oneMonthAgoMoment.format('YYYY/MM/DD');
  const toDate = currentMoment.format('YYYY/MM/DD');
  const [filters, setFilters] = useState<WorkersPaginationType>({
    page: 0,
    pageSize: PAGE_SIZE,
    offset: 0,
    orderField: 'createdDate',
    orderType: 'desc',
    search_field: '',
    duration: 'month',
    fromDate: fromDate,
    toDate: toDate,
    status: '',
    verificationStep: '',
    is_active: ''
  });

  const handleChangeFilter = useCallback((value: WorkersPaginationType) => {
    setFilters(value);
  }, []);

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      if (data) {
        setToken({ id: data.id, token: data.token });
      }
    };

    userToken();
  }, []);

  const fetchModelData = async () => {
    setIsLoading(true);
    if (token.token) {
      const filterparams = {
        limit: filters.pageSize,
        offset: filters.offset,
        search_field: filters.search_field,
        sort_order: filters.orderType,
        sort_field: filters.orderField
      };

      const data = await adminModelServices.getCustomerDetails(filterparams, token.token);

      setTotalRecords(data?.data?.aggregate?.total_rows);
      setModelData(data?.data?.customer_info);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchModelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token.token, filters]);

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

  // const handleChangeOrderBy = useCallback(
  //   (field: string, type: string) => {
  //     handleChangeFilter({
  //       ...filters,
  //       orderType: type,
  //       orderField: field,
  //       page: 1
  //     });
  //   },
  //   [filters, handleChangeFilter]
  // );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedChangeSearch = useCallback(
  //   debounce((val: string) => {
  //     handleChangeFilter({ ...filters, search_field: val, page: 1 });
  //   }, 500),
  //   [filters, handleChangeFilter]
  // );

  // const handleChangeSearch = (val: string) => {
  //   debouncedChangeSearch(val);
  // };

  const handleChangeSearch = (val: string) => {
    handleChangeFilter({ ...filters, search_field: val, page: 1 });
    // debouncedChangeSearch(val);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenCredit = (value: CustomerDetailsPage) => {
    setSelectedPayoutData(value);
    setCreditModalOpen(true);
  };
  const handleCloseCredit = () => {
    setCreditModalOpen(false);
  };

  const handleChangeIsActive = useCallback(
    (val: string) => {
      handleChangeFilter({ ...filters, is_active: val, page: 1 });
    },
    [filters, handleChangeFilter]
  );

  useEffect(() => {
    const searchValue = getQueryParam('search') ? getQueryParam('search') : '';
    handleChangeSearch(searchValue.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <MainLayout>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <StackBoxContainer>
              <Typography variant="h4" gutterBottom color="#202224">
                All signed up users
              </Typography>
            </StackBoxContainer>
            <StackFirstBoxContainer>
              {/* <PaginationSearch placeholder="Search" handleChangeSearch={handleChangeSearch} /> */}
            </StackFirstBoxContainer>

            <FilterBoxContainer>
              <Box sx={{ width: '100%', maxWidth: '68px', cursor: 'pointer' }}>
                <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: '24px' }}>
                  <FormControl fullWidth>
                    <Box component="img" src="/images/icons/filter-icon.svg" width={19.5} height={22.4}></Box>
                  </FormControl>
                </Grid>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ borderColor: '#979797' }} />

              <Box sx={{ width: '100%', maxWidth: '104px', cursor: 'pointer' }}>
                <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: '24px' }}>
                  <FormControl fullWidth>
                    <UINewTypography variant="bodySmall" color="black.main">
                      Filter By
                    </UINewTypography>
                  </FormControl>
                </Grid>
              </Box>

              <Grid item xs={12} sm={6} md={4} sx={{ width: '100%', maxWidth: '127px' }}>
                <FormControl fullWidth>
                  <StyledSelectInputLabel>Today</StyledSelectInputLabel>
                  <Select
                    name="is_active"
                    labelId="is_active"
                    label="Is deleted"
                    value={filters.is_active}
                    onChange={(e) => handleChangeIsActive(e.target.value as string)}
                    sx={{
                      width: '100%'
                    }}
                  >
                    {IS_ACTIVE.map((stat) => (
                      <MenuItem key={stat.value} value={stat.value}>
                        {stat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Box sx={{ cursor: 'pointer' }}>
                <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: '179px', marginLeft: '24px' }}>
                  <FormControl fullWidth>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Box component="img" src="/images/icons/ic-replay.svg" width={18} height={18} />
                      <UINewTypography variant="bodySmall" color="#EA0234">
                        Reset Filter
                      </UINewTypography>
                    </Box>
                  </FormControl>
                </Grid>
              </Box>
            </FilterBoxContainer>

            <Card sx={{ boxShadow: 'none', backgroundColor: 'white.main', borderRadius: '14px' }}>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ width: '100%' }}>
                  <Table>
                    <CustomerListHead />

                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={10}>
                            <NotFoundBox>
                              <CircularProgress />
                            </NotFoundBox>
                          </TableCell>
                        </TableRow>
                      ) : modelData?.length ? (
                        modelData?.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <UserDescriptionText component="th" scope="row" sx={{ color: '#FF68C0' }}>
                              {item?.name || '-'}
                            </UserDescriptionText>
                            <UserDescriptionText component="th" scope="row">
                              {item?.email || '-'}
                            </UserDescriptionText>
                            <UserDescriptionText sx={{ textAlign: 'left' }}>{formatFullDate(item?.createdDate, '-')}</UserDescriptionText>
                            <UserDescriptionText sx={{ textAlign: 'center' }}>-</UserDescriptionText>
                            <UserDescriptionText sx={{ textAlign: 'center' }}>-</UserDescriptionText>
                            <TableCell>
                              <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(e) => {
                                  setSelected(item);
                                  handleClick(e);
                                }}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <NotFoundBox>
                              <Typography variant="body1">Customer is not found</Typography>
                            </NotFoundBox>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Card>
            {modelData && modelData?.length > 0 && (
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
          </Box>
        </Container>
        <ModelActionPopover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              handleOpenCredit(selected as CustomerDetailsPage);
              handleCloseMenu();
            }}
          >
            <VisibilityIcon sx={{ mr: 2 }} />
            View Details
          </MenuItem>
        </ModelActionPopover>
        <CustorModel open={creditModalOpen} onClose={handleCloseCredit} selectedPayoutData={selectedPayoutData} />
      </MainLayout>
    </>
  );
}
