// src/components/Ticket/CreateTicket.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../api/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../api/ticket/ticketSlice';
import Header from '../Header';

const CreateTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");

  // Call fetchUser when the component mounts
  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUser());
    }

    if (!user) {
      navigate('/login');
    }
  }, [dispatch, user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required!");
      return;
    }

    const ticketData = {
      title,
      user: user._id, // Assuming user._id contains the logged-in user's ID
    };

    try {
      await dispatch(createTicket(ticketData));
      alert("Ticket created successfully!");
      navigate("/view-tickets");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("An error occurred while creating the ticket.");
    }
  };

  const handleCancel = () => {
    setTitle(""); // Clear the title field
    navigate('/'); // Redirect to home page
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while fetching user data
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h2>Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field (Non-editable) */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user?.name || ""}
              readOnly
              style={{
                width: "96%",
                padding: "8px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ced4da",
                cursor: "not-allowed",
              }}
            />
          </div>

          {/* Email Field (Non-editable) */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email || ""}
              readOnly
              style={{
                width: "96%",
                padding: "8px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ced4da",
                cursor: "not-allowed",
              }}
            />
          </div>

          {/* Title Field */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="title" style={{ display: "block", marginBottom: "5px" }}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "96%", padding: "8px" }}
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px"}}>
  <button
    type="submit"
    style={{
      flex: 1,
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
    }}
  >
    Submit
  </button>
  <button
    type="button"
    onClick={handleCancel}
    style={{
      flex: 1,
      padding: "10px 20px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
    }}
  >
    Cancel
  </button>
</div>

        </form>
      </div>
    </>
  );
};

export default CreateTicket;
