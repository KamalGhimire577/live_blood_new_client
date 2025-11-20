// collect all slices and store

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import donorAuthSlice from "./donor/donorSlice"
import bloodrequestReducer from "./bloodrequest/bloodrequestSlice";
import userRequestsReducer from "./userRequests/userRequestsSlice";
import donorRequestsReducer from "./donorRequests/donorRequestsSlice";
import adminReducer from "./admin/adminSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    donorauth: donorAuthSlice,
    bloodrequest: bloodrequestReducer,
    userRequests: userRequestsReducer,
    donorRequests: donorRequestsReducer,
    admin: adminReducer,
  },
});

export default store;

// dispatch ko type --> paxi kaam lagxa hamilai
// dispatch(setName()) --> dispatch() : AppDispatch
export type AppDispatch = typeof store.dispatch; // useDispatch lai type dina chayenxa
export type RootState = ReturnType<typeof store.getState>; // useSelector lai type dina chayenxa

// react-redux -- package
// next - reduxToolkit

// differents hook provide garxa :useSelector (), useDispatch()
