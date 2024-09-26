'use client';
import UINewTypography from 'components/UIComponents/UINewTypography';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  ButtonConatiner,
  InputBox,
  MainBoxRightSide,
  MainConatiner,
  Minute,
  PriceMinute,
  RightFirstText,
  RightSecondText,
  RightSideBox,
  RightSideFirstBox,
  SecondConatiner,
  TextConatiner,
  VideoCall
} from './DashboardPriceView.styled';
import theme from 'themes/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormattedMessage, useIntl } from 'react-intl';
import { DashboardService } from 'services/modelAuth/dashboard.price.service';
import { toast } from 'react-toastify';
import { ErrorMessage } from 'constants/common.constants';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { ModelDetailsResponse } from 'views/protectedModelViews/verification/verificationTypes';
import { UIStyledInputText } from 'components/UIComponents/UIStyledInputText';
import StyleButtonV2 from 'components/UIComponents/StyleLoadingButton';
import { CommonServices } from 'services/commonApi/commonApi.services';
import { RiArrowLeftLine, RiArrowRightLine } from 'components/common/customRemixIcons';
import UIThemeButton from 'components/UIComponents/UIStyledLoadingButton';
import { InputAdornment } from '@mui/material';
import { getErrorMessage } from 'utils/errorUtils';

export type PricePerMinute = {
  price_per_minute: number;
};
export type VerificationStepSecond = {
  price: string;
};

const DashboardPriceView = ({
  token,
  modelDetails,
  handleModelApiChange,
  handleNext,
  handlePrevVerificationStep,
  isEdit
}: {
  token: TokenIdType;
  modelDetails: ModelDetailsResponse;
  handleModelApiChange: () => void;
  handleNext?: () => void;
  handlePrevVerificationStep?: () => void;
  isEdit: boolean;
}) => {
  const intl = useIntl();

  const initialValues = {
    price:
      modelDetails?.video_call_prices?.length && Number(modelDetails?.video_call_prices[0]?.price_per_minute) !== -1
        ? modelDetails?.video_call_prices[0]?.price_per_minute
        : ''
  };
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [commistionValue, setCommistionValue] = useState(0);
  const [commsionPercentage, setCommisionPercentage] = useState<number>(0);
  const [isChanged, setIsChanged] = useState(false);

  const fetchPriceDetails = async () => {
    try {
      const res = await DashboardService.dashboardGetPriceDetails();
      setMinPrice(res?.data?.min_price);
      setMaxPrice(res?.data?.max_price);
    } catch (error) {
      toast.error(ErrorMessage);
    }
  };

  useEffect(() => {
    fetchPriceDetails();
  }, []);

  const validationSchema = yup.object({
    price: yup.number().required('Price is required').min(minPrice, ` ${minPrice}`).max(maxPrice, ` ${maxPrice}`)
  });

  const { errors, values, touched, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const inputPayload: PricePerMinute = {
        price_per_minute: Number(values.price)
      };
      handleSubmitForm(inputPayload);
    }
  });

  useEffect(() => {
    setDisable(values.price !== '');
  }, [values.price]);

  const priceCommissions = async () => {
    try {
      if (token.token) {
        const priceCommissionsValue = await CommonServices.priceCommissions(token.token);
        setCommisionPercentage(priceCommissionsValue.data.percentage);
      }
    } catch (error) {
      toast.error(ErrorMessage);
    }
  };

  useEffect(() => {
    priceCommissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitForm = async (inputPayload: PricePerMinute) => {
    try {
      setLoading(true);
      if (token.token) {
        const response = await DashboardService.dashboardPrice(inputPayload, token.token);
        if (response?.code === 200) {
          isEdit ? toast.success('Success') : '';
          if (handleNext) {
            handleNext();
          }
        } else {
          const errorMessage = getErrorMessage(response?.custom_code);
          toast.error(intl.formatMessage({ id: errorMessage }));
        }
      }
    } catch (error) {
      toast.error(ErrorMessage);
    } finally {
      setLoading(false);
      handleModelApiChange();
    }
  };

  const handlePriceChange = (val: string) => {
    setIsChanged(true);
    setFieldValue('price', val);
    const inputCommissionValue = (Number(val) * commsionPercentage) / 100;
    if (inputCommissionValue) setCommistionValue(Number(inputCommissionValue?.toFixed(2)));
  };

  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <MainConatiner sx={{ alignItems: isEdit ? 'flex-start' : 'center', gap: isEdit ? 8 : 1.5 }}>
        <TextConatiner color="text.secondary">
          {isEdit ? <FormattedMessage id={isSm ? 'MyProfile' : 'SetOrModifyYourPrices'} /> : <FormattedMessage id={'SetupYour'} />}
        </TextConatiner>

        <SecondConatiner>
          <VideoCall sx={{ alignItems: isEdit ? 'flex-start' : 'center', maxWidth: isEdit ? '680px' : '680px' }}>
            <UINewTypography variant={isEdit ? `body` : `bodyRegular`} color={isEdit ? `text.secondary` : `text.primary`}>
              <FormattedMessage id="VideoCallPrices" />
            </UINewTypography>

            <PriceMinute>
              <Minute>
                <UINewTypography variant="bodySemiBold" color="text.primary">
                  <FormattedMessage id="PriceMinute" />
                </UINewTypography>
                <UINewTypography variant="bodySemiBold" color="text.primary">
                  *
                </UINewTypography>
              </Minute>
              <InputBox>
                <MainBoxRightSide>
                  <RightSideBox>
                    <UIStyledInputText
                      type="number"
                      fullWidth
                      id="price"
                      name="price"
                      value={values.price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      onBlur={handleBlur}
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price ? '' : ''}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  </RightSideBox>

                  {errors.price ? (
                    <UINewTypography variant="SubtitleSmallMedium" color={errors.price && 'error.main'}>
                      <FormattedMessage id="YouCanSetPriceBetween" /> ${minPrice} - ${maxPrice}
                    </UINewTypography>
                  ) : (
                    <UINewTypography variant="SubtitleSmallMedium" color={'secondary.700'}>
                      <FormattedMessage id="YouCanSetPriceBetween" /> ${minPrice} - ${maxPrice}
                    </UINewTypography>
                  )}
                </MainBoxRightSide>

                {isChanged && (
                  <RightSideFirstBox>
                    <RightFirstText color="secondary.700">
                      <FormattedMessage id="YoullBeReceiving" />
                    </RightFirstText>
                    <RightSecondText color="text.secondary">${commistionValue} / min</RightSecondText>
                  </RightSideFirstBox>
                )}
              </InputBox>
            </PriceMinute>
          </VideoCall>
          <ButtonConatiner>
            {!isEdit && (
              <UIThemeButton onClick={handlePrevVerificationStep} sx={{ border: '1px solid' }}>
                <>
                  <RiArrowLeftLine />
                  <UINewTypography variant="body">
                    <FormattedMessage id="Back" />
                  </UINewTypography>
                </>
              </UIThemeButton>
            )}
            <StyleButtonV2
              id="price-id-button"
              variant={disable ? 'contained' : 'outlined'}
              type="submit"
              disabled={!disable}
              loading={loading}
              sx={{ width: '100%', maxWidth: '133px', px: '10px' }}
            >
              {isEdit ? (
                <UINewTypography variant="buttonSmallBold" color={disable ? '#000' : '#58535E'}>
                  <FormattedMessage id="Save" />
                </UINewTypography>
              ) : (
                <>
                  <UINewTypography variant="body">
                    <FormattedMessage id="Next" />
                  </UINewTypography>
                  <RiArrowRightLine />
                </>
              )}
            </StyleButtonV2>
          </ButtonConatiner>
        </SecondConatiner>
      </MainConatiner>
    </form>
  );
};

export default DashboardPriceView;
