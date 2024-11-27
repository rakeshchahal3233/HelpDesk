// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home"; // Home component after login
import { Navigate } from "react-router-dom";
import CreateTicket from "./components/ticket/CreateTicket";
import ViewAllTickets from "./components/ticket/ViewAllTickets";
import TicketDetails from "./components/ticket/TicketDetails";
import Dashboard from "./components/admin/Dashboard";
import Tickets from "./components/admin/Tickets";
import Customers from "./components/admin/Customers";
import './App.css';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />} // Redirect to home if already logged in
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />} // Redirect to home if already logged in
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} // Protect the home route
        />
        <Route
          path="/create-ticket"
          element={isAuthenticated ? <CreateTicket /> : <Navigate to="/login" />} // Protect the home route
        />
        <Route
          path="/view-tickets"
          element={isAuthenticated ? <ViewAllTickets /> : <Navigate to="/login" />} // Protect the home route
        />

         <Route
          path="/ticket-details/:id"
          element={isAuthenticated ? <TicketDetails /> : <Navigate to="/login" />} // Protect the home route
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} // Protect the home route
        />

        <Route
          path="/all-tickets"
          element={isAuthenticated ? <Tickets /> : <Navigate to="/login" />} // Protect the home route
        />

        <Route
          path="/all-customers"
          element={isAuthenticated ? <Customers /> : <Navigate to="/login" />} // Protect the home route
        />

      </Routes>
    </Router>
  );
};

export default App;
