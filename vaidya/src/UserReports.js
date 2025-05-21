import React from 'react';
import { Table } from 'react-bootstrap';

export default function UserReports() {
  const userPatients = [
    { name: "Anil Kumar", disease: "Asthma", hospital: "Victoria Hospital", status: "Approved" },
    { name: "Rekha Devi", disease: "Stroke", hospital: "Vikram Hospital", status: "Pending" },
    { name: "Raju", disease: "Cancer", hospital: "NIMHANS", status: "Rejected" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-primary text-center mb-4">My Patient Reports</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Disease</th>
            <th>Hospital</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userPatients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.disease}</td>
              <td>{patient.hospital}</td>
              <td>
                <span className={`badge bg-${patient.status === 'Approved' ? 'success' : patient.status === 'Rejected' ? 'danger' : 'warning text-dark'}`}>
                  {patient.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
