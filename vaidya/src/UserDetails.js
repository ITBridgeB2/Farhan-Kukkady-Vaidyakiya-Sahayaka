import React, { useState, useEffect } from "react";
import UserDetailService from './userdetailService';
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    UserDetailService.getUserById(id)
      .then((response) => {
        setUser(response.data);
        setFormData(response.data); // initialize form with data
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]);

  const handleApprove = () => setStatus("Approved");

  const handleEditToggle = () => setEditMode(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    UserDetailService.updateUser(id, formData)
      .then(() => {
        setStatus("Updated successfully");
        setUser(formData);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Update failed", error);
        setStatus("Update failed");
      });
  };

  return (
    <div className="container mt-5">
      {user ? (
        <div>
          <h2>User Details</h2>
          <table className="table table-bordered">
            <tbody>
              {[
                ["Patient Name", "patient_name"],
                ["Phone Number", "phone_number"],
                ["Date of Birth", "date_of_birth"],
                ["Disease", "disease"],
                ["Hospital", "hospital"],
                ["Assistant Name", "assistant_name"],
                ["Assistant Phone", "assistant_phone"],
                ["Relationship to Patient", "relationship_to_patient"],
              ].map(([label, key]) => (
                <tr key={key}>
                  <th>{label}</th>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        name={key}
                        value={formData[key] || ""}
                        className="form-control"
                        onChange={handleChange}
                      />
                    ) : (
                      user[key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Action Buttons */}
          {!editMode ? (
            <div className="mt-3">
              <button className="btn btn-success me-2" onClick={handleApprove}>Approve</button>
              <button className="btn btn-warning" onClick={handleEditToggle}>Update</button>
            </div>
          ) : (
            <div className="mt-3">
              <button className="btn btn-primary me-2" onClick={handleUpdate}>Save Changes</button>
              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div className={`mt-4 fw-bold ${status.includes("success") ? "text-success" : "text-danger"}`}>
              {status}
            </div>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}
