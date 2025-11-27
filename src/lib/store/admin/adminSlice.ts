// lib/store/admin/adminSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../http/api";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../store";

// -------------------- TYPES --------------------
export interface IUser {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface IDonor {
  id: string;
  user_id: string;
  bloodgroup: string;
  dob?: string;
  city?: string;
  district: number;
  province: number;
  last_donation_date?: string | null;
  next_eligible_date?: string | null;
  // From joined users table
  userName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface IBloodRequest {
  [x: string]: any;
  id: string;
  requester_name: string;
  requester_phone: string;
  requester_address: string;
  donorUserName?: string;
  donorEmail?: string;
  donorPhoneNumber?: string;
  donorBloodGroup?: string;
  donorCity?: string;
  donorDistrict?: number;
  donorProvince?: number;
  blood_group: string;
  urgent: boolean;
  request_date?: string;
  status: string;
  completed_date?: string;
}

interface IAdminState {
  users: IUser[];
  donors: IDonor[];
  bloodRequests: IBloodRequest[];
  donations: IBloodRequest[];
  status: Status;
}

// -------------------- INITIAL STATE --------------------
const initialState: IAdminState = {
  users: [],
  donors: [],
  bloodRequests: [],
  donations: [],
  status: Status.IDLE,
};

// -------------------- SLICE --------------------
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    setDonors(state, action: PayloadAction<IDonor[]>) {
      state.donors = action.payload;
    },
    setBloodRequests(state, action: PayloadAction<IBloodRequest[]>) {
      state.bloodRequests = action.payload;
    },
    setDonations(state, action: PayloadAction<IBloodRequest[]>) {
      state.donations = action.payload;
    },
  },
});

export const {
  setStatus,
  setUsers,
  setDonors,
  setBloodRequests,
  setDonations,
} = adminSlice.actions;

export default adminSlice.reducer;

// -------------------- THUNKS --------------------

// Fetch all users
export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const res = await API.get<{ data: IUser[] }>("admin/dashboard/users");
      dispatch(setUsers(res.data.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Fetch users error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch all donors
export function fetchDonors() {
  return async function fetchDonorsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const res = await API.get<{ data: IDonor[] }>("admin/dashboard/donors");
      console.log("Donors API Response:", res.data);
      console.log("First donor:", res.data.data[0]);
      dispatch(setDonors(res.data.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Fetch donors error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch pending blood requests
export function fetchBloodRequests() {
  return async function fetchBloodRequestsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const res = await API.get<{ data: IBloodRequest[] }>(
        "admin/dashboard/blood-requests"
      );
      dispatch(setBloodRequests(res.data.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Fetch blood requests error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch completed donations
export function fetchDonations() {
  return async function fetchDonationsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const res = await API.get<{ data: IBloodRequest[] }>(
        "admin/dashboard/donations"
      );
      dispatch(setDonations(res.data.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Fetch donations error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Complete a blood request
export function completeBloodRequest(id: string) {
  return async function completeBloodRequestThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      await API.put(`admin/dashboard/blood-requests/${id}`, {
        status: "completed",
      });
      dispatch(fetchBloodRequests());
      dispatch(fetchDonations());
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Complete blood request error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Update blood request status
export function updateBloodRequestStatus(id: string, status: string) {
  return async function updateBloodRequestStatusThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      await API.put(`admin/dashboard/blood-requests/${id}`, { status });
      dispatch(fetchBloodRequests());
      dispatch(fetchDonations());
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Update blood request status error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Delete user
export function deleteUser(id: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      await API.delete(`admin/dashboard/delete-user/${id}`);
      dispatch(fetchUsers());
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Delete user error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Delete donor
export function deleteDonor(id: string) {
  return async function deleteDonorThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      await API.delete(`admin/dashboard/delete-donor/${id}`);
      dispatch(fetchDonors());
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Delete donor error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Delete blood request / donation
export function deleteBloodRequest(id: string) {
  return async function deleteBloodRequestThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      await API.delete(`admin/dashboard/blood-request/${id}`);
      dispatch(fetchBloodRequests());
      dispatch(fetchDonations());
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.error("Delete blood request error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Reset admin status
export function resetAdminStatus() {
  return function resetAdminStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.IDLE));
  };
}
