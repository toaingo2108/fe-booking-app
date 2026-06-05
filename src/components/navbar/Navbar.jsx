import { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useModalProperty } from "../../hooks/useModalProperty";
import { toast } from "react-toastify";

const Navbar = () => {
  const { token, dispatch } = useContext(AuthContext);
  const { openModal } = useModalProperty();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    toast.info("Signed out.");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={() => navigate("/")}>
          bookingapp
        </span>
        {token?.authTokens?.accessToken ? (
          <span>
            {pathname === "/" && (
              <Link className="navLink" to="#" onClick={() => openModal()}>
                add property
              </Link>
            )}
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
