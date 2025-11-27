import { Status } from "@/lib/types/type";
import {
  IDonorData,
  IDonorInitialState,
  IEligibleDonorData,
} from "./donorSlice.types";
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
    last_donation_date: null,
    next_eligible_date: null,
  },
  donors: [],
  status: Status.IDLE,
};

const donorSlice = createSlice({
  name: "donor",
  initialState,
  reducers: {
    setDonor(state, action: PayloadAction<IDonorData>) {
      state.donor = action.payload;
    },
    setDonors(state, action: PayloadAction<IEligibleDonorData[]>) {
      state.donors = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    // ⭐ RESET STATE (Fix caching issue)
    resetDonorState(state) {
      state.status = Status.IDLE;
      state.donor = initialState.donor;
      state.donors = [];
    },
  },
});

export const { setDonor, setDonors, setStatus, resetDonorState } =
  donorSlice.actions;
export default donorSlice.reducer;

// ==========================
//     THUNKS
// ==========================

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

      const response = await API.get<{
        message: string;
        data: IEligibleDonorData[];
      }>("donor/eligible");

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
