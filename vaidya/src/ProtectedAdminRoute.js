// ProtectedAdminRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Assuming you're storing admin status

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
