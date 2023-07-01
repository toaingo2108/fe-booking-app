import { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useModalProperty } from "../../hooks/useModalProperty";

const Navbar = () => {
  const { token, dispatch } = useContext(AuthContext);
  const { openModal } = useModalProperty();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/logout", {
        refreshToken: token.authTokens.refreshToken,
      });
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">lamabooking</span>
        {token?.authTokens?.accessToken ? (
          <span>
            <Link className="navLink" to="#" onClick={() => openModal()}>
              add property
            </Link>
            <span>{token.user.name}</span>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </span>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="navButton" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
