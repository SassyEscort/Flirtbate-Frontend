import axios, { AxiosError } from 'axios';
import { BankDetailsParams } from 'views/protectedDashboardViews/addBankDetails';
import { BankListParams } from 'views/protectedDashboardViews/payoutPaymentContainer';
import {
  AddBankDetailsRes,
  BackDetailsEditParams,
  BankDetailsDeleteRes,
  BankDetailsEditReponse,
  BankDetailsListRes,
  MarkOnline,
  ModelPastPayoutDetailParams,
  ModelPastPayoutDetailRes,
  RequestPayoutRep
} from './types';
import { RequestPayoutParams } from 'views/protectedDashboardViews/payoutWithDraw/PayoutWithdrawContainer';

export class PayoutService {
  static bankDetailsAdd = async (params: BankDetailsParams, token: string): Promise<AddBankDetailsRes> => {
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

  static bankDetailsEdit = async (token: string, id: number, params: BackDetailsEditParams): Promise<BankDetailsEditReponse> => {
    try {
      const res = await axios.patch(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/bank-details/${id}`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      return res.data;
    } catch (error) {
      return error as BankDetailsEditReponse;
    }
  };

  static modelPastPayoutList = async (params: ModelPastPayoutDetailParams, token: string): Promise<ModelPastPayoutDetailRes> => {
    try {
      let query = '';
      if (params.filter_text) {
        query += `&search_field=${params.filter_text}`;
      }
      if (params.status) {
        query += `&state=${params.status}`;
      }
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          `/v1/model/payout?limit=${params.limit}&offset=${params.offset}&start_date=${params.startDate}&end_date=${params.endDate}${query}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );
      return res.data;
    } catch (error) {
      return error as ModelPastPayoutDetailRes;
    }
  };

  static requestPayout = async (params: RequestPayoutParams, token: string): Promise<RequestPayoutRep> => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/payout`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return err.response?.data || { error_message: error.message };
    }
  };

  static markOnline = async (token: string): Promise<MarkOnline> => {
    try {
      const res = await axios.put(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/mark-online`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );
      return res.data;
    } catch (error) {
      return error as MarkOnline;
    }
  };
}
