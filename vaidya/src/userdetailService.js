import axios from "axios";

class UserDetailService {
  saveUserDetials(userdetails) {
    return axios.post("http://localhost:8080/clone", userdetails);
  }

  validateUser(mobileNumber, password) {
    return axios.get(`http://localhost:8080/clone/${mobileNumber}/${password}`);
  }

  savePatientDetails(patientDetails) {
    return axios.post("http://localhost:8080/save_patient_details", patientDetails);
  }

  getAllUsers() {
    return axios.get("http://localhost:8080/clone2");
  }

  getUserById(id) {
    return axios.get(`http://localhost:8080/clone2/${id}`);
  }
  updateUser(id, data) {
    return axios.put(`http://localhost:8080/api/users/${id}`, data);
  }
  
}

export default new UserDetailService();
