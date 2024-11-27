import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets } from "../../api/admin/adminSlice";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Tickets = () => {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <Header />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <h2
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#333",
              fontSize: "2.5rem",
            }}
          >
            All Tickets
          </h2>
          {loading && <p>Loading tickets...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            {tickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/ticket-details/${ticket._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0, color: "#333" }}>{ticket.title}</h3>
                    <span
                      style={{
                        fontWeight: "bold",
                        color:
                          ticket.status === "Active"
                            ? "green"
                            : ticket.status === "Closed"
                            ? "red"
                            : "#007bff",
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "10px 0",
                      color: "#555",
                      fontSize: "0.95rem",
                    }}
                  >
                    Creator: {ticket.customer?.name || "N/A"}
                  </p>
                  <p
                    style={{
                      textAlign: "right",
                      marginTop: "-25px",
                      color: "#888",
                      fontSize: "0.85rem",
                    }}
                  >
                    Created On: {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
