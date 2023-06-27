import { useContext, useState } from "react";
import "./auth.css";
import { AuthContext } from "../../contexts/AuthContext";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";
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

  const { token, loading, error, dispatch } = useContext(AuthContext);

  const {
    data: { provinces },
  } = useFetch("/divisions/p");

  const {
    data: { districts },
  } = useFetch(`divisions/d?provinceCode=${+credentials.address.province}`);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeAddress = (e) => {
    setCredentials((prev) => ({
      ...prev,
      address: { ...prev.address, [e.target.id]: e.target.value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axiosClient.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="lContainer">
          <div>
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="tel"
              placeholder="Tel"
              id="phoneNumber"
              onChange={handleChange}
              className="lInput"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="lInput"
              required
            />
          </div>
          <div>
            <select
              placeholder="Province"
              id="province"
              onChange={handleChangeAddress}
              className="lInput"
            >
              {provinces?.map((province) => (
                <option key={province._id} value={province._id}>
                  {province.name}
                </option>
              ))}
            </select>
            <select
              placeholder="District"
              id="district"
              onChange={handleChangeAddress}
              className="lInput"
            >
              {districts?.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address"
              id="address"
              onChange={handleChangeAddress}
              className="lInput"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="lButton">
          Sign up
        </button>
        <div>
          Do you already have an account?
          <Link to="/login" style={{ marginLeft: "5px" }}>
            Login in now
          </Link>
        </div>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default Register;
