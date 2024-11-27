import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTickets } from "../../api/ticket/ticketSlice";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const ViewAllTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tickets = [], status, error, message } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(fetchUserTickets());
  }, [dispatch]);

  const handleTicketClick = (ticketId) => {
    navigate(`/ticket-details/${ticketId}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const renderLoading = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        fontSize: "1.5rem",
        color: "#555",
      }}
    >
      Loading...
    </div>
  );

  const renderError = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "1.5rem", color: "red", fontWeight: "500" }}>
        Error: {error || message || "An unexpected error occurred"}
      </p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={handleBackClick}
      >
        Go Back
      </button>
    </div>
  );

  const renderNoTickets = () => (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#f1f1f1",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p
        style={{
          fontSize: "1.5rem",
          color: "#555",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
        No Tickets Found
      </p>
      <p
        style={{
          fontSize: "1rem",
          color: "#777",
        }}
      >
        {message || "You haven't created any tickets yet."}
      </p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={handleBackClick}
      >
        Go Back
      </button>
    </div>
  );

  const renderTickets = () => (
    <ul style={{ listStyle: "none", padding: "0" }}>
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "15px",
            padding: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "96%",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
          }}
          onClick={() => handleTicketClick(ticket.id)}
        >
          <span
            style={{
              fontSize: "1.2rem",
              color: "#333",
              fontWeight: "600",
              flex: "1",
            }}
          >
            {ticket.title}
          </span>
          <span
            style={{
              fontSize: "0.9rem",
              color: "#777",
              textAlign: "left",
              whiteSpace: "nowrap",
              marginLeft: "20px",
            }}
          >
            {new Date(ticket.createdAt).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
          margin: "20px auto",
          maxWidth: "800px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "30px",
            cursor: "pointer",
            fontSize: "2rem",
            color: "#333",
          }}
          onClick={handleBackClick}
        >
          ←
        </div>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Your Tickets
        </h2>
        {status === "loading" && renderLoading()}
        {status === "failed" && renderError()}
        {tickets.length === 0 && status === "succeeded" && renderNoTickets()}
        {tickets.length > 0 && status === "succeeded" && renderTickets()}
      </div>
    </>
  );
};

export default ViewAllTickets;
