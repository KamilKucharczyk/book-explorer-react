import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NotFound = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    isLoggedIn ? navigate("/books") : navigate("/login");
  };

  return (
    <div>
      <h1>404 - Page not found</h1>
      <button type="button" onClick={handleClick}>
        Go Back
      </button>
    </div>
  );
};
export default NotFound;
