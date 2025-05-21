import React from 'react';
import { Card } from 'react-bootstrap';

export default function ManagerReports() {
  return (
    <div className="container mt-5">
      <h2 className="text-primary text-center mb-4">Manager Reports</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Patients Registered</Card.Title>
              <Card.Text>325</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Most Common Disease</Card.Title>
              <Card.Text>Diabetes</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Top Hospital</Card.Title>
              <Card.Text>Victoria Hospital</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Approval Summary</Card.Title>
              <Card.Text>Approved: 290 | Rejected: 35</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
