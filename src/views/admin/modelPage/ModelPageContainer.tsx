'use client';

import { useState, useCallback, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import moment from 'moment';
import ReportFilters from 'components/Admin/ReportFilters/ReportFilters';
import { formatFullDate } from 'utils/dateAndTime';
import ModelListHead from './ModelListHead';
import { PAGE_SIZE } from 'constants/pageConstants';
import { MODEL_ACTION } from 'constants/profileConstants';
import TablePager from 'components/common/CustomPaginations/TablePager';
import MenuItem from '@mui/material/MenuItem';
import { adminModelServices, ModelListing } from 'services/adminModel/adminModel.services';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import MainLayout from '../../../views/admin/layouts/AdminLayout/DashboardLayout';
import FormControl from '@mui/material/FormControl';
import { StyledSelectInputLabel } from 'components/UIComponents/StyleSelect';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { ErrorChipBox, FilterBox, NotFoundBox, PandingChipBox, SuccessChipBox, SwitchBoxContainer } from './ModelPageContainer.styled';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import Link from 'next/link';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { Divider } from '@mui/material';
import ModelDelete from './ModelDelete';
import ApproveRejectPendingModel from './ApproveRejectPendingModel';
import { useSearchParams } from 'next/navigation';
import { getQueryParam } from 'utils/genericFunction';

export type WorkersPaginationType = {
  page: number;
  offset: number;
  pageSize: number;
  orderField: string;
  orderType: string;
  filter_Text: string;
  duration: string;
  fromDate: string;
  toDate: string;
  status: string;
  verificationStep: string;
  is_active: string;
};

// const SORT_BY_OPTIONS: PaginationSortByOption[] = [
//   { value: 'created_at', label: 'Newest' },
//   { value: 'name', label: 'Name' },
//   { value: 'email', label: 'Email' },
//   { value: 'last_active', label: 'Last active' },
//   { value: 'last_login', label: 'Last login' }
// ];

const StatusOfPlan = [
  { value: 'Pending', label: <PandingChipBox label="Pending" /> },
  { value: 'Approved', label: <SuccessChipBox label="Approved" /> },
  { value: 'Rejected', label: <ErrorChipBox label="Rejected" /> }
];

const IS_ACTIVE = [
  { value: '', label: 'Today' },
  { value: 'true', label: 'This week' },
  { value: 'false', label: 'Last 10 days' },
  { value: 'false', label: 'Last month' },
  { value: 'false', label: 'Date range' }
];

const verification_step = [
  { value: '', label: 'All' },
  { value: 'Basic_Details', label: 'Basic Details' },
  { value: 'Upload_Documents', label: 'Upload Documents' },
  { value: 'Upload_Photos', label: 'Upload Photos' },
  { value: 'Onboarded', label: 'Onboarded' },
  { value: 'In_Review', label: 'In Review' },
  { value: 'Verified', label: 'Verified' }
];

export type TokenIdTypeAdmin = {
  token: string;
};

export default function ModelPageContainer({ handlePayoutStep }: { handlePayoutStep?: () => void }) {
  // const router = useRouter();
  const [selected, setSelected] = useState<ModelListing>();
  const [modelData, setModelData] = useState<ModelListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [totalRecords, setTotalRecords] = useState(0);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  const searchParams = useSearchParams();

  const currentMoment = moment();
  const oneMonthAgoMoment = moment().subtract(1, 'day');
  const fromDate = oneMonthAgoMoment.format('YYYY/MM/DD');
  const toDate = currentMoment.format('YYYY/MM/DD');
  const [filters, setFilters] = useState<WorkersPaginationType>({
    page: 1,
    pageSize: PAGE_SIZE,
    offset: 0,
    orderField: 'created_at',
    orderType: 'desc',
    filter_Text: '',
    duration: 'day',
    fromDate: fromDate,
    toDate: toDate,
    status: '',
    verificationStep: '',
    is_active: ''
  });

  const handleModelDetailsRefetch = useCallback(() => {
    fetchModelData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleModelDetailsDelete = async (id: number) => {
    try {
      if (token.token) {
        const data = await adminModelServices.modelDetailsDelete(token.token, id);
        if (data.code === 200) {
          handleModelDetailsRefetch();
          toast.success('Success');
          if (handlePayoutStep) {
            handlePayoutStep();
          }
        } else {
          toast.error(data?.error);
        }
      }
    } catch (error) {
      toast.error(ErrorMessage);
    }
  };

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
        token: token.token,
        limit: filters.pageSize,
        offset: filters.offset,
        filter_text: filters.filter_Text,
        from_date: filters.fromDate,
        to_date: filters.toDate,
        sort_order: filters.orderType,
        sort_field: filters.orderField,
        verification_step: filters.verificationStep,
        profile_status: filters.status,
        is_active: filters.is_active
      };

      const data = await adminModelServices.getModelList(filterparams);
      setTotalRecords(data?.aggregate?.total_rows);
      setModelData(data?.model_details);
    }
    setIsLoading(false);
  };

  const handleModelListRefetch = useCallback(() => {
    fetchModelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filters.filter_Text]);

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
  //     handleChangeFilter({ ...filters, filter_Text: val, page: 1 });
  //   }, 500),
  //   [filters, handleChangeFilter]
  // );

  const handleChangeSearch = (val: string) => {
    handleChangeFilter({ ...filters, filter_Text: val, page: 1 });
    // debouncedChangeSearch(val);
  };

  const handleChangeStatus = useCallback(
    (val: string) => {
      handleChangeFilter({ ...filters, status: val, page: 1 });
    },
    [filters, handleChangeFilter]
  );
  const handleChangeVerificationStep = useCallback(
    (val: string) => {
      handleChangeFilter({ ...filters, verificationStep: val, page: 1 });
    },
    [filters, handleChangeFilter]
  );
  const handleChangeIsActive = useCallback(
    (val: string) => {
      handleChangeFilter({ ...filters, is_active: val, page: 1 });
    },
    [filters, handleChangeFilter]
  );

  const handleFilterDurationChange = (duration: string, fromDate: string, toDate: string) => {
    handleChangeFilter({ ...filters, duration, fromDate, toDate, page: 1 });
  };

  // const handelViewDetails = async () => {
  //   router.push(`/admin/model/details/${selected?.id}`);
  // };

  const handleHideModel = async () => {
    await adminModelServices.modelAction(token.token, Number(selected?.id), String(selected?.profile_status), false);
    handleModelListRefetch();
  };

  const handleShowModel = async () => {
    await adminModelServices.modelAction(token.token, Number(selected?.id), String(selected?.profile_status), true);
    handleModelListRefetch();
  };

  // const handleModelDetailsIsOffline = async (id: number) => {
  //   try {
  //     if (token.token) {
  //       const data = await adminModelServices.modelDetailsStatusOffline(token.token, id);
  //       handleCloseMenu();
  //       if (data.code === 200) {
  //         handleModelListRefetch();
  //         toast.success('Success');
  //       } else {
  //         toast.error(data?.error);
  //       }
  //     }
  //   } catch (error) {
  //     toast.error(ErrorMessage);
  //   }
  // };

  const handleDeletmodelClick = () => {
    setDeleteModelOpen(true);
  };

  const handleDeletmodelClose = () => {
    setDeleteModelOpen(false);
  };

  const handleModelClick = () => {
    setModelOpen(true);
  };

  const handleModelClose = () => {
    setModelOpen(false);
  };

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
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" color="black.main">
                All Models
              </Typography>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={1}>
              <ReportFilters
                duration={filters.duration}
                fromDate={filters.fromDate}
                toDate={filters.toDate}
                onFilterDurationChange={handleFilterDurationChange}
                // handleChangeSearch={handleChangeSearch}
              />
            </Stack>
            <FilterBox>
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
              <Grid item xs={12} sm={6} md={4} sx={{ width: '100%', maxWidth: '170px' }}>
                <FormControl fullWidth>
                  <StyledSelectInputLabel sx={{ backgroundColor: 'common.white' }}>Status</StyledSelectInputLabel>
                  <Select
                    name="status"
                    labelId="status"
                    label="Profile Status"
                    value={filters.status}
                    onChange={(e) => handleChangeStatus(e.target.value as string)}
                    sx={{
                      width: '100%'
                    }}
                  >
                    {StatusOfPlan?.map((stat) => (
                      <MenuItem key={stat?.value} value={stat?.value}>
                        {stat?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{ width: '100%', maxWidth: '179px' }}>
                <FormControl fullWidth>
                  <StyledSelectInputLabel sx={{ backgroundColor: 'common.white' }}>Country</StyledSelectInputLabel>
                  <Select
                    name="verification_step"
                    labelId="verification_step"
                    label="verification step"
                    value={filters.verificationStep}
                    onChange={(e) => handleChangeVerificationStep(e.target.value as string)}
                    sx={{
                      width: '100%'
                    }}
                  >
                    {verification_step?.map((stat) => (
                      <MenuItem key={stat?.value} value={stat?.value}>
                        {stat?.label}
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
            </FilterBox>

            <Card sx={{ boxShadow: 'none', backgroundColor: 'white.main', borderRadius: '14px' }}>
              <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                <TableContainer sx={{ width: '100%' }}>
                  <Table>
                    <ModelListHead />
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={10}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 2
                              }}
                            >
                              <CircularProgress />
                            </Box>
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
                            <TableCell component="th" scope="row">
                              <Link href={`/admin/model/details/${item?.id}`}>
                                <UINewTypography color="rgba(255, 104, 192, 1)">{item?.name || '-'}</UINewTypography>
                              </Link>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Link href={`/admin/model/details/${item?.id}`}>{item?.email || '-'}</Link>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'left' }}>{formatFullDate(item?.created_at, '-')}</TableCell>
                            <TableCell sx={{ textAlign: 'left' }}>-</TableCell>
                            <TableCell sx={{ textAlign: 'left' }}>-</TableCell>

                            <TableCell
                              sx={{ textAlign: 'center' }}
                              onClick={(e) => {
                                setSelected(item);
                              }}
                            >
                              {item?.profile_status === MODEL_ACTION.PENDING ? (
                                <Box sx={{ cursor: 'pointer' }} onClick={handleModelClick}>
                                  <PandingChipBox label="Pending" />
                                </Box>
                              ) : item?.profile_status === MODEL_ACTION.APPROVE && item?.is_visible ? (
                                <Box sx={{ cursor: 'pointer' }} onClick={handleModelClick}>
                                  <SuccessChipBox label="Approved" />
                                </Box>
                              ) : item?.profile_status === MODEL_ACTION.REJECT ? (
                                <Box sx={{ cursor: 'pointer' }} onClick={handleModelClick}>
                                  <ErrorChipBox label="Rejected" />
                                </Box>
                              ) : !item?.is_visible && item?.profile_status !== MODEL_ACTION.PENDING ? (
                                <Chip label="Hidden" />
                              ) : (
                                '-'
                              )}
                            </TableCell>

                            <TableCell>
                              <Box
                                aria-label="more"
                                id="long-button"
                                aria-haspopup="true"
                                onClick={(e) => {
                                  setSelected(item);
                                }}
                              >
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                  <SwitchBoxContainer />

                                  {item?.is_visible ? (
                                    <>
                                      <Box sx={{ cursor: 'pointer' }} onClick={handleHideModel}>
                                        <Box component="img" src="/images/icons/unhide-toggle.svg" />
                                      </Box>
                                    </>
                                  ) : (
                                    !item?.is_visible && (
                                      <>
                                        <Box sx={{ cursor: 'pointer' }} onClick={handleShowModel}>
                                          <Box component="img" src="/images/icons/unhide-toggle-icon.svg" />
                                        </Box>
                                      </>
                                    )
                                  )}
                                  <Box sx={{ cursor: 'pointer' }} onClick={handleDeletmodelClick}>
                                    <Box component="img" src="/images/icons/delete-icon.svg" />
                                  </Box>
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <NotFoundBox>
                              <Typography variant="body1">Model is not found.</Typography>
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
        <ModelDelete
          open={deleteModelOpen}
          onClose={handleDeletmodelClose}
          handleModelDetailsDelete={handleModelDetailsDelete}
          deletedID={selected?.id ?? 0}
        />
        <ApproveRejectPendingModel open={modelOpen} onClose={handleModelClose} modelDetails={selected} />
      </MainLayout>
    </>
  );
}
