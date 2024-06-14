'use client';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import MainLayout from '../layouts/AdminLayout/DashboardLayout';
import {
  AdminWithdrawResponse,
  withdrawMinAmountServices,
  withdrawParams
} from 'services/adminServices/withdrawconfiguration/withdrawConfiguration.services';
import { getUserDataClient } from 'utils/getSessionData';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';

export default function WithdrawConfigurationContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState<AdminWithdrawResponse>({} as AdminWithdrawResponse);

  const validationSchema = yup.object({
    withdrawal_amt: yup.number().required('minimum withdraw amount is required')
  });

  useEffect(() => {
    const fetchCommissionAmount = async () => {
      try {
        const response = await withdrawMinAmountServices.modelWithdrawAmountGet(token);
        setWithdrawAmount(response);
      } catch (error) {
        toast.error('Error fetching commission amount');
      }
    };

    fetchCommissionAmount();
  }, [token]);

  const handleFormSubmit = async (values: withdrawParams) => {
    setIsLoading(true);

    const res = await withdrawMinAmountServices.withdrawMinAmount(values, token);
    if (res) {
      if (res.code === 200) {
        toast.success('Success');
      } else {
        toast.error(ErrorMessage);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      setToken(data.token);
    };

    userToken();
  }, []);

  return (
    <>
      <MainLayout>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="h4" gutterBottom>
              Model Amount Configuration
            </Typography>
          </Stack>

          <Formik
            enableReinitialize
            initialValues={{
              withdrawal_amt: withdrawAmount?.data?.amount || ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleFormSubmit(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} width={'100%'}>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      name="withdrawal_amt"
                      label="Withdraw Amount"
                      type="number"
                      value={values.withdrawal_amt}
                      error={Boolean(touched.withdrawal_amt && errors.withdrawal_amt)}
                      helperText={touched.withdrawal_amt && errors.withdrawal_amt ? errors.withdrawal_amt : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
                <DialogActions sx={{ px: 3, py: 2 }}>
                  <LoadingButton loading={isLoading} size="large" type="submit" variant="contained" color="primary">
                    Save
                  </LoadingButton>
                </DialogActions>
              </Box>
            )}
          </Formik>
        </Container>
      </MainLayout>
    </>
  );
}
