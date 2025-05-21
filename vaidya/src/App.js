import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import Welcome from './welcome';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute';  // Import ProtectedAdminRoute
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDashBoard from './PatientForm';
import About from './ContactUs';
import AdminDashboard from './Admin';
import Users from './Users';
import UserDetails from './UserDetails';
import Hospitals from './Hospitals';
import ManagerReports from './ManagerReports';
import UserReports from './UserReports';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loginStatus);
    };

    checkLoginStatus();

    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");  // Remove admin status upon logout
    window.dispatchEvent(new Event("loginStatusChanged"));
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <span className="navbar-brand fw-bold text-primary">Vaidyakiya Sahayaka</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus">Contact Us</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/welcome">User Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-danger ms-3">Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hospital' element={<Hospitals/>}></Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/aboutus' element={<About />} />

        <Route path='/welcome' element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } />

        {/* Admin routes protected */}
        <Route path='/admin' element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />
        <Route path='/admin/users' element={
          <ProtectedAdminRoute>
            <Users />
          </ProtectedAdminRoute>
        } />
        <Route path='/admin/user/:id' element={
          <ProtectedAdminRoute>
            <UserDetails />
          </ProtectedAdminRoute>
        } />

        <Route path='/userdashboard' element={<UserDashBoard />} />
       

<Route path="/admin/reports" element={<ProtectedRoute><ManagerReports /></ProtectedRoute>} />
<Route path="/user/reports" element={<ProtectedRoute><UserReports /></ProtectedRoute>} />


      </Routes>
    </div>
  );
}

export default App;
