import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
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

const Header = ({ type }) => {
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
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
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
