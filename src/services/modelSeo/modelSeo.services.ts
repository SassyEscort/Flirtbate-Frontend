import axios, { AxiosError } from 'axios';

export interface SeoModel {
  seo_id: number;
  keywords: string;
  title: string;
  description: string;
  model_id: number;
  user_name: string;
  model_name: string;
  country_name: string;
  created_at: string;
  updated_at: string;
}

export class ModelSeoService {
  static getModelSeo = async (userName: string): Promise<SeoModel> => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + `/v1/model/seo?user_name=${userName}`);
      return res.data.data[0];
    } catch (err: any) {
      const error: AxiosError = err;
      return error.response?.data as SeoModel;
    }
  };
}
