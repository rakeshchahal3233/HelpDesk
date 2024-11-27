import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { getAllTickets } from "../api/ticket/ticketSlice";
import Sidebar from "./admin/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { tickets, isLoading, error } = useSelector((state) => state.ticket);

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Fetch tickets if the user is an agent
  useEffect(() => {
    if (user?.role === "agent") {
      dispatch(getAllTickets()); // Fetch the tickets from API or Redux
    }
  }, [dispatch, user]);

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <Header />

      {user?.role === "admin" && (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <Sidebar
            style={{
              position: "fixed",
              top: "60px", // Adjust based on header height
              left: "0",
              height: "calc(100vh - 60px)", // Full height minus header height
              width: "200px", // Sidebar width
              backgroundColor: "#f8f9fa",
              boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              marginLeft: "200px", // Sidebar width
              padding: "20px",
              flex: "1",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>
              Welcome, {user?.name || "User"}
            </h2>
          </div>
        </div>
      )}

      {user?.role !== "admin" && (
        <div style={{ maxWidth: "900px", margin: "20px auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>
            Welcome, {user?.name || "User"}
          </h2>

          {/* Action Buttons */}
          {user?.role === "customer" && (
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <button
                onClick={() => navigate("/create-ticket")}
                style={{
                  padding: "10px 20px",
                  fontSize: "1rem",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Create New Ticket
              </button>
              <button
                onClick={() => navigate("/view-tickets")}
                style={{
                  padding: "10px 20px",
                  fontSize: "1rem",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                View All Tickets
              </button>
            </div>
          )}

          {/* Agent view */}
          {user?.role === 'agent' && (
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333' }}>
                All Tickets
              </h3>

              {/* Display loading or error messages */}
              {isLoading && <p>Loading tickets...</p>}
              {error && <p style={{ color: 'red' }}>Error fetching tickets: {error}</p>}

              {/* Render tickets if available */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '20px',
                  marginBottom: '30px',
                }}
              >
                {tickets?.map((ticket) => (
                  <div
                    key={ticket._id}
                    onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                    style={{

                      padding: '20px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-in-out',
                      backgroundColor: '#e9ecef',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        color: '#007bff',
                      }}
                    >
                      {ticket.title}
                    </h4>
                    <p style={{ marginBottom: '10px', fontSize: '1rem', color: '#555' }}>
                      <strong>Creator:</strong> {ticket.customer.name}
                    </p>
                    <p style={{ fontSize: '1rem', color: '#888' }}>
                      <strong>Status:</strong> {ticket.status}
                    </p>
                    {/* Added Date part */}
                    <p style={{ fontSize: '1rem', color: '#888', marginTop: '10px' }}>
                      <strong>Created On:</strong> {formatDate(ticket.createdAt)}
                    </p>
                    <p style={{ fontSize: '1rem', color: '#888', marginTop: '10px' }}>
                      <strong>Updated At:</strong> {formatDate(ticket.updatedAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}    
    </div>
  );
};

export default Home;

