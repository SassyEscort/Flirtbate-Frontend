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
import { Button, CircularProgress, IconButton, MenuItem } from '@mui/material';
import { MoreVert, Visibility } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { PaginationSortByOption } from 'components/common/CustomPaginations/type';
import PaginationSortBy from 'components/common/CustomPaginations/PaginationSortBy';
import { PAGE_SIZE } from 'constants/pageConstants';
import TablePager from 'components/common/CustomPaginations/TablePager';
import { StyledPopover } from './Boost.styled';
import BoostListHead from './BoostListHead';
import BoostModel from './BoostModel';
import AddEditBoostModal from './AddEditBoostModal';
import DeleteModal from 'components/UIComponents/DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';
import { AdminBoostProfileData, adminBoostProfilePlanServices } from 'services/adminBoostProfilePlan/adminBoostProfilePlan.services';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import { getQueryParam } from 'utils/genericFunction';
import { useSearchParams } from 'next/navigation';

export type PaginationType = {
  page: number;
  offset: number;
  pageSize: number;
  orderField: string;
  sort_order: string;
  search_field: string;
  limit: number;
};

export default function BoostContainer() {
  const [selectedBoostData, setSelectedBoostData] = useState<AdminBoostProfileData | null>(null);
  const [data, setData] = useState<AdminBoostProfileData[]>([]);
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [totalRecords, setTotalRecords] = useState(0);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [selectedBoost, setSelectedBoost] = useState<AdminBoostProfileData | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<PaginationType>({
    page: 1,
    offset: 0,
    pageSize: PAGE_SIZE,
    orderField: 'newest',
    sort_order: 'desc',
    search_field: '',
    limit: 10
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
    const res = await adminBoostProfilePlanServices.adminGetBoostProfile(token.token, filters.limit, filters.offset, filters.search_field);
    if (res) {
      if (res.code == 200) {
        setData(res?.data?.plans);
        setTotalRecords(res?.data?.aggregate.total_rows);
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
  const handleOpenCredit = (value: AdminBoostProfileData) => {
    setSelectedBoostData(value);
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

  // // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleOpenAddEditModal = () => {
    setOpenAddEditModal(true);
  };

  const handleCloseAddEditModal = () => {
    setOpenAddEditModal(false);
    setSelectedBoost(null);
  };

  const handleOpenDeleteCampaign = (val: number) => {
    setOpenDeleteModal(true);
    handleCloseMenu();
  };

  const handleCloseDeleteCampaign = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteClick = async () => {
    const res = await adminBoostProfilePlanServices.adminDeleteBoostProfile(Number(selectedBoostData?.id), token.token);
    if (res) {
      if (res.code === 200) {
        toast.success('Boost deleted successfully');
        handleCloseDeleteCampaign();
        handleChangeFilter({
          page: 1,
          offset: 0,
          pageSize: PAGE_SIZE,
          orderField: 'newest',
          sort_order: 'desc',
          search_field: '',
          limit: 10
        });
      } else {
        toast.error(ErrorMessage);
      }
    }
  };

  useEffect(() => {
    const searchValue = getQueryParam('search') ? getQueryParam('search') : '';
    handleChangeSearch(searchValue.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <MainLayout>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Boost Plans
          </Typography>
          <Box>
            <Button size="large" variant="contained" startIcon={<Add />} onClick={handleOpenAddEditModal} sx={{ width: '100%' }}>
              Add Boost
            </Button>
          </Box>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={1}>
          {/* <PaginationSearch placeholder="Search..." handleChangeSearch={handleChangeSearch} /> */}
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
                <BoostListHead />
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={13}>
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
                        <TableCell component="th" scope="row">
                          {item?.name || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.duration ? `${item.duration} hr` : '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.is_free ? (Boolean(item?.is_free) ? 'Yes' : 'No') : '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.is_active || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.cost ? `$${item.cost}` : '-'}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => {
                              setSelectedBoostData(item);
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
                          <Typography variant="body1">Boost history not found</Typography>
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
            if (!selectedBoostData) return;
            handleOpenCredit(selectedBoostData);
            handleCloseMenu();
          }}
        >
          <Visibility sx={{ mr: 2 }} />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenAddEditModal();
            setSelectedBoost(data.filter((x) => x.id === selectedBoostData?.id)[0]);
            handleCloseMenu();
          }}
        >
          <EditIcon sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteCampaign(Number(selectedBoostData?.id))}>
          <DeleteIcon sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </StyledPopover>
      <BoostModel open={creditModalOpen} onClose={handleCloseCredit} selectedBoostData={selectedBoostData} />
      {openAddEditModal && (
        <AddEditBoostModal
          open={openAddEditModal}
          onClose={handleCloseAddEditModal}
          selectedBoost={selectedBoost}
          handleChangeFilter={handleChangeFilter}
        />
      )}
      <DeleteModal open={openDeleteModal} handleClose={handleCloseDeleteCampaign} handleDeleteClick={handleDeleteClick} />
    </MainLayout>
  );
}
