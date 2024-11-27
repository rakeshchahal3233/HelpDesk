import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../api/auth/authSlice";
import Header from "../Header";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(credentials)); // Dispatch the register async action
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
            Create an Account
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "30px",
            }}
          >
            Sign up to get started
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              value={credentials.name}
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              placeholder="Full Name"
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
              Register
            </button>
          </form>
          <div
            style={{
              marginTop: "20px",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Already have an account?{" "}
            <Link
              to='/login'
              style={{
                color: "#007BFF",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
