

import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IInitialBloodData, IBloodRequestData } from "./bloodrequestSlice.types";
import { Status } from "@/lib/types/type";
import API from "@/lib/http/api";
import { AppDispatch } from "../store";

enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}


const initialState:IInitialBloodData={

  bloodrequest: {
    donor_id: "",
    requestor_id: "",
    requester_name: "",
    requester_phone: "",
    requester_address: "",
    urgent: false,
    blood_group: "",
    status: "",
  },
  status:Status.IDLE
}
const bloodrequestSlice = createSlice({
  name: "bloodrequest",
  initialState,
  reducers: {
    setBloodRequest: (state, action: PayloadAction<IBloodRequestData>) => {
      state.bloodrequest = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    }
  },
});

export const { setBloodRequest, setStatus } = bloodrequestSlice.actions;
export default bloodrequestSlice.reducer;

export function addBloodRequest(data: IBloodRequestData) {
  return async function addBloodRequestThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      
      // Backend expects: donorId, requesterAddress, urgent, bloodGroup
      // Backend gets requesterName, requesterPhone, requesterId from req.user
      const requestData = {
        donorId: data.donor_id,
        requesterAddress: data.requester_address,
        urgent: data.urgent,
        bloodGroup: data.blood_group
      };
      
      const response = await API.post("blood/request", requestData);
      
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error("Blood request error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      if (error.response?.status === 401) {
        console.error("Authentication failed - token invalid or expired");
      } else if (error.response?.status === 400) {
        console.error("Bad request - missing required fields:", error.response.data);
      }
      
      dispatch(setStatus(Status.ERROR));
    }
  };
}


