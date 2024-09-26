import axios, { AxiosError } from 'axios';
import { GenericResCustom } from 'services/guestAuth/authuser.services';

export type AdminAddSEOProfileParams = {
  model_name: string;
  title: string;
  keywords: string;
  description: string;
  user_name: string;
};

export interface AdminSEOProfileParam extends AdminAddSEOProfileParams {
  model_id: number;
  seo_id?: number;
}

export interface AdminSEOProfileData extends AdminSEOProfileParam {
  is_active: boolean;
}

export type SEOPaginationAggregation = {
  offset: number;
  page_size: number;
  total_rows: number;
};

export type AdminSEOData = {
  model_seo: AdminSEOProfileData[];
  aggregate: SEOPaginationAggregation;
};

export interface AdminSEORes extends GenericResCustom {
  data: AdminSEOData;
}

export class adminSEOServices {
  static adminAddSEOProfile = async (params: AdminAddSEOProfileParams, token: string): Promise<GenericResCustom> => {
    try {
      const res = await axios.post<GenericResCustom>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/model/seo`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as GenericResCustom;
    }
  };

  static adminUpdateSEOProfile = async (params: AdminAddSEOProfileParams, planId: number, token: string): Promise<AdminSEORes> => {
    try {
      const res = await axios.patch<AdminSEORes>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/model/seo/${planId}`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as AdminSEORes;
    }
  };

  static adminDeleteSEOProfile = async (planId: number, token: string): Promise<AdminSEORes> => {
    try {
      const res = await axios.delete<AdminSEORes>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/model/seo/${planId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as AdminSEORes;
    }
  };

  static adminGetSEOProfile = async (
    token: string,
    limit: number,
    offset: number,
    search_field?: string,
    sort_field?: string,
    sort_order?: string,
    is_seo?: number
  ): Promise<AdminSEORes> => {
    try {
      const res = await axios.get<AdminSEORes>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/model/seo-list?limit=${limit}&offset=${offset}&search_field=${search_field}&sort_field=${sort_field}&sort_order=${sort_order}&is_seo=${is_seo}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );

      return res.data;
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as AdminSEORes;
    }
  };
}
