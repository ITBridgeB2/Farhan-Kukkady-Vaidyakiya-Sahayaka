import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: '100vh', backgroundColor: '#f8f9fa', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="display-4 fw-bold text-primary mb-3">Vaidyakiya Sahayaka</h1>
        <p className="lead mb-4">
          Connecting patients in need with affordable government healthcare
        </p>

        {/* Only show buttons if NOT logged in */}
        {!isLoggedIn && (
          <div className="mb-4">
            <button onClick={handleLogin} className="btn btn-primary me-3 px-4">Login</button>
            <button onClick={handleRegister} className="btn btn-outline-primary px-4">Register</button>
          </div>
        )}

        <div className="bg-white rounded shadow p-4 text-start">
          <h3 className="text-primary">Our Mission</h3>
          <p>To ensure every patient gets access to necessary medical care without financial or logistical hurdles.</p>

          <h3 className="text-primary mt-3">Our Vision</h3>
          <p>A connected and transparent healthcare support system accessible to everyone, especially the underprivileged.</p>

          <h3 className="text-primary mt-3">What We Offer</h3>
          <ul>
            <li>✔ Simple and secure health support platform</li>
            <li>✔ Personalized assistance for those in medical need</li>
            <li>✔ Information on nearby hospitals and resources</li>
            <li>✔ A trusted bridge between patients and help providers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
