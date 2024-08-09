import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { UIStyledInputText } from 'components/UIComponents/UIStyledInputText';
import { RiMailLine } from 'components/common/customRemixIcons';
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'themes/theme';
import { useState } from 'react';
import StyleButtonV2 from 'components/UIComponents/StyleLoadingButton';
import AuthModelCommon from '../modelSignup/AuthModelCommon';
import CheckInbox from './CheckInbox';
import {
  ForgetPasswordLinkMainContainer,
  IconBoxConatiner,
  IconButtonConatiner,
  InputTypeFristEmailBox,
  InputTypeSecondEmailBox,
  RememberpasswordSecondBox,
  RememberpasswordfirstBox,
  RequestlinkBox,
  RestePasswordBox
} from './ModelForgetPasswordLink.styled';
import { FormattedMessage, useIntl } from 'react-intl';
import { ModelAuthService } from 'services/modelAuth/modelAuth.service';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import { EMAIL_REGEX } from 'constants/regexConstants';
import { getErrorMessage } from 'utils/errorUtils';
import { ErrorBox } from 'views/auth/AuthCommon.styled';
import InfoIcon from '@mui/icons-material/Info';

export type ForgetPasswordParams = {
  email: string;
};

const ModelForgetPasswordLink = ({ onClose, onLoginOpen }: { onClose: () => void; onLoginOpen: () => void }) => {
  const intl = useIntl();
  const isSm = useMediaQuery(theme.breakpoints.down(330));

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
          const data = await ModelAuthService.modelForgetPassword(values);
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
            <AuthModelCommon
              onClose={onClose}
              image="images/model/model-signup/model-signup.webp"
              mobileImage="images/model/model-signup/model-signup.webp"
            >
              <ForgetPasswordLinkMainContainer>
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
                      <RestePasswordBox>
                        <UINewTypography variant="MediumSemiBoldText" color="common.white">
                          <FormattedMessage id="ResetPassword" />
                        </UINewTypography>
                        <UINewTypography variant="bodyRegular" color="secondary.200" textAlign="center">
                          <FormattedMessage id="EnterYourEmail" />
                          &apos;
                          <FormattedMessage id="SendYouInstructions" />
                        </UINewTypography>
                      </RestePasswordBox>
                      <IconBoxConatiner>
                        <IconButtonConatiner size="large" onClick={onClose}>
                          <CloseIcon />
                        </IconButtonConatiner>
                      </IconBoxConatiner>
                    </Box>

                    <InputTypeFristEmailBox>
                      <InputTypeSecondEmailBox>
                        <UINewTypography variant="bodySemiBold">
                          <FormattedMessage id="EmailAddress" />
                        </UINewTypography>
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
                            borderColor: 'secondary.light'
                          }}
                          InputProps={{
                            endAdornment: <RiMailLine color="#86838A" />
                          }}
                        />
                      </InputTypeSecondEmailBox>
                    </InputTypeFristEmailBox>

                    <RequestlinkBox>
                      <StyleButtonV2 variant="contained" type="submit" loading={loading}>
                        <UINewTypography variant="buttonLargeBold">
                          <FormattedMessage id="RequestLink" />
                        </UINewTypography>
                      </StyleButtonV2>
                    </RequestlinkBox>
                  </>
                ) : (
                  <CheckInbox onClose={onClose} email={values.email} />
                )}
                <RememberpasswordfirstBox>
                  <Divider orientation="horizontal" flexItem sx={{ borderColor: 'primary.700' }} />
                  <RememberpasswordSecondBox sx={{ flexDirection: isSm ? 'column' : 'row' }}>
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
                  </RememberpasswordSecondBox>
                </RememberpasswordfirstBox>
              </ForgetPasswordLinkMainContainer>
            </AuthModelCommon>
          </Box>
        );
      }}
    </Formik>
  );
};

export default ModelForgetPasswordLink;
