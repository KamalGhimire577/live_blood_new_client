import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "@/lib/http/api";
import { AppDispatch } from "../store";
import {
  IDonorRequestsState,
  IDonorRequestsResponse,
  IDonorRequest,
  IDonorProfileResponse,
} from "./donorRequestsSlice.types";
import { Status } from "@/lib/types/type";

const initialState: IDonorRequestsState = {
  requests: [],
  profile: null,
  loading: false,
  error: null,
};

const donorRequestsSlice = createSlice({
  name: "donorRequests",
  initialState,
  reducers: {
    setDonorRequests(state, action: PayloadAction<IDonorRequest[]>) {
      state.requests = action.payload;
    },
    setDonorProfile(state, action: PayloadAction<any>) {
      state.profile = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateRequestStatus(state, action: PayloadAction<{ id: number; status: string }>) {
      const request = state.requests.find(req => req.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
      }
    },
    removeRequest(state, action: PayloadAction<number>) {
      state.requests = state.requests.filter(req => req.id !== action.payload);
    },
  },
});

export const { setDonorRequests, setDonorProfile, setLoading, setError, updateRequestStatus, removeRequest } =
  donorRequestsSlice.actions;
export default donorRequestsSlice.reducer;

export function fetchDonorRequests() {
  return async function fetchDonorRequestsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));

      const response = await API.get<IDonorRequestsResponse>(
        "/blood/request/fetchdatabyId/donoridfromuserid"
      );

      if (response.status === 200) {
        dispatch(setDonorRequests(response.data.requests));
      } else {
        dispatch(setError("Failed to fetch donor requests"));
      }
    } catch (error: any) {
      console.error("Fetch donor requests error:", error);
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function updateRequestStatusThunk(requestId: number) {
  return async function updateRequestStatusThunk(dispatch: AppDispatch) {
    try {
      const response = await API.put(`/blood/request/status/complete/${requestId}`);
      
      if (response.status === 200) {
        dispatch(updateRequestStatus({ id: requestId, status: "completed" }));
      }
    } catch (error: any) {
      console.error("Update request status error:", error);
      dispatch(setError(error.response?.data?.message || error.message));
    }
  };
}

export function deleteRequestThunk(requestId: number) {
  return async function deleteRequestThunk(dispatch: AppDispatch) {
    try {
      const response = await API.delete(`/blood/request/${requestId}`);
      
      if (response.status === 200) {
        dispatch(removeRequest(requestId));
      }
    } catch (error: any) {
      console.error("Delete request error:", error);
      dispatch(setError(error.response?.data?.message || error.message));
    }
  };
}

export function fetchDonorProfile() {
  return async function fetchDonorProfileThunk(dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));

      const response = await API.get<IDonorProfileResponse>("/donor/me");

      if (response.status === 200) {
        dispatch(setDonorProfile(response.data.donorResult[0] || null));
      }
    } catch (error: any) {
      console.error("Fetch donor profile error:", error);
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
}