import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div
      style={{
        width: '250px',
        height: '90vh',
        backgroundColor: '#f8f9fa',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        top: '8%',
        left: '0',
        zIndex: '1000',
      }}
    >
      <h3
        style={{
          marginBottom: '30px',
          color: '#007bff',
          textAlign: 'center',
          fontSize: '1.5rem',
        }}
      >
        Admin Panel
      </h3>

      <ul
        style={{
          listStyleType: 'none',
          padding: '0',
          margin: '0',
        }}
      >
        {/* Sidebar Links */}
        <li
          style={{
            padding: '15px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            marginBottom: '10px',
            background:
              location.pathname === '/'
                ? 'linear-gradient(135deg, #4facfe, #00f2fe)'
                : 'transparent',
            color: location.pathname === '/' ? 'white' : '#333',
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'inherit', // Use parent color
              display: 'block',
            }}
          >
            Home
          </Link>
        </li>
        <li
          style={{
            padding: '15px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            marginBottom: '10px',
            background:
              location.pathname === '/dashboard'
                ? 'linear-gradient(135deg, #4facfe, #00f2fe)'
                : 'transparent',
            color: location.pathname === '/dashboard' ? 'white' : '#333',
          }}
        >
          <Link
            to="/dashboard"
            style={{
              textDecoration: 'none',
              color: 'inherit', // Use parent color
              display: 'block',
            }}
          >
            Dashboard
          </Link>
        </li>
        <li
          style={{
            padding: '15px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            marginBottom: '10px',
            background:
              location.pathname === '/all-customers'
                ? 'linear-gradient(135deg, #4facfe, #00f2fe)'
                : 'transparent',
            color: location.pathname === '/all-customers' ? 'white' : '#333',
          }}
        >
          <Link
            to="/all-customers"
            style={{
              textDecoration: 'none',
              color: 'inherit', // Use parent color
              display: 'block',
            }}
          >
            Customers
          </Link>
        </li>
        <li
          style={{
            padding: '15px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            marginBottom: '10px',
            background:
              location.pathname === '/all-tickets'
                ? 'linear-gradient(135deg, #4facfe, #00f2fe)'
                : 'transparent',
            color: location.pathname === '/all-tickets' ? 'white' : '#333',
          }}
        >
          <Link
            to="/all-tickets"
            style={{
              textDecoration: 'none',
              color: 'inherit', // Use parent color
              display: 'block',
            }}
          >
            Tickets
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
