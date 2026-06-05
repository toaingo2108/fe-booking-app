import { useContext, useState } from "react";
import "./auth.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: {
      address: "",
      district: "",
      province: "",
    },
  });

  const { loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: { provinces },
  } = useFetch("divisions/p");

  const {
    data: { districts },
  } = useFetch(
    `divisions/d?provinceId=${
      credentials.address.province || provinces?.[0]?._id || ""
    }`,
  );

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeAddress = (e) => {
    setCredentials((prev) => ({
      ...prev,
      address: { ...prev.address, [e.target.id]: e.target.value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.name || !credentials.email || !credentials.password) {
      toast.error("Please fill in your name, email, and password.");
      return;
    }

    dispatch({ type: "REGISTER_START" });

    setTimeout(() => {
      const mockToken = {
        authTokens: {
          accessToken: "mock-access-" + Math.random().toString(36).slice(2),
          refreshToken: "mock-refresh-" + Math.random().toString(36).slice(2),
        },
        user: {
          name: credentials.name,
          email: credentials.email,
          phoneNumber: credentials.phoneNumber,
        },
      };

      dispatch({ type: "REGISTER_SUCCESS", payload: mockToken });
      toast.success(`Welcome, ${credentials.name}! Account created.`);
      navigate("/");
    }, 700);
  };

  return (
    <div className="authPage">
      <form onSubmit={handleSubmit} className="authCard authCardWide">
        <h1 className="authTitle">Create your account</h1>
        <p className="authSubtitle">Demo mode — no real data is stored.</p>
        <div className="lContainer">
          <div className="lRow">
            <input
              type="text"
              placeholder="Full name"
              id="name"
              value={credentials.name}
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              id="phoneNumber"
              value={credentials.phoneNumber}
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="lRow">
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="lInput"
              required
            />
          </div>
          <div className="lRow">
            <select
              id="province"
              onChange={handleChangeAddress}
              className="lInput"
              value={credentials.address.province}
            >
              <option value="">Province</option>
              {provinces?.map((province) => (
                <option key={province._id} value={province._id}>
                  {province.name}
                </option>
              ))}
            </select>
            <select
              id="district"
              onChange={handleChangeAddress}
              className="lInput"
              value={credentials.address.district}
            >
              <option value="">District</option>
              {districts?.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Address (street, ward...)"
            id="address"
            value={credentials.address.address}
            onChange={handleChangeAddress}
            className="lInput"
          />
        </div>
        <button type="submit" disabled={loading} className="lButton">
          {loading ? "Creating account..." : "Sign up"}
        </button>
        <p className="authFoot">
          Already have an account?{" "}
          <Link to="/login" className="authLink">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
