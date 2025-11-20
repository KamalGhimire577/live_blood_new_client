import { Status } from "@/lib/types/type";

export interface IBloodRequestData{
  //  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  //       donor_id VARCHAR(36) NOT NULL,
  //       requestor_id VARCHAR(36) NOT NULL,
  //       requester_name VARCHAR(255) NOT NULL,
  //       requester_phone VARCHAR(20) NOT NULL,
  //       requester_address VARCHAR(255) NOT NULL,
  //       urgent BOOLEAN DEFAULT FALSE,
  //       blood_group VARCHAR(10) NOT NULL,
  //       status VARCHAR(20) DEFAULT 'pending',
  //       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  //       FOREIGN KEY (donor_id) REFERENCES donors(id),
  //       FOREIGN KEY (requestor_id) REFERENCES users(id)
 
  donor_id: string,
  requestor_id: string,
  requester_name: string,
  requester_phone: string,
  requester_address: string,
  urgent: boolean,
  blood_group: string,
  status: string,
  
}




export  interface IInitialBloodData{
  bloodrequest: IBloodRequestData,
  
  status:Status
}