import { Status } from "@/lib/types/type";
import { IDonorData, IDonorInitialState, IEligibleDonorData } from "./donorSlice.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http/api";




const initialState: IDonorInitialState = {
  donor: {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    bloodGroup: "",
    province: "",
    district: "",
    city: "",
    dateofbirth: "",
    last_donation_date: null, // optional field
    next_eligible_date: null,
  },
  donors: [],
  status: Status.IDLE,
};

const donorSlice = createSlice({
  name: "donor",
  initialState: initialState,
  reducers: {
    setDonor(state: IDonorInitialState, action: PayloadAction<IDonorData>) {
      state.donor = action.payload;
    },
    setDonors(state: IDonorInitialState, action: PayloadAction<IEligibleDonorData[]>) {
      state.donors = action.payload;
    },
    setStatus(state: IDonorInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});
export const { setDonor, setDonors, setStatus } = donorSlice.actions;
export default donorSlice.reducer;

export function registerDonor(data: IDonorData) {
  return async function registerDonorThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.post("auth/register/donor", data);

      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Donor signup error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchAllEligibleDonors() {
  return async function fetchAllEligibleDonorsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.get<{message: string, data: IEligibleDonorData[]}>("donor/eligible");

      if (response.status === 200) {
        dispatch(setDonors(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Fetch eligible donors error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

