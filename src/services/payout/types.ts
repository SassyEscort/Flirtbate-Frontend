import { GenericRes } from 'services/guestAuth/authuser.services';

export type AddBAnkDetails = {
  id: number;
  model_id: number;
  bank_name: string;
  account_name: string;
  iban_number: string;
};

export type AddBankList = {
  id: number;
  model_id: number;
  bank_name: string;
  account_name: string;
  iban_number: string;
  created_at: string;
  is_active: number;
};

export type AgricketList = {
  total_rows: number;
  page_size: number;
  offset: number;
};

export type BankDetailsRes = {
  bank_details: AddBankList[];
  aggregate: AgricketList;
};

export type PayoutDetails = {
  map: any;
  payout: any;
  id: number;
  model_id: number;
  amount: number;
  state: string;
  created_at: string;
  is_active: number;
  name: string;
  email: string;
  bank_name: string;
};

export type payout_logs = { id: number; state: string; created_at: string };
export type PayoutRes = PayoutDetails & {
  payout_logs: payout_logs[];
};

export type ModelPastPayoutAggregate = {
  total_rows: 100;
  page_size: 10;
  offset: 0;
};

export type ModelPastPayoutDetail = {
  payout_details: PayoutDetails[];
  aggregate: ModelPastPayoutAggregate;
};

export type ModelPastPayoutResDetail = {
  payout_details: PayoutRes[];
  aggregate: ModelPastPayoutAggregate;
};

export type BankDetailsDelete = {
  status: string;
  message: string;
};

export interface BankDetailsListRes extends GenericRes {
  data: BankDetailsRes;
}
export interface AddBankDetailsRes extends GenericRes {
  data: AddBAnkDetails;
}

export interface BankDetailsDeleteRes extends GenericRes {
  data: BankDetailsDelete;
}

export type BackDetailsEditParams = {
  bank_name: string;
  account_name: string;
  iban_number: string;
};

export type BankDetailsEditRep = {
  id: number;
  bank_name: string;
  account_name: string;
  iban_number: string;
  is_active: boolean;
};

export interface BankDetailsEditReponse extends GenericRes {
  data: BankDetailsEditRep;
}

export interface ModelPastPayoutDetailRes extends GenericRes {
  data: ModelPastPayoutResDetail;
}

export type RequestPayout = {
  id: number;
  amount: number;
  state: string;
  created_at: string;
  is_active: boolean;
  bank_account_id: number;
};

export interface RequestPayoutRep extends GenericRes {
  data: RequestPayout;
}

export type MarkOnline = {
  message: string;
  code: number;
  error: string;
};

export type ModelPastPayoutDetailParams = {
  limit: number;
  offset: number;
  filter_text?: string;
  status?: string;
  startDate?: Date | null;
  endDate?: Date | null;
};
