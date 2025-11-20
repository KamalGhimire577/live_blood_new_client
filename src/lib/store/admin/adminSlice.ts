import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../http/api';
import { Status } from '@/lib/types/type';
import { AppDispatch } from '../store';

interface AdminState {
  users: any[];
  donors: any[];
  bloodRequests: any[];
  donations: any[];
  status: Status;
}

const initialState: AdminState = {
  users: [],
  donors: [],
  bloodRequests: [],
  donations: [],
  status: Status.IDLE,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload;
    },
    setDonors: (state, action: PayloadAction<any[]>) => {
      state.donors = action.payload;
    },
    setBloodRequests: (state, action: PayloadAction<any[]>) => {
      state.bloodRequests = action.payload;
    },
    setDonations: (state, action: PayloadAction<any[]>) => {
      state.donations = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { setUsers, setDonors, setBloodRequests, setDonations, setStatus } = adminSlice.actions;
export default adminSlice.reducer;

export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.get('admin/dashboard/users');
      
      if (response.status === 200) {
        dispatch(setUsers((response.data as any).data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchDonors() {
  return async function fetchDonorsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.get('admin/dashboard/donors');
      
      if (response.status === 200) {
        dispatch(setDonors((response.data as any).data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error('Fetch donors error:', error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchBloodRequests() {
  return async function fetchBloodRequestsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.get('admin/dashboard/blood-requests');
      
      if (response.status === 200) {
        dispatch(setBloodRequests((response.data as any).data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error('Fetch blood requests error:', error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchDonations() {
  return async function fetchDonationsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.get('admin/dashboard/donations');
      
      if (response.status === 200) {
        dispatch(setDonations((response.data as any).data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error('Fetch donations error:', error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteUser(id: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.delete(`admin/dashboard/delete-user/${id}`);
      
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        // Refetch users after deletion
        dispatch(fetchUsers());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error('Delete user error:', error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteDonor(id: string) {
  return async function deleteDonorThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.delete(`admin/dashboard/delete-donor/${id}`);
      
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        // Refetch donors after deletion
        dispatch(fetchDonors());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error('Delete donor error:', error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updateBloodRequestStatus(id: string, status: string) {
  return async function updateBloodRequestStatusThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.put(`admin/dashboard/blood-requests/${id}`, { status });
      
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        // Refetch blood requests after update
        dispatch(fetchBloodRequests());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error('Update blood request status error:', error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}