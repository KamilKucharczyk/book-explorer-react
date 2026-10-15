import useAuth from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/books");
    console.log("Login success");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};
export default Login;
