import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth/authSlice"; // Adjust the path to your logout action

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth); // Get user from auth state

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to the home page
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ddd",
      }}
    >
       <Link
        to="/"
        style={{
          textDecoration: "none", // Remove underline
          color: "black", // Set text color to black
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        HelpDesk
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flex: "1",
        }}
      >

        {user && (
          <span
            style={{
              fontSize: "1rem",
              color: "#555",
              fontStyle: "italic",
            }}
          >
            Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        )}
      </div>

      {/* Right Side: Auth Buttons */}
      <div>
        {user ? (
          <button
            style={{
              padding: "8px 16px",
              fontSize: "1rem",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "1rem",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
