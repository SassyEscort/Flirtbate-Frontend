import axios, { AxiosError } from 'axios';
import { GenericRes } from 'services/guestAuth/authuser.services';
import { LanagueRes, MultipleOptionString, VerificationStep1Type } from 'views/protectedModelViews/verification/verificationTypes';

export type Country = {
  country: string;
};

export type Language = {
  language: string;
};

export type Nationality = {
  nationality: string;
};

export interface DropdownAPIRes extends GenericRes {
  data: MultipleOptionString;
}

export interface DropdownLanguageAPIRes extends GenericRes {
  data: LanagueRes;
}

export type Document_type = {
  document_number: string;
};

export interface DocumentVerificationRes extends GenericRes {
  is_document_exists: number;
}

export class ModelVerificationService {
  static verificationStepOne = async (values: VerificationStep1Type, token: string) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/basic-details`, values, {
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data || { error_message: error.message };
    }
  };

  static modelCountry = async (values: Country, token: string): Promise<DropdownAPIRes> => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/country`, values, {
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as DropdownAPIRes;
    }
  };

  static modelLanguage = async (values: Language, token: string): Promise<DropdownLanguageAPIRes> => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/language`, values, {
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as DropdownLanguageAPIRes;
    }
  };

  static modelNationality = async (values: Nationality, token: string): Promise<DropdownAPIRes> => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/nationality`, values, {
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as DropdownAPIRes;
    }
  };

  static modelDocumentVerification = async (values: Document_type, token: string): Promise<DocumentVerificationRes> => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/verify-document`, values, {
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });

      return res.data.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as DocumentVerificationRes;
    }
  };
}
