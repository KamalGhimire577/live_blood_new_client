export interface IDonorRequest {
  id: number;
  requester_name: string;
  requester_phone: string;
  requester_address: string;
  blood_group: string;
  urgent: boolean;
  status: string;
  createdAt: string;
  donor_id: number;
  requestor_id: number;
}

export interface IDonorRequestsResponse {
  donorId: string;
  totalRequests: number;
  requests: IDonorRequest[];
}

export interface IDonorProfile {
  id: number;
  city: string;
  bloodgroup: string;
  dob: string;
  last_donation_date: string | null;
  next_eligible_date: string | null;
}

export interface IDonorProfileResponse {
  message: string;
  donorResult: IDonorProfile[];
}

export interface IDonorRequestsState {
  requests: IDonorRequest[];
  profile: IDonorProfile | null;
  loading: boolean;
  error: string | null;
}