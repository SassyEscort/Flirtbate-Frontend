import axios, { AxiosError } from 'axios';
import { ChangePassParams, GenericResCustom } from 'services/guestAuth/authuser.services';
import { GenericResponse, GenericResponseData } from 'types/commonApiTypes';
import { ForgetPasswordParams } from 'views/modelViews/modelForgetPasswordLink';
import { LoginParams } from 'views/modelViews/modelSignin';

import { ModelSignupParams } from 'views/modelViews/modelSignup';
import { GenericRes } from './types';

export class ModelAuthService {
  static modelSignup = async (params: ModelSignupParams) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/signup`, params, {
        headers: { 'Content-Type': 'application/json' }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data || { error_message: error.message };
    }
  };

  static modelLogin = async (params: LoginParams): Promise<GenericResponse> => {
    try {
      const res = await axios.post<LoginParams, GenericResponseData>(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/login`, params, {
        headers: { 'Content-Type': 'application/json' }
      });

      return res.data;
    } catch (err: any) {
      const error: string = err;
      return { error: error } as GenericResponse;
    }
  };

  static modelForgetPasswordLink = async (params: ForgetPasswordParams): Promise<GenericResponse> => {
    try {
      const res = await axios.post<ForgetPasswordParams, GenericResponseData>(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/email-verification-link`,
        params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      return res.data;
    } catch (err: any) {
      const error: string = err;
      return { error: error } as GenericResponse;
    }
  };

  static modelForgetPassword = async (params: ForgetPasswordParams): Promise<GenericResCustom> => {
    try {
      const res = await axios.post<ForgetPasswordParams, GenericResCustom>(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/reset-password-link`,
        params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      return res;
    } catch (err: any) {
      return err.response.data as GenericResCustom;
    }
  };

  static modelForgetPasswordLinkStep = async (emailid: string, token: string, source: string): Promise<GenericResponse> => {
    try {
      const res = await axios.post<ForgetPasswordParams, GenericResponseData>(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/email-verification-link`,
        { email: emailid, source: source },
        {
          headers: { 'Content-Type': 'application/json', Authorization: token }
        }
      );

      return res.data;
    } catch (err: any) {
      const error: string = err;
      return { error: error } as GenericResponse;
    }
  };

  static changePassword = async (params: ChangePassParams, token: string): Promise<GenericRes | string> => {
    try {
      const res = await axios.post<GenericRes>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/model/update-password`, params, {
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });
      return res.data;
    } catch (err: any) {
      return err.response?.data.message as string;
    }
  };
}
