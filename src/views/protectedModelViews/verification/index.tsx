'use client';
import VerificationHeader from './header';
import VerificationStepOne from './stepOne';
import UIStepper from '../../../components/common/stepper';
import { useCallback, useEffect, useState } from 'react';
import { ModelDetailsResponse } from './verificationTypes';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { getUserDataClient } from 'utils/getSessionData';
import Box from '@mui/material/Box';
import UploadImage from './stepThree/uploadImage';
import DocumentMainContainer from './documentContainer';
import CircularProgressWithLabel from './header/CircularProgressWithLabel';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import { FormattedMessage } from 'react-intl';
import ModelReviewDetails from '../modelReviewDetails';
import ProfileCreated from './profileCreated';
import { MODEL_ACTIVE_STEP } from 'constants/workerVerification';
import { useRouter } from 'next/navigation';

const VERIFICATION_STEPS = ['Basic Details', 'Documents', 'Photos', 'Review'];

const submitButtonIds = ['basic-details-button', 'document-id-button', 'document-photo-button', 'photos-button', 'review-button'];

export type TokenIdType = {
  id: number;
  token: string;
};

const VerificationContainer = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [modelDetails, setModelDetails] = useState<ModelDetailsResponse>();
  const [progressValue, setProgressValue] = useState(14.28);

  const [isLoading, setIsLoading] = useState(false);

  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const stepProgress = 100 / 4;
    const activeStepNew = activeStep < 4 ? activeStep + 1 : 4;
    setProgressValue(activeStepNew * stepProgress);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleNextDocment = () => {
    setActiveStep(3);
  };

  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleEdit = (step: number) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      setToken({ id: data.id, token: data.token });
    };

    userToken();
  }, []);

  useEffect(() => {
    const modelDetails = async () => {
      const modelData = await ModelDetailsService.getModelDetails(token.token);
      setModelDetails(modelData.data);
    };
    if (token.token) {
      modelDetails();
    }
  }, [token.id, token.token]);

  const handleModelApiChange = useCallback(() => {
    const modelDetails = async () => {
      const modelData = await ModelDetailsService.getModelDetails(token.token);
      setModelDetails(modelData.data);
    };
    modelDetails();
  }, [token.token]);

  const handleNextHeaderStep = () => {
    const button = document.getElementById(submitButtonIds[activeStep]);
    if (button) {
      setIsLoading(true);
      button.click();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  useEffect(() => {
    if (modelDetails?.verification_step === MODEL_ACTIVE_STEP.BASIC_DETAILS) {
      setActiveStep(0);
    } else if (modelDetails?.verification_step === MODEL_ACTIVE_STEP.UPLOAD_DOCUMENTS) {
      setActiveStep(1);
    } else if (modelDetails?.verification_step === MODEL_ACTIVE_STEP.UPLOAD_PHOTOS) {
      setActiveStep(2);
    } else if (modelDetails?.verification_step === MODEL_ACTIVE_STEP.ONBOARDED) {
      setActiveStep(3);
    } else if (
      modelDetails?.verification_step === MODEL_ACTIVE_STEP.IN_REVIEW ||
      modelDetails?.verification_step === MODEL_ACTIVE_STEP.VERIFIED
    ) {
      router.push('/model/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelDetails?.verification_step]);

  return (
    <>
      <VerificationHeader
        activeStep={activeStep}
        handleNextHeaderStep={handleNextHeaderStep}
        handlePrev={handlePrev}
        isLoading={isLoading}
      />
      {!isMdDown && (
        <Box sx={{ backgroundColor: 'secondary.500' }} pt={4} pb={4}>
          <UIStepper steps={VERIFICATION_STEPS} activeStep={activeStep} />
        </Box>
      )}
      {isMdDown && activeStep !== 7 && (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '109px',
            gap: 1.75,
            py: 2,
            px: '15px',
            alignItems: 'center',
            justifyContent: { sm: 'center' },
            backgroundColor: 'secondary.dark'
          }}
        >
          <CircularProgressWithLabel value={progressValue} currentStep={activeStep + 1} totalSteps={4} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 0.5
            }}
          >
            {isMdDown && activeStep === 0 && (
              <>
                <UINewTypography variant="button" sx={{ lineHeight: '140%', color: 'text.secondary' }}>
                  <FormattedMessage id="LetStartWith" />
                </UINewTypography>
                <UINewTypography variant="SubtitleSmallMedium">
                  <FormattedMessage id="NextDocuments" />
                </UINewTypography>
              </>
            )}
            {isMdDown && activeStep === 1 && (
              <>
                <UINewTypography variant="button" sx={{ lineHeight: '140%', color: 'text.secondary' }}>
                  <FormattedMessage id="PleaseProvide" />
                </UINewTypography>
                <UINewTypography variant="SubtitleSmallMedium">
                  <FormattedMessage id="NextPhotos" />
                </UINewTypography>
              </>
            )}
            {isMdDown && activeStep === 2 && (
              <>
                <UINewTypography variant="button" sx={{ lineHeight: '140%', color: 'text.secondary' }}>
                  <FormattedMessage id="Photos" />
                </UINewTypography>
                <UINewTypography variant="SubtitleSmallMedium">
                  <FormattedMessage id="NextFinalReview" />
                </UINewTypography>
              </>
            )}
            {isMdDown && activeStep === 3 && (
              <>
                <UINewTypography variant="button" sx={{ lineHeight: '140%', color: 'text.secondary' }}>
                  <FormattedMessage id="ReviewYourDetails" />
                </UINewTypography>
                <UINewTypography variant="SubtitleSmallMedium">
                  <FormattedMessage id="MakesureYouFilled" />
                </UINewTypography>
              </>
            )}
            {isMdDown && activeStep === 4 && (
              <>
                <UINewTypography variant="button" sx={{ lineHeight: '140%', color: 'text.secondary' }}>
                  <FormattedMessage id="OnboardingCompleted" />
                </UINewTypography>
                <UINewTypography variant="SubtitleSmallMedium">
                  <FormattedMessage id="YourProfile" />
                </UINewTypography>
              </>
            )}
          </Box>
        </Box>
      )}
      {activeStep === 0 && (
        <VerificationStepOne
          isEdit={false}
          token={token}
          handleNext={handleNext}
          modelDetails={modelDetails ?? ({} as ModelDetailsResponse)}
          handleModelApiChange={handleModelApiChange}
        />
      )}
      {activeStep === 1 && (
        <DocumentMainContainer
          handleNextDocment={handleNextDocment}
          handleModelApiChange={handleModelApiChange}
          token={token}
          activeStep={activeStep}
          handleNext={handleNext}
          modelDetails={modelDetails ?? ({} as ModelDetailsResponse)}
          handlePrev={handlePrev}
        />
      )}
      {activeStep === 2 && (
        <UploadImage
          isEdit={false}
          workerPhotos={modelDetails?.photos ?? []}
          token={token}
          handleModelApiChange={handleModelApiChange}
          handleNext={handleNext}
          handlePrevVerificationStep={handlePrev}
        />
      )}
      {activeStep === 3 && (
        <ModelReviewDetails
          handleNext={handleNext}
          modelDetails={modelDetails ?? ({} as ModelDetailsResponse)}
          token={token}
          handleEdit={handleEdit}
        />
      )}
      {activeStep === 4 && <ProfileCreated />}
    </>
  );
};
export default VerificationContainer;
