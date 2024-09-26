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
import { CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { MoreVert, Visibility } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { getUserDataClient } from 'utils/getSessionData';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { PaginationSortByOption } from 'components/common/CustomPaginations/type';
import PaginationSortBy from 'components/common/CustomPaginations/PaginationSortBy';
import { PAGE_SIZE } from 'constants/pageConstants';
import TablePager from 'components/common/CustomPaginations/TablePager';
import { debounce } from 'lodash';
import DeleteModal from 'components/UIComponents/DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import PaginationSearch from 'components/common/CustomPaginations/PaginationSearch';
import SEOModel from './SEOModel';
import SEOListHead from './SEOListHead';
import { StyledPopover } from './SEO.styled';
import { AdminSEOProfileData, adminSEOServices } from 'services/adminSEOProfilePlan/adminSEOProfilePlan.services';
import AddEditSEOModal from './AddEditSEOModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export type PaginationType = {
  page: number;
  offset: number;
  pageSize: number;
  sort_field: string;
  sort_order: string;
  search_field: string;
  limit: number;
  is_seo?: number;
};

export default function SEOContainer() {
  const [selectedSEOData, setSelectedSEOData] = useState<AdminSEOProfileData | null>(null);
  const [data, setData] = useState<AdminSEOProfileData[]>([]);
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [totalRecords, setTotalRecords] = useState(0);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [selectedSEO, setSelectedSEO] = useState<AdminSEOProfileData | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [SEODataFilter, setSEODataFilter] = useState<number>(2);

  const [filters, setFilters] = useState<PaginationType>({
    page: 1,
    offset: 0,
    pageSize: PAGE_SIZE,
    sort_field: 'newest',
    sort_order: 'desc',
    search_field: '',
    limit: 10,
    is_seo: 2
  });

  const SORT_BY_OPTIONS: PaginationSortByOption[] = [
    { value: 'name', label: 'Model Name' },
    { value: 'title', label: 'Title' },
    { value: 'keywords', label: 'Keywords' },
    { value: 'description', label: 'description' }
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
    const res = await adminSEOServices.adminGetSEOProfile(
      token.token,
      filters.limit,
      filters.offset,
      filters.search_field,
      filters.sort_field,
      filters.sort_order,
      filters.is_seo
    );
    if (res) {
      if (res.code == 200) {
        setData(res?.data?.model_seo);
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
  const handleOpenCredit = (value: AdminSEOProfileData) => {
    setSelectedSEOData(value);
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
        sort_field: field,
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

  const handleOpenAddEditModal = () => {
    setOpenAddEditModal(true);
  };

  const handleCloseAddEditModal = () => {
    setOpenAddEditModal(false);
    setSelectedSEO(null);
  };

  const handleOpenDeleteCampaign = (val: number) => {
    setOpenDeleteModal(true);
    handleCloseMenu();
  };

  const handleCloseDeleteCampaign = () => {
    setOpenDeleteModal(false);
  };

  const handleSEODataChange = (value: number) => {
    setSEODataFilter(value);
    handleChangeFilter({ ...filters, is_seo: value });
  };

  const handleDeleteClick = async () => {
    const res = await adminSEOServices.adminDeleteSEOProfile(Number(selectedSEOData?.seo_id), token.token);
    if (res) {
      if (res.code === 200) {
        toast.success('SEO deleted successfully');
        handleCloseDeleteCampaign();
        handleChangeFilter({
          page: 1,
          offset: 0,
          pageSize: PAGE_SIZE,
          sort_field: 'newest',
          sort_order: 'desc',
          search_field: '',
          limit: 10
        });
      } else {
        toast.error(ErrorMessage);
      }
    }
  };

  return (
    <MainLayout>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            SEO
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" mb={1} gap={1}>
          <PaginationSearch placeholder="Model Name" handleChangeSearch={handleChangeSearch} />
          <FormControl fullWidth sx={{ width: '100%', maxWidth: '250px' }}>
            <InputLabel id="demo-simple-select-label">SEO data</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="seo_data"
              id="demo-simple-select"
              label="SEO data"
              value={SEODataFilter}
              onChange={(e) => handleSEODataChange(Number(e.target.value))}
            >
              <MenuItem value={2}>All</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
          <PaginationSortBy
            sortByOptions={SORT_BY_OPTIONS}
            orderField={filters.sort_field}
            orderType={filters.sort_order}
            handleChangeOrderBy={handleChangeOrderBy}
          />
        </Box>
        <Card>
          <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ width: '100%' }}>
              <Table>
                <SEOListHead />
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
                          {item?.model_name || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.title || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.keywords || '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item?.description || '-'}
                        </TableCell>

                        <TableCell>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => {
                              setSelectedSEOData(item);
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
                          <Typography variant="body1">SEO data not found</Typography>
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
        {selectedSEOData?.title && selectedSEOData?.description && selectedSEOData?.keywords && (
          <MenuItem
            onClick={() => {
              if (!selectedSEOData) return;
              handleOpenCredit(selectedSEOData);
              handleCloseMenu();
            }}
          >
            <Visibility sx={{ mr: 2 }} />
            View Details
          </MenuItem>
        )}
        {selectedSEOData?.title && selectedSEOData?.description && selectedSEOData?.keywords ? (
          <MenuItem
            onClick={() => {
              handleOpenAddEditModal();
              setSelectedSEO(data.filter((x) => x.model_id === selectedSEOData?.model_id)[0]);
              handleCloseMenu();
            }}
          >
            <EditIcon sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleOpenAddEditModal();
              setSelectedSEO(data.filter((x) => x.model_id === selectedSEOData?.model_id)[0]);
              handleCloseMenu();
            }}
          >
            <AddCircleOutlineIcon sx={{ mr: 2 }} />
            Add
          </MenuItem>
        )}
        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteCampaign(Number(selectedSEOData?.model_id))}>
          <DeleteIcon sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </StyledPopover>
      <SEOModel open={creditModalOpen} onClose={handleCloseCredit} selectedSEOData={selectedSEOData} />
      {openAddEditModal && (
        <AddEditSEOModal
          open={openAddEditModal}
          onClose={handleCloseAddEditModal}
          selectedSEO={selectedSEO}
          handleChangeFilter={handleChangeFilter}
        />
      )}
      <DeleteModal open={openDeleteModal} handleClose={handleCloseDeleteCampaign} handleDeleteClick={handleDeleteClick} />
    </MainLayout>
  );
}
