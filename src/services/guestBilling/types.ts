import { CallHistoryLanguages } from 'services/callHistory/types';
import { GenericRes } from 'services/guestAuth/authuser.services';

export type BillingHistoryDetails = {
  id: number;
  details: string;
  category: string;
  amount: number;
  created_at: string;
  credits: number;
  free_credits: number;
  customer_id: number;
  model_id: null | number;
  wallet_id: number;
  call_duration: string;
  call_end_time: string;
  call_start_time: string;
  country_name: string;
  credits_per_minute: number;
  is_online: number;
  languages: CallHistoryLanguages[];
  link: string;
  model_dob: string;

  model_name: string;
  price_per_minute: number;
  user_name: string;
};

export type ModelBillingHistoryDetails = {
  total_rows: number;
  page_size: number;
  offset: number;
};

export type ModelBillingHistoryPageDetails = {
  ledger_details: BillingHistoryDetails[];
  aggregate: ModelBillingHistoryDetails;
};

export interface ModelBillingHistoryPageDetailsRes extends GenericRes {
  data: ModelBillingHistoryPageDetails;
}

export type ViewDetailsRes = {
  name: string;
  amount: number;
  call_duration: string;
  call_end_time: string;
  call_start_time: string;
  category: string;
  free_credits: number;
  country_name: string;
  created_at: string;
  credits: number;
  credits_per_minute: number;
  customer_id: number;
  details: string;
  id: number;
  is_online: number;
  languages: CallHistoryLanguages[];
  link: string;
  model_dob: string;
  model_id: number;
  model_name: string;
  price_per_minute: number;
  user_name: string;
  wallet_id: number;
  cords: string;
};
