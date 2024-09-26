import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import {
  AdminBoostProfileData,
  AdminBoostProfileParam,
  adminBoostProfilePlanServices
} from 'services/adminBoostProfilePlan/adminBoostProfilePlan.services';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { getUserDataClient } from 'utils/getSessionData';
import { ErrorMessage } from 'constants/common.constants';
import { PaginationType } from './BoostContainer';
import { PAGE_SIZE } from 'constants/pageConstants';
import { AttachMoney } from '@mui/icons-material';

const AddEditBoostModal = ({
  open,
  onClose,
  selectedBoost,
  handleChangeFilter
}: {
  open: boolean;
  onClose: () => void;
  selectedBoost: AdminBoostProfileData | null;
  handleChangeFilter: (value: PaginationType) => void;
}) => {
  const validationSchema = yup.object({
    duration: yup.number().required('Duration is required').moreThan(0, 'Duration must be grether than 0'),
    name: yup.string().required('Name is required'),
    cost: yup
      .number()
      .when('is_free', (isFree, schema) =>
        isFree[0]
          ? schema.nullable()
          : schema.required('Duration is required').test('is-greater-than-zero', 'Cost is required', (value) => value > 0 || value === null)
      ),
    is_free: yup.boolean().required('Is free is required')
  });

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });

  const handleFormSubmit = async (values: AdminBoostProfileParam) => {
    setIsLoading(true);
    const res = await adminBoostProfilePlanServices.adminAddBoostProfile(values, token.token);
    if (res) {
      if (res.code === 200) {
        toast.success('Boost added successfully');
        onClose();
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
    setIsLoading(false);
  };

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      setToken({ id: data.id, token: data.token });
    };

    userToken();
  }, []);

  const handleFormEdit = async (values: AdminBoostProfileParam) => {
    setIsLoading(true);
    const res = await adminBoostProfilePlanServices.adminUpdateBoostProfile(values, Number(selectedBoost?.id), token.token);
    if (res) {
      if (res.code === 200) {
        toast.success('Boost edit successfully');
        onClose();
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
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        id="responsive-modal-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle">{selectedBoost ? 'Edit' : 'Add'} Boost</Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{
          id: selectedBoost?.id || 0,
          name: selectedBoost?.name || '',
          duration: selectedBoost?.duration || 0,
          cost: selectedBoost?.cost || 0,
          is_free: selectedBoost?.is_free ?? false
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (selectedBoost) await handleFormEdit(values);
          else await handleFormSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit }) => {
          return (
            <Box component="form" onSubmit={handleSubmit}>
              <DialogContent dividers>
                <Stack
                  spacing={2}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      marginLeft: 0
                    }
                  }}
                >
                  <TextField
                    name="name"
                    label="Name"
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name ? errors.name : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl fullWidth error={Boolean(touched.duration && errors.duration)}>
                    <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="duration"
                      id="demo-simple-select"
                      value={values.duration}
                      label="Duration"
                      onChange={handleChange}
                      error={Boolean(touched.duration && errors.duration)}
                    >
                      <MenuItem value={1}>1 hr</MenuItem>
                      <MenuItem value={2}>2 hr</MenuItem>
                      <MenuItem value={3}>3 hr</MenuItem>
                      <MenuItem value={4}>4 hr</MenuItem>
                      <MenuItem value={5}>5 hr</MenuItem>
                      <MenuItem value={6}>6 hr</MenuItem>
                    </Select>
                    <FormHelperText>{touched.duration && errors.duration ? errors.duration : ''}</FormHelperText>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Is free</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="is_free"
                      id="demo-simple-select"
                      value={values.is_free ? 1 : 0}
                      label="Is free"
                      onChange={(e) => {
                        const isFree = e.target.value === 1;
                        setFieldValue('is_free', isFree);
                        if (isFree) {
                          setFieldValue('cost', 0);
                        }
                      }}
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                    </Select>
                  </FormControl>
                  {!values.is_free && (
                    <TextField
                      name="cost"
                      label="Cost"
                      value={values.cost}
                      error={Boolean(touched.cost && errors.cost)}
                      helperText={touched.cost && errors.cost ? errors.cost : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney />
                          </InputAdornment>
                        )
                      }}
                      disabled={values.is_free}
                    />
                  )}
                </Stack>
              </DialogContent>
              <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="outlined" size="large" onClick={onClose}>
                  Cancel
                </Button>
                <LoadingButton loading={isLoading} size="large" type="submit" variant="contained" color="primary">
                  Add
                </LoadingButton>
              </DialogActions>
            </Box>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddEditBoostModal;
