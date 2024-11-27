import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../api/auth/authSlice"; // Import the login thunk
import Header from "../Header";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials)); // Dispatch the login async action
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "91vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "40px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "20px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "30px",
            }}
          >
            Login to your account
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="Email"
              style={{
                padding: "10px",
                marginBottom: "15px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Password"
              style={{
                padding: "10px",
                marginBottom: "20px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                fontSize: "1rem",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              Login
            </button>
          </form>
          <div
            style={{
              marginTop: "20px",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Don't have an account?{" "}
            <Link
              to='/register'
              style={{
                color: "#007BFF",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
