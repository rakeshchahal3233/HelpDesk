import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../api/admin/adminSlice';
import Header from '../Header';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading dashboard data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333'}}>
      <Header />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Total Customers</h2>
          <p style={styles.cardValue}>{dashboardData?.totalCustomers}</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Total Tickets</h2>
          <p style={styles.cardValue}>{dashboardData?.totalTickets}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    marginLeft:'180px'
  },
  header: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    width: '300px',
    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '10px',
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
  },
};

export default Dashboard;
