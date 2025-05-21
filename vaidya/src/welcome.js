import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/userdashboard");
  };
  const hospitalX=()=>{
    navigate("/hospital")
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome User</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {/* Card 1: Register a Patient */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Register a Patient</h5>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Update a Patient */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Update a Patient</h5>
              <button className="btn btn-warning" onClick={() => alert("Coming soon")}>Update</button>
              </div>
          </div>
        </div>

        {/* Card 3: View Reports */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Reports</h5>
              <button className="btn btn-info">View Reports</button>
            </div>
          </div>
        </div>

        {/* Card 4: Hospitals */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Hospitals</h5>
              <button className="btn btn-success" onClick={hospitalX}>View Hospitals</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
