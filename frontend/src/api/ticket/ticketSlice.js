import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTicketAPI, userTicketsAPI, fetchTicketById, addNoteToTicket,fetchAllTickets, updateTicketStatus } from "./ticketAPI";

// Async Thunk for ticket creation
export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticketData) => {
    const response = await createTicketAPI(ticketData);
    return response; // Return the created ticket data
  }
);

export const fetchUserTickets = createAsyncThunk(
  "ticket/fetchUserTickets",
  async () => {
    const response = await userTicketsAPI();
    return response.tickets;
  }
);

// Async thunk to fetch ticket details by ID
export const fetchTicketByIdAsync = createAsyncThunk(
  "ticket/fetchTicketById",
  async (ticketId) => {
    const response = await fetchTicketById(ticketId);
    return response;
  }
);

// Async thunk to add note to the ticket
export const addNote = createAsyncThunk(
  "ticket/addNote",
  async ({ ticketId, note, attachment }, { rejectWithValue }) => {
    try {
      const response = await addNoteToTicket(ticketId, note, attachment);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllTickets = createAsyncThunk('tickets/fetchAllTickets', async () => {
  const tickets = await fetchAllTickets();
  return tickets;
});

export const updateTicketStatusAsync = createAsyncThunk(
  "ticket/updateStatus",
  async ({ ticketId, newStatus }) => {
    const response = await updateTicketStatus({ ticketId, newStatus });
    return response; // Updated ticket object
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    ticket: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.tickets.push(action.payload); // Add the new ticket to the state
    });

    builder
      .addCase(fetchUserTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload; // Store the tickets
      })
      .addCase(fetchUserTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchTicketByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTicketByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ticket = action.payload;
      })
      .addCase(fetchTicketByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Add note to ticket
    builder
      .addCase(addNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ticket = action.payload.ticket; // Update ticket with new note
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

      builder
      .addCase(getAllTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

      builder
      .addCase(updateTicketStatusAsync.pending, (state) => {
        state.status = "updating";
      })
      .addCase(updateTicketStatusAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ticket.status = action.payload.status;
      })
      .addCase(updateTicketStatusAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ticketSlice.reducer;
