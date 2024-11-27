import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAdminDashboardData, fetchCustomers, fetchTickets} from './adminAPI';

export const getDashboardData = createAsyncThunk(
  'admin/getDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAdminDashboardData();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCustomers();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTickets = createAsyncThunk("admin/getTickets", async () => {
  const data = await fetchTickets();
  return data;
});


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboardData: null,
    customers: [],
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
