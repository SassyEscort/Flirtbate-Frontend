import { Box, DialogContent, FormHelperText, IconButton } from '@mui/material';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { UIStyledInputText } from 'components/UIComponents/UIStyledInputText';
import { FormattedMessage } from 'react-intl';
import {
  SecondBox,
  ThreeBox,
  ForBox,
  FiveBox,
  SixBox,
  SevenBox,
  ChooseYourBankFristBox,
  ChooseYourBankSecondBox,
  ChooseYourBankthreeBox,
  PayoutDetailSecondBox,
  PayoutDetailThreeBox,
  PayoutDetailForBox,
  PayoutDetailFiveBox,
  PayoutDetailSixBox,
  FirstBox,
  ImageBox,
  SmallScreenBox,
  SamllScreenFirstBox,
  ExpandIcon
} from './PayoutWidthDraw';
import CloseIcon from '@mui/icons-material/Close';
import { DividerBox } from '../payoutRequestSubmit/PayoutRequestSubmit';
import { BankDetailsListRes } from 'services/payout/types';
import { ErrorMessage } from 'constants/common.constants';
import { toast } from 'react-toastify';
import { PayoutService } from 'services/payout/payout.service';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { useCallback, useState } from 'react';
import { BankDetailsEdit } from '../payoutPaymentContainer';
import AddBankDetailsModel from '../addBankDetails/addBankDetailsModel';
import { Formik } from 'formik';
import * as yup from 'yup';
import PayoutRequestSubmit from '../payoutRequestSubmit';
import StyleButtonV2 from 'components/UIComponents/StyleLoadingButton';

export type RequestPayoutParams = {
  amount: number | null;
  bank_account_id: number | null;
  remarks: string;
};
const PayoutWithdrawContainer = ({
  bankDetailsList,
  token,
  fetchBankDetails,
  payoutStep,
  isSm,
  handlePayoutStep,
  amountSave
}: {
  bankDetailsList: BankDetailsListRes;
  token: TokenIdType;
  fetchBankDetails: () => void;
  payoutStep?: number;
  isSm?: boolean;
  handlePayoutStep?: () => void;
  amountSave: number;
}) => {
  const [open, setOpenModel] = useState(false);
  const [selectBank, setSelectBank] = useState<string | null>(null);
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
  const [openSubmitModel, setOpenSubmitModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editValue, setEditValue] = useState<BankDetailsEdit>();
  const [cancelRemove, setCancelRemove] = useState(false);

  const handleBankDetailsRefetch = useCallback(() => {
    fetchBankDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const handleBankDetailsDetele = async (id: number) => {
    try {
      if (token.token) {
        const data = await PayoutService.bankDetailsDelete(token.token, id);
        if (data.code === 200) {
          handleBankDetailsRefetch();
          toast.success('Success');
          if (handlePayoutStep) {
            handlePayoutStep();
          }
        } else {
          toast.error(data?.error);
        }
      }
    } catch (error) {
      toast.error(ErrorMessage);
    }
  };

  const handleBankDetailsEdit = (list: BankDetailsEdit) => {
    setEditValue(list);
  };

  const handleOpneModel = () => {
    setOpenModel(true);
  };
  const onClose = () => {
    setOpenModel(false);
    setOpenSubmitModel(false);
  };

  const handleBankClick = (
    bankName: string,
    bankId: number,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ) => {
    setSelectBank((prevSelectBank) => (prevSelectBank === bankName ? null : bankName));
    setSelectedBankId(bankId);
    setFieldValue('bank_account_id', bankId);
  };

  const validationSchema = yup.object({
    amount: yup.number().required('Amount number is required'),
    bank_account_id: yup.number().required('Select any bank')
  });

  const hanleCancelRemove = () => {
    setCancelRemove(true);
  };
  return (
    <>
      {(payoutStep === 1 || !isSm) && (
        <Formik
          initialValues={{
            amount: null,
            bank_account_id: '',
            remarks: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const requestPaoutObject: RequestPayoutParams = {
                amount: values.amount,
                bank_account_id: selectedBankId,
                remarks: values.remarks
              };
              const data = await PayoutService.requestPayout(requestPaoutObject, token.token);
              if (data?.code === 200) {
                if (handlePayoutStep) {
                  handlePayoutStep();
                }
                setOpenSubmitModel(true);
              } else {
                toast.error(data?.message);
              }
            } catch (error) {
              toast.error(ErrorMessage);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue }) => {
            return (
              <Box component="form" onSubmit={handleSubmit}>
                <SmallScreenBox>
                  <SamllScreenFirstBox>
                    <Box>
                      <UINewTypography variant="h6" color={'secondary.200'}>
                        <FormattedMessage id="RequestAPayout" />
                      </UINewTypography>
                    </Box>
                    <Box>
                      <IconButton
                        aria-label="close"
                        sx={{
                          color: (theme) => theme.palette.text.secondary
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </SamllScreenFirstBox>

                  <FirstBox>
                    <DividerBox
                      sx={{
                        display: { sm: 'block', display: 'none' }
                      }}
                    />
                    <DialogContent sx={{ p: 0 }}>
                      <SecondBox>
                        <ThreeBox>
                          <ForBox>
                            <FiveBox>
                              <UINewTypography color="text.primary" variant="SubtitleSmallMedium" sx={{ textWrap: 'nowrap' }}>
                                <FormattedMessage id="GetPaidIn" />
                              </UINewTypography>
                              <SixBox>
                                <SevenBox>
                                  <ImageBox src="/images/payout/pay.webp" />
                                  <UINewTypography color="text.primary" variant="SubtitleSmallMedium" sx={{ textWrap: 'nowrap' }}>
                                    <FormattedMessage id="USD" />
                                  </UINewTypography>
                                </SevenBox>
                                <ExpandIcon />
                              </SixBox>
                            </FiveBox>
                            <Box>
                              <UINewTypography variant="buttonLargeMenu" sx={{ textWrap: 'nowrap' }}>
                                <FormattedMessage id="YourBalance" />
                              </UINewTypography>
                              <UINewTypography variant="bodySemiBold" color="text.secondary" sx={{ textWrap: 'nowrap' }}>
                                : ${amountSave}
                              </UINewTypography>
                            </Box>
                          </ForBox>
                          <Box>
                            <UIStyledInputText
                              fullWidth
                              type="number"
                              sx={{ height: '70px' }}
                              id="amount"
                              name="amount"
                              value={values.amount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.amount && Boolean(errors.amount)}
                              helperText={touched.amount && errors.amount}
                            />
                          </Box>
                        </ThreeBox>
                        <ChooseYourBankFristBox>
                          <ChooseYourBankSecondBox>
                            <ChooseYourBankthreeBox>
                              <UINewTypography color="text.primary" variant="SubtitleSmallMedium">
                                <FormattedMessage id="ChooseYourBank" />
                              </UINewTypography>
                              {bankDetailsList?.data?.bank_details?.map((bankList, index) => (
                                <>
                                  <PayoutDetailSecondBox
                                    key={index}
                                    sx={{
                                      backgroundColor: selectBank === bankList.bank_name ? 'primary.200' : 'primary.700',
                                      borderRadius: selectBank === bankList?.bank_name ? '8px' : '8px',
                                      border: selectBank === bankList.bank_name ? '1px solid' : '',
                                      borderColor: selectBank === bankList.bank_name ? 'primary.400' : 'primary.400'
                                    }}
                                    onClick={() => handleBankClick(bankList?.bank_name, bankList?.id, setFieldValue)}
                                  >
                                    <PayoutDetailThreeBox>
                                      <Box
                                        component={'img'}
                                        src="/images/payout/home.png"
                                        width={'48px'}
                                        height={'48px'}
                                        color={'text.secondary'}
                                      />
                                      <PayoutDetailForBox>
                                        <UINewTypography variant="h6" color="text.secondary">
                                          {bankList?.bank_name}
                                        </UINewTypography>
                                        <UINewTypography variant="buttonLargeMenu" color="text.primary">
                                          {bankList?.account_name}| {bankList?.iban_number}
                                        </UINewTypography>
                                      </PayoutDetailForBox>
                                    </PayoutDetailThreeBox>
                                    <PayoutDetailFiveBox>
                                      <Box
                                        component={'img'}
                                        src="/images/payout/edit.webp"
                                        sx={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                        onClick={() => {
                                          handleBankDetailsEdit(bankList), handleOpneModel();
                                          hanleCancelRemove();
                                        }}
                                      />
                                      <Box
                                        component={'img'}
                                        src="/images/payout/delete.webp"
                                        sx={{ width: '16px', height: '18px', cursor: 'pointer' }}
                                        onClick={() => handleBankDetailsDetele(bankList?.id)}
                                      />
                                    </PayoutDetailFiveBox>
                                  </PayoutDetailSecondBox>
                                </>
                              ))}
                              {touched.bank_account_id && errors.bank_account_id && (
                                <FormHelperText error>{errors.bank_account_id}</FormHelperText>
                              )}
                            </ChooseYourBankthreeBox>
                          </ChooseYourBankSecondBox>

                          <PayoutDetailSixBox>
                            <Box>
                              <UINewTypography variant="bodySemiBold" color="secondary.200">
                                <FormattedMessage id="Remarks" />
                              </UINewTypography>
                            </Box>

                            <UIStyledInputText
                              multiline
                              rows={4.9}
                              fullWidth
                              id="remarks"
                              name="remarks"
                              value={values.remarks}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.remarks && Boolean(errors.remarks)}
                              helperText={touched.remarks && errors.remarks}
                            />
                          </PayoutDetailSixBox>

                          <StyleButtonV2 variant="contained" sx={{ width: '100%' }} type="submit" loading={loading}>
                            <UINewTypography variant="buttonLargeBold" color="primary.200">
                              <FormattedMessage id="Confirm" />
                            </UINewTypography>
                          </StyleButtonV2>
                        </ChooseYourBankFristBox>
                      </SecondBox>
                    </DialogContent>
                  </FirstBox>
                </SmallScreenBox>
                <AddBankDetailsModel
                  open={open}
                  onClose={onClose}
                  token={token}
                  editValue={editValue ?? ({} as BankDetailsEdit)}
                  fetchBankDetails={fetchBankDetails}
                  cancelRemove={cancelRemove}
                />
              </Box>
            );
          }}
        </Formik>
      )}
      {(payoutStep === 2 || !isSm) && <PayoutRequestSubmit open={openSubmitModel} onClose={onClose} />}
    </>
  );
};

export default PayoutWithdrawContainer;
