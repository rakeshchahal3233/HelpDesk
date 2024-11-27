export const createTicketAPI = async (ticketData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token provided");
  }

  const response = await fetch("http://localhost:8000/api/tickets/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  const data = await response.json();
  return data;
};

export const userTicketsAPI = async () => {
  const token = localStorage.getItem("token"); // Assuming token is saved in localStorage

  const response = await fetch("http://localhost:8000/api/tickets/my-tickets", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch tickets");
  }

  const data = await response.json();
  return data;
};

// Fetch a specific ticket by its ID
export const fetchTicketById = async (ticketId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8000/api/tickets/ticket/${ticketId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch ticket details");
  }

  const data = await response.json();
  return data;
};

export const addNoteToTicket = async (ticketId, note, attachment) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("note", note);
  if (attachment) formData.append("attachment", attachment);

  const response = await fetch(`http://localhost:8000/api/tickets/notes/${ticketId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Unable to add note");
  }

  const data = await response.json();
  return data; // Return the updated ticket with notes
};

export const fetchAllTickets = async () => {
   
  const token = localStorage.getItem("token");

  const response = await fetch('http://localhost:8000/api/tickets', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }

  const data = await response.json();
  return data;
};


export const updateTicketStatus = async ({ ticketId, newStatus }) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8000/api/tickets/status/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update the ticket status");
  }

  const data = await response.json();
  return data;
};
