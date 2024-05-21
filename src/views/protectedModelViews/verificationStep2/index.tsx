'use client';
import { Box, FormHelperText, MenuItem, useMediaQuery } from '@mui/material';
import { UIStyledInputText } from 'components/UIComponents/UIStyledInputText';
import React from 'react';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';

import * as yup from 'yup';
import { VerificationStepSecond } from 'constants/workerVerification';
import UIThemeButton from 'components/UIComponents/UIStyledLoadingButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import UINewTypography from 'components/UIComponents/UINewTypography';
import theme from 'themes/theme';
import {
  BackButtonBox,
  ButtonBox,
  InputTypeBoxOne,
  InputTypeBoxSecond,
  ParentBox,
  UINewTypographyTextMenuItem,
  UploaddocumentsButtonBox,
  VerificationStep2MainContainer,
  VerificationStep2MainContainerSecond,
  VerificationStep2MainContainerThree
} from './VerificationStep2.styled';
import { useFormik } from 'formik';
import { VerificationStepService } from 'services/modelAuth/verificationStep.service';
import { UIStyledSelectItemContainer } from 'components/UIComponents/UINewSelectItem';
import { FormattedMessage } from 'react-intl';

export type VerificationStepSecond = {
  idType: string;
  idNumber: string;
};

const validationSchema = yup.object({
  idType: yup.string().required('Idtype title is required'),
  idNumber: yup.string().required('Idnumber  is required')
});

const VerificationStep2 = () => {
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValues = {
    idType: '',
    idNumber: ''
  };

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    }
  });

  const handleSubmitForm = async (values: VerificationStepSecond) => {
    await VerificationStepService.verificationtepSecond(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ParentBox>
        <VerificationStep2MainContainer>
          <VerificationStep2MainContainerSecond>
            <Box>
              <UINewTypography variant="h2" color={'text.secondary'}>
                <FormattedMessage id="PleaseProvide" />
              </UINewTypography>
            </Box>
            <UINewTypography variant="bodyRegular" color={'text.primary'}>
              <FormattedMessage id="WeUseThisData" />
            </UINewTypography>
          </VerificationStep2MainContainerSecond>

          <VerificationStep2MainContainerThree>
            <InputTypeBoxOne>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <UINewTypography variant="bodySemiBold" color="text.primary">
                  <FormattedMessage id="IdType" />
                </UINewTypography>
                <UINewTypography>*</UINewTypography>
              </Box>
              <Box sx={{ maxWidth: '390px', borderRadius: '15px' }}>
                <UIStyledSelectItemContainer
                  fullWidth
                  id="idType"
                  name="idType"
                  value={values.idType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.idType && Boolean(errors.idType)}
                  IconComponent={KeyboardArrowDownSharpIcon}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: touched.idType && errors.idType ? 'error.main' : 'secondary.light'
                    }
                  }}
                >
                  {VerificationStepSecond.map((type, index: number) => (
                    <MenuItem key={index} value={type.name}>
                      <UINewTypographyTextMenuItem variant="bodySemiBold" color={'text.primary'}>
                        {type.name}
                      </UINewTypographyTextMenuItem>
                    </MenuItem>
                  ))}
                </UIStyledSelectItemContainer>
                {touched.idType && errors.idType && <FormHelperText error>{errors.idType}</FormHelperText>}
              </Box>
            </InputTypeBoxOne>

            <InputTypeBoxSecond>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <UINewTypography variant="bodySemiBold" color="text.primary">
                  <FormattedMessage id="IdNumber" />
                </UINewTypography>
                <UINewTypography>*</UINewTypography>
              </Box>
              <Box sx={{ maxWidth: '390px' }}>
                <UIStyledInputText
                  fullWidth
                  id="idNumber"
                  name="idNumber"
                  value={values.idNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.idNumber && Boolean(errors.idNumber)}
                  helperText={touched.idNumber && errors.idNumber}
                />
              </Box>
            </InputTypeBoxSecond>
          </VerificationStep2MainContainerThree>
        </VerificationStep2MainContainer>
        <ButtonBox>
          <BackButtonBox>
            <UIThemeButton variant="outlined">
              <ArrowBackOutlinedIcon />

              <UINewTypography variant="buttonLargeBold" color="text.secondary">
                <FormattedMessage id="Back" />
              </UINewTypography>
            </UIThemeButton>
          </BackButtonBox>
          <UploaddocumentsButtonBox>
            <UIThemeButton variant="contained" type="submit">
              <ArrowForwardOutlinedIcon />

              <UINewTypography variant="buttonLargeBold" color="primary.200">
                {isSm ? <FormattedMessage id="Next" /> : <FormattedMessage id="UploadDocuments" />}
              </UINewTypography>
            </UIThemeButton>
          </UploaddocumentsButtonBox>
        </ButtonBox>
      </ParentBox>
    </form>
  );
};

export default VerificationStep2;
