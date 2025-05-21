import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };
  const handleX=()=>{
    navigate("/hospital")
  }

  const cardStyle = {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: '10px',
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Admin Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div
            className="bg-primary shadow"
            style={cardStyle}
            onClick={() => handleCardClick('/admin/users')}
          >
            Users
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="bg-success shadow"
            style={cardStyle}
            onClick={() => handleCardClick('/admin/reports')}
          >
            Reports
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="bg-warning shadow"
            style={cardStyle}
            onClick={() => handleCardClick('/admin/requests')}
          >
            Requests
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="bg-danger shadow"
            style={cardStyle}
            onClick={handleX}
          >
            Hospitals
          </div>
        </div>
      </div>
    </div>
  );
}
