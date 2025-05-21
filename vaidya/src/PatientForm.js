import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import userdetailService from "./userdetailService";

class UserDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: '',
      phoneNumber: '',
      dateOfBirth: '',
      selectedDisease: '',
      diseases: ["Heart Attack", "Asthma", "Diabetes", "Stroke", "Cancer"],
      hospitals: {
        "Heart Attack": ["Jayadeva Hospital", "Victoria Hospital", "Kempegowda Institute of Medical Sciences"],
        "Asthma": ["Rajiv Gandhi Institute of Chest Diseases", "Victoria Hospital", "Bowring and Lady Curzon Hospital"],
        "Diabetes": ["Vikram Hospital", "Bangalore Medical College and Research Institute", "Chigateri General Hospital"],
        "Stroke": ["Rajiv Gandhi Institute of Chest Diseases", "Victoria Hospital", "Vikram Hospital"],
        "Cancer": ["NIMHANS", "Bangalore Medical College and Research Institute", "Rajiv Gandhi Institute of Chest Diseases"]
      },
      assistantName: '',
      assistantPhone: '',
      relationshipToPatient: '',
      bplCardStatus: '',
      patientDetailsSaved: null,
      isEditMode: false, // This will toggle between view/edit modes
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDiseaseChange = (e) => {
    this.setState({ selectedDisease: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
  
    const {
      patientName,
      phoneNumber,
      dateOfBirth,
      selectedDisease,
      bplCardStatus,
      assistantName,
      assistantPhone,
      relationshipToPatient
    } = this.state;
  
    // You also need to pass a selected hospital
    const selectedHospital = this.state.hospitals[selectedDisease]?.[0] || "";
  
    const patientDetails = {
      patientName,
      pNumber: phoneNumber,
      dateOfBirth,
      disease: selectedDisease,
      hospital: selectedHospital,
      hasBplCard: bplCardStatus === "yes" ? 1 : 0,
      assistantName,
      assistantPhone,
      relationshipToPatient
    };
  
    try {
      const response = await userdetailService.savePatientDetails(patientDetails);
      console.log("Saved:", response.data);
      this.setState({
        patientDetailsSaved: patientDetails,
        isEditMode: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  handleEdit = () => {
    // Switch to edit mode and load saved patient details into the form
    this.setState({
      isEditMode: true,
      patientName: this.state.patientDetailsSaved.patientName,
      phoneNumber: this.state.patientDetailsSaved.pNumber,
      dateOfBirth: this.state.patientDetailsSaved.dateOfBirth,
      selectedDisease: this.state.patientDetailsSaved.disease,
      bplCardStatus: this.state.patientDetailsSaved.hasBplCard === 1 ? "yes" : "no",
      assistantName: this.state.patientDetailsSaved.assistantName,
      assistantPhone: this.state.patientDetailsSaved.assistantPhone,
      relationshipToPatient: this.state.patientDetailsSaved.relationshipToPatient,
    });
  }

  render() {
    const { patientName, phoneNumber, dateOfBirth, selectedDisease, diseases, hospitals, assistantName, assistantPhone, relationshipToPatient, bplCardStatus, patientDetailsSaved, isEditMode } = this.state;

    return (
      <div className="container mt-4 p-4 bg-light rounded shadow">
        <h3 className="text-center mb-4 text-primary">Patient Registration</h3>
        
        {!isEditMode && patientDetailsSaved ? (
          <div className="mb-4">
            <h5 className="text-success">Patient Details Saved</h5>
            <ul>
              <li><strong>Patient Name:</strong> {patientDetailsSaved.patientName}</li>
              <li><strong>Phone Number:</strong> {patientDetailsSaved.pNumber}</li>
              <li><strong>Date of Birth:</strong> {patientDetailsSaved.dateOfBirth}</li>
              <li><strong>Disease:</strong> {patientDetailsSaved.disease}</li>
              <li><strong>Hospital:</strong> {patientDetailsSaved.hospital}</li>
              <li><strong>Has BPL Card:</strong> {patientDetailsSaved.hasBplCard === 1 ? "Yes" : "No"}</li>
              <li><strong>Assistant Name:</strong> {patientDetailsSaved.assistantName}</li>
              <li><strong>Assistant Phone:</strong> {patientDetailsSaved.assistantPhone}</li>
              <li><strong>Relationship to Patient:</strong> {patientDetailsSaved.relationshipToPatient}</li>
            </ul>
            {/* <button className="btn btn-warning" onClick={this.handleEdit}>Edit Details</button> */}
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Patient Name</label>
              <input
                type="text"
                className="form-control"
                name="patientName"
                value={patientName}
                onChange={this.handleInputChange}
                placeholder="Patient Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleInputChange}
                placeholder="Patient Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Disease</label>
              <select
                className="form-select"
                onChange={this.handleDiseaseChange}
                value={selectedDisease}
              >
                <option value="">-- Select Disease --</option>
                {diseases.map((disease) => (
                  <option key={disease} value={disease}>{disease}</option>
                ))}
              </select>
            </div>

            {selectedDisease && (
              <div className="mb-3">
                <label className="form-label">Hospitals treating {selectedDisease}</label>
                <select className="form-select">
                  {hospitals[selectedDisease].map((hospital) => (
                    <option key={hospital}>{hospital}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Do you have a BPL card?</label>
              <select
                className="form-select"
                name="bplCardStatus"
                value={bplCardStatus}
                onChange={this.handleInputChange}
              >
                <option value="" disabled>-- Select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <hr />
            <h5 className="text-secondary mb-3">Assistant Details</h5>

            <div className="mb-3">
              <label className="form-label">Assistant Name</label>
              <input
                type="text"
                className="form-control"
                name="assistantName"
                value={assistantName}
                onChange={this.handleInputChange}
                placeholder="Assistant Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Assistant Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="assistantPhone"
                value={assistantPhone}
                onChange={this.handleInputChange}
                placeholder="Assistant Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Relationship to Patient</label>
              <input
                type="text"
                className="form-control"
                name="relationshipToPatient"
                value={relationshipToPatient}
                onChange={this.handleInputChange}
                placeholder="e.g., Son, Daughter"
              />
            </div>

            <button className="btn btn-primary mt-3" type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default UserDashBoard;
