import { Status } from "@/lib/types/type";

export interface IUserRequest {
  request_id: number;
  requester_name: string;
  requester_phone: string;
  requester_address: string;
  blood_group: string;
  urgent: boolean;
  status: string;
  request_date: string;
  donor_id: number | null;
  donor_full_address: string | null;
  donor_username: string | null;
  donor_phone: string | null;
}

export interface IUserRequestsResponse {
  user_id: string;
  totalRequests: number;
  requests: IUserRequest[];
}

export interface IUserRequestsState {
  requests: IUserRequest[];
  status: Status;
  error: string | null;
}