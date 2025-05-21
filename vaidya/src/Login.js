import { useState } from "react";
import userdetailService from "./userdetailService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginAsUser = (e) => {
    e.preventDefault();
    userdetailService
      .validateUser(formData.mobileNumber, formData.password)
      .then(() => {
        alert("User logged in successfully");
        localStorage.setItem("isLoggedIn", "true");
        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/Welcome");
      })
      .catch((error) => {
        console.log("Invalid user login:", error);
        alert("Invalid user credentials");
      });
  };

  const loginAsAdmin = (e) => {
    e.preventDefault();
    if (formData.mobileNumber === "admin" && formData.password === "admin123") {
      alert("Admin logged in successfully");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4 text-primary">Login</h2>
            <form>
              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  value={formData.mobileNumber}
                  name="mobileNumber"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                />
              </div>
              <div className="d-grid gap-2">
                <button onClick={loginAsUser} className="btn btn-success">
                  Login as User
                </button>
                <button onClick={loginAsAdmin} className="btn btn-primary">
                  Login as Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
