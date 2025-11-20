import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "@/lib/http/api";
import { AppDispatch } from "../store";
import {
  IUserRequestsState,
  IUserRequestsResponse,
  IUserRequest,
} from "./userRequestsSlice.types";
import { Status } from "@/lib/types/type";

const initialState: IUserRequestsState = {
  requests: [],
  status:Status.LOADING,
  error: null,
};

const userRequestsSlice = createSlice({
  name: "userRequests",
  initialState,
  reducers: {
    // Set all user requests
    setUserRequests(state, action: PayloadAction<IUserRequest[]>) {
      state.requests = action.payload;
    },

    // Set status (LOADING / SUCCESS / ERROR / IDLE)
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    // Set error
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUserRequests, setStatus, setError } =
  userRequestsSlice.actions;
export default userRequestsSlice.reducer;

/* -----------------------------------------------------
   ⭐ FETCH USER REQUESTS THUNK (same style as authSlice)
----------------------------------------------------- */
export function fetchUserRequests() {
  return async function fetchUserRequestsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));

      const response = await API.get<IUserRequestsResponse>(
        "/blood/request/fetchdatabyId/fromuserId"
      );

      if (response.status === 200) {
        dispatch(setUserRequests(response.data.requests));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error("Fetch user requests error:", error);
      dispatch(setStatus(Status.ERROR));
      dispatch(setError(error.response?.data?.message || error.message));
    }
  };
}
