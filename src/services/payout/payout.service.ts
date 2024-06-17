import axios from 'axios';
import { BankDetailsParams } from 'views/protectedDashboardViews/addBankDetails';
import { BankListParams } from 'views/protectedDashboardViews/payoutPaymentContainer';
import { ModelPastPayoutDetailParams } from 'views/protectedDashboardViews/payoutsAndInvoicesTable/billingTable/BillingTable';

import { AddBankDetailsRes, BankDetailsDeleteRes, BankDetailsListRes, ModelPastPayoutDetailRes } from './types';

export class PayoutService {
  static bankDetails = async (params: BankDetailsParams, token: string): Promise<AddBankDetailsRes> => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/bank-details`, params, {
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });
      return res.data;
    } catch (error) {
      return error as AddBankDetailsRes;
    }
  };

  static bankDetailsList = async (token: string, params: BankListParams): Promise<BankDetailsListRes> => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/bank-details?limit=${params.limit}&offset=${params.offset}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );
      return res.data;
    } catch (error) {
      return error as BankDetailsListRes;
    }
  };

  static bankDetailsDelete = async (token: string, id: number): Promise<BankDetailsDeleteRes> => {
    try {
      const res = await axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/bank-details/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      return res.data;
    } catch (error) {
      return error as BankDetailsDeleteRes;
    }
  };

  static modelPatPayoutList = async (params: ModelPastPayoutDetailParams, token: string): Promise<ModelPastPayoutDetailRes> => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/payout?limit=${params.limit}&offset=${params.offset}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      return res.data;
    } catch (error) {
      return error as ModelPastPayoutDetailRes;
    }
  };
}
