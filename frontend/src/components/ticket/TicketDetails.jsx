import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTicketByIdAsync, addNote, updateTicketStatusAsync } from "../../api/ticket/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";

const TicketDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, status, error } = useSelector((state) => state.ticket);

  const [showModal, setShowModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [newStatus, setNewStatus] = useState(ticket?.status);

  // console.log(ticket);

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketByIdAsync(id)); // Fetch ticket details on initial load
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (ticket?.status) {
      setNewStatus(ticket.status); // Update the status input field with the ticket status
    }
  }, [ticket]);

  const resetModalForm = () => {
    setNoteContent("");
    setAttachment(null);
  };

  const handleAddNote = () => {
    if (noteContent.trim() === "") {
      alert("Note content cannot be empty!");
      return;
    }

    dispatch(addNote({ ticketId: id, note: noteContent, attachment }))
      .unwrap()
      .then(() => {
        // Re-fetch ticket details after adding the note
        dispatch(fetchTicketByIdAsync(id));

        resetModalForm();
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  const handleCloseModal = () => {
    resetModalForm();
    setShowModal(false);
  };

  const handleAttachmentClick = (attachmentUrl) => {
    // Open the attachment in a new window to view it
    window.open(`http://localhost:8000/${attachmentUrl}`, "_blank");
  };

  const handleBack = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    if (role === "customer") {
      navigate("/view-tickets");
    } else if (role === "agent") {
      navigate("/");
    }
    else if(role==="admin"){
      navigate("/all-tickets");
    }
     else {
      console.warn("Role not defined, redirecting to default page.");
      navigate("/");
    }
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    dispatch(updateTicketStatusAsync({ ticketId: id, newStatus }))
      .unwrap()
      .then(() => {
        dispatch(fetchTicketByIdAsync(id)); // Re-fetch updated ticket details
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "1.5rem" }}>
        Loading ticket details...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "1.5rem", color: "red" }}>
        Error: {error}
      </div>
    );
  }

  // Fetch the role from localStorage for role-based UI rendering
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "customer"; // Default to 'customer' if role is not found

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
          maxWidth: "900px",
          margin: "40px auto",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          &times;
        </button>
        <h2
          style={{
            fontSize: "2.2rem",
            color: "#333",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {ticket?.title}
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
          <strong>Created At:</strong> {new Date(ticket?.createdAt).toLocaleString()}
        </p>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          <strong>Status:</strong> {ticket?.status}
        </p>

        {/* Status Dropdown (Visible for Admin and Agent only) */}
        {["admin", "agent"].includes(userRole) && (
          <div style={{ marginBottom: "20px" }}>
            <select
              value={newStatus}
              onChange={handleStatusChange}
              style={{
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
            <button
              onClick={handleUpdateStatus}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Update Status
            </button>
          </div>
        )}

        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Add Note
        </button>
      </div>

      {/* Notes Section */}
      {ticket?.notes?.length > 0 && (
        <div
          style={{
            padding: "20px",
            maxWidth: "900px",
            margin: "20px auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "15px",
              color: "#555",
              borderBottom: "2px solid #ddd",
              paddingBottom: "5px",
            }}
          >
            Notes
          </h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {ticket?.notes?.map((note, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p style={{ marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                  {note.addedBy.name} ({note.addedBy.role})
                </p>
                <p style={{ fontSize: "1rem", marginBottom: "5px", color: "#555" }}>
                  {note.note}
                </p>
                {note.attachment && (
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "5px",
                      display: "inline-block",
                      marginTop: "10px",
                      backgroundColor: "#f1f1f1",
                    }}
                  >
                    <a
                      href="#"
                      onClick={() => handleAttachmentClick(note.attachment)}
                      style={{ textDecoration: "none", color: "#007BFF", fontSize: "0.9rem" }}
                    >
                      View Attachment
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3>Add a Note</h3>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "5px",
                borderColor: "#ddd",
                marginBottom: "10px",
              }}
              placeholder="Type your note here..."
            />
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              style={{
                display: "block",
                marginBottom: "15px",
                fontSize: "1rem",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "gray",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
              <button
                onClick={handleAddNote}
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketDetails;
