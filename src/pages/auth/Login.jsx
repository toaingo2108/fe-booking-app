import { useContext, useState } from "react";
import "./auth.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "guest@example.com",
    password: "demo1234",
  });

  const { loading, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    dispatch({ type: "LOGIN_START" });

    setTimeout(() => {
      const mockToken = {
        authTokens: {
          accessToken: "mock-access-" + Math.random().toString(36).slice(2),
          refreshToken: "mock-refresh-" + Math.random().toString(36).slice(2),
        },
        user: {
          name: credentials.email.split("@")[0],
          email: credentials.email,
        },
      };

      dispatch({ type: "LOGIN_SUCCESS", payload: mockToken });
      toast.success(`Welcome back, ${mockToken.user.name}!`);
      navigate("/");
    }, 600);
  };

  return (
    <div className="authPage">
      <form onSubmit={handleSubmit} className="authCard">
        <h1 className="authTitle">Sign in to BookingApp</h1>
        <p className="authSubtitle">
          Demo mode — any email + password works.
        </p>
        <div className="lContainer">
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <button type="submit" disabled={loading} className="lButton">
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="authFoot">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="authLink">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
