
export  interface IBloodRequestData {
  requester_name: string;
  requester_phone: string;
  requester_address: string;
  urgent: boolean;
  blood_group: string;
  donor_id?: string;
  requestor_id?: string;
  status?:string
}