import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/auth/authSlice";
import ticketReducer from '../api/ticket/ticketSlice' 
import adminReducer from '../api/admin/adminSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket:ticketReducer,
    admin:adminReducer
  },
});

export default store;
