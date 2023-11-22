import React from 'react';
import './AdminDashboard.css'; 

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <WelcomeMessage />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Tea Rooms</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="/logout">Log Out</a></li>
      </ul>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <a href="/logout">Log Out</a>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="welcome-message">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Manage your tea rooms effectively.</p>
    </div>
  );
}

export default AdminDashboard;
