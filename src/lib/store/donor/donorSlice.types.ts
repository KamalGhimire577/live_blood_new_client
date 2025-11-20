import { Status } from "@/lib/types/type";

export interface IDonorData {
  id?: string,
  username: string,
  password: string,
  email: string,
  phoneNumber: string,
  bloodGroup: string,
  province: string,
  district: string,
  city: string,
  dateofbirth: string |Date,
  last_donation_date?: string | null, // optional field
  next_eligible_date?: string | null, // optional field
}

// Backend response structure
export interface IEligibleDonorData {
  donorId: string,
  donorName: string,
  email: string,
  phoneNumber: string,
  bloodgroup: string,
  province: string,
  district: string,
  city: string,
}

export interface IDonorInitialState{
  donor:IDonorData,
  donors: IEligibleDonorData[], // Array of eligible donors
  status:Status}
