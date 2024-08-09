import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { UIStyledInputText } from 'components/UIComponents/UIStyledInputText';
import { RiMailLine } from 'components/common/customRemixIcons';
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { GuestAuthService } from 'services/guestAuth/guestAuth.service';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'themes/theme';
import { toast } from 'react-toastify';
import { useState } from 'react';
import AuthCommon from '../AuthCommon';
import CheckInbox from './CheckInbox';
import StyleButtonV2 from 'components/UIComponents/StyleLoadingButton';
import { FormattedMessage, useIntl } from 'react-intl';
import { ErrorBox, ModelUITextConatiner, UIButtonText, UITypographyText } from '../AuthCommon.styled';
import { ErrorMessage } from 'constants/common.constants';
import { EMAIL_REGEX } from 'constants/regexConstants';
import { getErrorMessage } from 'utils/errorUtils';
import InfoIcon from '@mui/icons-material/Info';

export type ForgetPasswordParams = {
  email: string;
};
const GuestForgetPasswordLink = ({ onClose, onLoginOpen }: { onClose: () => void; onLoginOpen: () => void }) => {
  const intl = useIntl();

  const isSm = useMediaQuery(theme.breakpoints.down(330));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const validationSchema = yup.object({
    email: yup.string().matches(EMAIL_REGEX, 'Enteravalidemail').required('Emailisrequired')
  });

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setLoading(true);
          const data = await GuestAuthService.guestResetPasswordEmail({ email: values.email });
          if (data.code === 200) {
            toast.success('Success');
            setActiveStep(1);
          } else {
            const errorMessage = getErrorMessage(data?.custom_code);
            setAlert(intl.formatMessage({ id: errorMessage }));
          }
        } catch (error) {
          toast.error(ErrorMessage);
        } finally {
          setLoading(false);
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
        return (
          <Box component="form" onSubmit={handleSubmit}>
            <AuthCommon onClose={onClose} image="/images/auth/auth-model1.webp" mobileImage="/images/auth/auth-model1.webp">
              <Box
                position="relative"
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                sx={{
                  pt: { xs: 0, sm: '126.5px' },
                  pl: { xs: 2, md: 4 },
                  pr: { xs: 2, md: 0 },
                  maxWidth: { xs: '100%', md: '400px' },
                  gap: { xs: 5, sm: 4 }
                }}
              >
                {activeStep === 0 ? (
                  <>
                    <Box sx={{ color: 'primary.300' }}>
                      {alert && (
                        <ErrorBox>
                          <InfoIcon />
                          <UINewTypography>{alert}</UINewTypography>
                        </ErrorBox>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', marginTop: { xs: '100px', sm: 0 } }}>
                      <ModelUITextConatiner gap="12px" alignItems="center">
                        <UINewTypography variant="MediumSemiBoldText" color="common.white" sx={{ fontWeight: '600', lineHeight: '41.6px' }}>
                          <FormattedMessage id="ResetPassword" />
                        </UINewTypography>
                        <UINewTypography variant="bodyRegular" color="secondary.200" textAlign="center">
                          <FormattedMessage id="EnterYourEmail" />
                          &apos;
                          <FormattedMessage id="SendYouInstructions" />
                        </UINewTypography>
                      </ModelUITextConatiner>
                      <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
                        <IconButton
                          size="large"
                          sx={{
                            color: 'common.white',
                            position: 'absolute',
                            top: 0,
                            right: { xs: 0, md: '-84px' },
                            display: { sm: 'block' }
                          }}
                          onClick={onClose}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <ModelUITextConatiner gap={3}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <UITypographyText>
                          <FormattedMessage id="EmailAddress" />
                        </UITypographyText>
                        <UIStyledInputText
                          fullWidth
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email ? <FormattedMessage id={errors.email} /> : ''}
                          sx={{
                            border: '2px solid',
                            borderColor: 'secondary.light',
                            width: { sm: '400px' }
                          }}
                          InputProps={{
                            endAdornment: <RiMailLine color="#86838A" />
                          }}
                        />
                      </Box>
                    </ModelUITextConatiner>

                    <ModelUITextConatiner width="100%" gap="28px">
                      <StyleButtonV2 variant="contained" type="submit" loading={loading} sx={{ width: { sm: '400px' } }}>
                        <UIButtonText>
                          <FormattedMessage id="RequestLink" />
                        </UIButtonText>
                      </StyleButtonV2>
                    </ModelUITextConatiner>
                  </>
                ) : (
                  <CheckInbox onClose={onClose} email={values.email} />
                )}
                <ModelUITextConatiner gap={isSmDown ? 0 : 3} pb={3} sx={{ paddingTop: { xs: 0, md: '90px' } }}>
                  <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
                  <Box display="flex" gap={1} alignItems="center" justifyContent="center" sx={{ flexDirection: isSm ? 'column' : 'row' }}>
                    <UINewTypography variant="buttonLargeMenu" sx={{ whiteSpace: isSm ? 'wrap' : 'nowrap' }}>
                      <FormattedMessage id="RememberPasswordd" />
                    </UINewTypography>
                    <UINewTypography
                      whiteSpace="nowrap"
                      variant="body"
                      sx={{ color: 'text.secondary', cursor: 'pointer' }}
                      onClick={onLoginOpen}
                    >
                      <FormattedMessage id="LogInInstead" />
                    </UINewTypography>
                  </Box>
                </ModelUITextConatiner>
              </Box>
            </AuthCommon>
          </Box>
        );
      }}
    </Formik>
  );
};

export default GuestForgetPasswordLink;
