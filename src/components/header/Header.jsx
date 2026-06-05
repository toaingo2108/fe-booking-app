import {
  faBed,
  faCalendarDays,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const categories = [
  { key: "stays", label: "Stays", icon: faBed },
  { key: "flights", label: "Flights", icon: faPlane },
  { key: "cars", label: "Car rentals", icon: faCar },
  { key: "attractions", label: "Attractions", icon: faBed },
  { key: "taxis", label: "Airport taxis", icon: faTaxi },
];

const Header = ({ type }) => {
  const [activeCategory, setActiveCategory] = useState("stays");
  const [district, setDistrict] = useState({
    label: "",
    value: "",
  });
  const [province, setProvince] = useState({
    label: "",
    value: "",
  });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleCategoryClick = (cat) => {
    if (cat.key === "stays") {
      setActiveCategory("stays");
      return;
    }
    toast.info(`${cat.label} is a demo placeholder — only Stays is active.`);
  };

  const {
    data: { provinces },
    loading: provinceLoading,
  } = useFetch("divisions/p");

  const {
    data: { districts },
    loading: districtLoading,
  } = useFetch(
    `divisions/d?provinceId=${
      province?.value || provinces?.[0]?._id
    }`
  );
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels", {
      state: {
        province: province.label,
        provinceId: province.value,
        district: district.label,
        districtId: district.value,
        date,
      },
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list"
            ? "headerContainer listMode"
            : "headerContainer"
        }
      >
        <div className="headerList">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className={`headerListItem ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
              role="button"
              tabIndex={0}
            >
              <FontAwesomeIcon icon={cat.icon} />
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant
              savings of 10% or more with a free Lamabooking
              account
            </p>
            {!token?.authTokens?.accessToken && (
              <button
                className="headerBtn"
                onClick={() => navigate("/register")}
              >
                Sign in / Register
              </button>
            )}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faBed}
                  className="headerIcon"
                />
                <Select
                  className="basic-single select-custom"
                  classNamePrefix="select"
                  isLoading={provinceLoading}
                  value={province}
                  isClearable
                  isSearchable
                  options={
                    provinces?.map((p) => ({
                      label: p.name,
                      value: p._id,
                    })) || []
                  }
                  onChange={(province) => {
                    setProvince(province);
                    setDistrict({ label: "", value: "" });
                  }}
                />
                <Select
                  className="basic-single select-custom"
                  classNamePrefix="select"
                  isLoading={districtLoading}
                  value={district}
                  isClearable
                  isSearchable
                  options={
                    districts?.map((p) => ({
                      label: p.name,
                      value: p._id,
                    })) || []
                  }
                  onChange={(district) =>
                    setDistrict(district)
                  }
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerIcon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(
                  date[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) =>
                      setDate([item.selection])
                    }
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerBtn"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
