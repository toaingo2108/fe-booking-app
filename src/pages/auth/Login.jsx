import { useContext, useState } from "react";
import "./auth.css";
import { AuthContext } from "../../contexts/AuthContext";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosClient.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="lContainer">
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className="lInput"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="lButton">
          Login
        </button>
        <div>
          Do not have an account?
          <Link to="/register" style={{ marginLeft: "5px" }}>
            Sign up now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
