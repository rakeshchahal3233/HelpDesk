export const fetchAdminDashboardData = async () => {

  const token = localStorage.getItem("token");

  const response = await fetch('http://localhost:8000/api/admin/dashboard', {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  const data = await response.json();
  return data;
};


export const fetchCustomers = async () => {

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8000/api/users/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};


// /src/api/ticketAPI.js

export const fetchTickets = async () => {

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8000/api/tickets", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tickets");
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
