import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <Link to="/dashboard/portfolio" className="dashboard-card">
          <h2>Portfolio Builder</h2>
          <p>Edit your portfolio settings</p>
        </Link>
        <Link to="/dashboard/case-studies" className="dashboard-card">
          <h2>Case Studies</h2>
          <p>Manage your case studies</p>
        </Link>
        <Link to="/dashboard/analytics" className="dashboard-card">
          <h2>Analytics</h2>
          <p>View your portfolio stats</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
