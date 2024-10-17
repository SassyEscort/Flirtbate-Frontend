'use client';
import { UIStyledInputText } from 'components/UIComponents/UIStyledInputText';
import { useEffect, useMemo, useState } from 'react';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import * as yup from 'yup';
import { DocumentList } from 'constants/workerVerification';
import UIThemeButton from 'components/UIComponents/UIStyledLoadingButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import UINewTypography from 'components/UIComponents/UINewTypography';
import {
  BackButtonBox,
  ButtonBox,
  InputTypeBoxOne,
  InputTypeBoxSecond,
  ParentBox,
  UINewTypographyTextMenuItem,
  UploaddocumentsButtonBox,
  VerificationButtonText,
  VerificationStep2MainContainer,
  VerificationStep2MainContainerSecond,
  VerificationStep2MainContainerThree,
  VerificationTwoHeaderText
} from './VerificationStep2.styled';
import { useFormik } from 'formik';
import { UIStyledSelectItemContainer } from 'components/UIComponents/UINewSelectItem';
import { FormattedMessage, useIntl } from 'react-intl';
import { TokenIdType } from '..';
import StyleButtonV2 from 'components/UIComponents/StyleLoadingButton';
import { DocumentDataPhoto, ModelDetailsResponse } from '../verificationTypes';
import VerificationStepPromise from '../verificationStep2Document';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { toast } from 'react-toastify';
import { ModelVerificationService } from 'services/modelVerification/modelVerification.services';

export type VerificationStepSecond = {
  idType: string;
  idNumber: string;
};

const validationSchema = yup.object({
  idType: yup.string().required('IDtypetitleisrequired'),
  idNumber: yup
    .string()
    .required('IDnumberisrequired')
    .matches(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed in ID number.')
});

const VerificationStep2 = ({
  token,
  handleNext,
  handlePrev,
  handleChaneDocuModal,
  modelDetails,
  stepData,
  handleModelApiChange,
  activeStep,
  handleNextDocment,
  handleDocuPrev,
  open,
  isReviewEdit,
  handleEdit,
  isDashboard
}: {
  token: TokenIdType;
  handleNext?: () => void;
  handlePrev?: () => void;
  handleChaneDocuModal: (val: boolean) => void;
  modelDetails: ModelDetailsResponse;
  stepData: number;
  handleModelApiChange: () => void;
  activeStep: number;
  handleNextDocment?: () => void;
  handleDocuPrev: () => void;
  open: boolean;
  isReviewEdit: boolean;
  handleEdit?: (step: number) => void;
  isDashboard: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const modelDocuments = useMemo(() => {
    if (modelDetails?.documents?.length) return modelDetails.documents[0];
    else return {} as DocumentDataPhoto;
  }, [modelDetails]);

  const initialValues = {
    idType: modelDocuments.id || '',
    idNumber: modelDocuments.document_number || ''
  };

  const { errors, values, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await ModelVerificationService.modelDocumentVerification({ document_number: values.idNumber }, token.token);
        if (response.is_document_exists === 0) {
          if (isDashboard) {
            const button = document.getElementById('document-id-photo');
            if (button) {
              button.click();
            }
          } else {
            handleChaneDocuModal(true);
          }
        } else if (response.is_document_exists === 1) {
          toast.error(intl.formatMessage({ id: 'DuplicateDetected' }));
        }
      } catch (error) {
        toast.error(intl.formatMessage({ id: 'DuplicateDetected' }));
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  });

  useEffect(() => {
    if (modelDetails && modelDetails.documents && modelDetails.documents.length > 0) {
      setValues({
        idType: DocumentList.find((item) => item.value === modelDetails.documents[0].document_type)?.key || values.idType,
        idNumber: modelDetails.documents[0].document_number || values.idNumber
      });
    } else {
      setValues({
        idType: '',
        idNumber: ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelDetails, setValues]);

  return (
    <Box>
      {!open && (
        <form onSubmit={handleSubmit}>
          <ParentBox>
            <VerificationStep2MainContainer>
              <VerificationStep2MainContainerSecond>
                <Box>
                  <UINewTypography variant="h2" color={'text.secondary'}>
                    <FormattedMessage id="PleaseProvide" />
                  </UINewTypography>
                </Box>
                <UINewTypography variant="bodyRegular" color={'text.primary'} textAlign="center">
                  <FormattedMessage id="WeUseThisData" />
                </UINewTypography>
              </VerificationStep2MainContainerSecond>

              <VerificationStep2MainContainerThree>
                <InputTypeBoxOne>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <VerificationTwoHeaderText variant="bodySemiBold" color="text.primary">
                      <FormattedMessage id="IdType" />
                    </VerificationTwoHeaderText>
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
                        },
                        '& .MuiSelect-select': { padding: '0px' },
                        height: '50px'
                      }}
                    >
                      {DocumentList?.map((type, index: number) => (
                        <MenuItem
                          value={type?.key}
                          key={index}
                          sx={{
                            '& .MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                              backgroundColor: 'red !important'
                            }
                          }}
                        >
                          <UINewTypographyTextMenuItem
                            variant="bodySemiBold"
                            color={'text.primary'}
                            sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}
                          >
                            {type?.key}
                          </UINewTypographyTextMenuItem>
                        </MenuItem>
                      ))}
                    </UIStyledSelectItemContainer>
                    {touched.idType && errors.idType && (
                      <FormHelperText error>{errors.idType ? <FormattedMessage id={errors.idType} /> : ''}</FormHelperText>
                    )}
                  </Box>
                </InputTypeBoxOne>

                <InputTypeBoxSecond>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <VerificationTwoHeaderText variant="bodySemiBold" color="text.primary">
                      <FormattedMessage id="IdNumber" />
                    </VerificationTwoHeaderText>
                    <UINewTypography>*</UINewTypography>
                  </Box>
                  <Box sx={{ maxWidth: '390px' }}>
                    <UIStyledInputText
                      type="text"
                      fullWidth
                      id="idNumber"
                      name="idNumber"
                      value={values.idNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.idNumber && Boolean(errors.idNumber)}
                      helperText={touched.idNumber && errors.idNumber ? <FormattedMessage id={errors.idNumber} /> : ''}
                    />
                  </Box>
                </InputTypeBoxSecond>
              </VerificationStep2MainContainerThree>
            </VerificationStep2MainContainer>
            <ButtonBox>
              <BackButtonBox>
                {!isDashboard && (
                  <UIThemeButton variant="outlined" onClick={handlePrev}>
                    <ArrowBackOutlinedIcon />
                    <VerificationButtonText variant="buttonLargeBold" color="text.secondary">
                      <FormattedMessage id="Back" />
                    </VerificationButtonText>
                  </UIThemeButton>
                )}
              </BackButtonBox>
              <UploaddocumentsButtonBox>
                <StyleButtonV2 id="document-id-button" variant="contained" type="submit" loading={loading}>
                  <VerificationButtonText variant="buttonLargeBold" color="primary.200">
                    {isDashboard ? <FormattedMessage id="Save" /> : <FormattedMessage id="Next" />}
                  </VerificationButtonText>
                  {!isDashboard && <ArrowForwardOutlinedIcon />}
                </StyleButtonV2>
              </UploaddocumentsButtonBox>
            </ButtonBox>
          </ParentBox>
        </form>
      )}
      {(open || isDashboard) && (
        <VerificationStepPromise
          docValues={values}
          token={token}
          activeStep={activeStep}
          handleNext={handleNext}
          modelDetails={modelDetails ?? ({} as ModelDetailsResponse)}
          handlePrev={handlePrev}
          handleDocuPrev={handleDocuPrev}
          handleModelApiChange={handleModelApiChange}
          isReviewEdit={isReviewEdit}
          handleEdit={handleEdit}
          isDashboard={isDashboard}
        />
      )}
    </Box>
  );
};

export default VerificationStep2;
