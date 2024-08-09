import axios, { AxiosError } from 'axios';
import { FavouriteDetailsRes } from 'services/customerDetails/customerDetails.services';
import { GenericResponse, GenericResponseData } from 'types/commonApiTypes';
import { ForgetPasswordParams } from 'views/auth/guestForgetPasswordLink';
import { LoginParams } from 'views/auth/guestLogin';
import { ResetPasswordEmailParams, ResetPasswordParams } from 'views/auth/guestNewPassword';
import { SignupParams } from 'views/auth/guestSignup';
import { GenericResCustom } from './authuser.services';

export class GuestAuthService {
  static guestSignup = async (params: SignupParams) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/customer/signup`, params, {
        headers: { 'Content-Type': 'application/json' }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data || { error_message: error.message };
    }
  };

  static guestLogin = async (params: LoginParams): Promise<GenericResponse> => {
    try {
      const res = await axios.post<LoginParams, GenericResponseData>(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/customer/login`, params, {
        headers: { 'Content-Type': 'application/json' }
      });

      return res.data;
    } catch (err: any) {
      const error: string = err;
      return { error: error } as GenericResponse;
    }
  };

  static guestForgetPasswordLink = async (params: ForgetPasswordParams): Promise<GenericResponse> => {
    try {
      const res = await axios.post<ForgetPasswordParams, GenericResponseData>(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/customer/reset-password-email`,
        params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as GenericResponse;
    }
  };

  static guestResetPassword = async (params: ResetPasswordParams): Promise<GenericResponse> => {
    try {
      const res = await axios.post<ResetPasswordParams, GenericResponseData>(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/customer/reset-password`,
        params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return res.data;
    } catch (error) {
      return error as FavouriteDetailsRes;
    }
  };

  static guestResetPasswordEmail = async (params: ResetPasswordEmailParams): Promise<GenericResCustom> => {
    try {
      const res = await axios.post<ResetPasswordEmailParams, GenericResCustom>(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/customer/reset-password-email`,
        params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return res;
    } catch (error: any) {
      return { error: error.response.data.message } as GenericResCustom;
    }
  };

  static modelResetPassword = async (params: ResetPasswordParams): Promise<GenericResponse> => {
    try {
      const res = await axios.post<ResetPasswordParams, GenericResponseData>(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/reset-password`,
        params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return res.data;
    } catch (error) {
      return error as FavouriteDetailsRes;
    }
  };
}
