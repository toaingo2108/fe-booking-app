import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Select from "react-select";

const List = () => {
  const location = useLocation();
  const [province, setProvince] = useState(
    location.state.province
  );
  const [provinceId, setProvinceId] = useState(
    location.state.provinceId
  );
  const [district, setDistrict] = useState(
    location.state.district
  );
  const [districtId, setDistrictId] = useState(
    location.state.districtId
  );
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);

  const {
    data: { provinces },
    loading: provinceLoading,
  } = useFetch("divisions/p");
  const {
    data: { districts },
    loading: districtLoading,
  } = useFetch(
    `divisions/d?provinceId=${
      provinceId || provinces?.[0]?._id
    }`
  );

  console.log(location.state);

  const {
    data: { properties },
    reFetch,
    error,
  } = useFetch(
    `/properties?provinceId=${provinceId}${
      !!districtId ? `&districtId=${districtId}` : ""
    }&bookInDate=${date[0].startDate.toISOString()}&bookOutDate=${date[0].endDate.toISOString()}`
  );

  const handleClick = () => {
    reFetch();
  };

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);
    }
  }, [error]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Province</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isLoading={provinceLoading}
                defaultValue={{
                  value: provinceId,
                  label: province,
                }}
                value={{ label: province, value: province }}
                isClearable
                isSearchable
                options={
                  provinces?.map((p) => ({
                    label: p.name,
                    value: p._id,
                  })) || []
                }
                onChange={(p) => {
                  setProvince(p.label);
                  setProvinceId(p.value);
                  setDistrict("");
                  setDistrictId("");
                }}
              />
            </div>
            <div className="lsItem">
              <label>district</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isLoading={districtLoading}
                defaultValue={{
                  value: districtId,
                  label: district,
                }}
                value={{ label: district, value: district }}
                isClearable
                isSearchable
                options={
                  districts?.map((d) => ({
                    label: d.name,
                    value: d._id,
                  })) || []
                }
                onChange={(d) => {
                  setDistrict(d.label);
                  setDistrictId(d.value);
                }}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
              >{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) =>
                    setDate([item.selection])
                  }
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            {/* <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult
                  </span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div> */}
            <button onClick={() => handleClick()}>
              Search
            </button>
          </div>
          <div className="listResult">
            {properties?.map((property) => (
              <React.Fragment key={property._id}>
                {property?.accommodationGroups?.map(
                  (group, index) => (
                    <SearchItem
                      key={`${property._id} ${index}`}
                      property={property}
                      group={group}
                    />
                  )
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
