import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../api/admin/adminSlice";
import Header from "../Header";
import Sidebar from "./Sidebar";

const Customer = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <Header />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            padding: "20px",
            marginLeft: "50px",
            marginRight: "40px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#333",
              fontSize: "2.5rem",
            }}
          >
            All Users
          </h2>

          {loading ? (
            <p>Loading customers...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {customers.map((customer) => (
                <div
                  key={customer._id}
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "10px",
                      color: "#007bff",
                    }}
                  >
                    {customer.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      marginBottom: "5px",
                      color: "#555",
                    }}
                  >
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#555",
                    }}
                  >
                    <strong>Role:</strong> {customer.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customer;
