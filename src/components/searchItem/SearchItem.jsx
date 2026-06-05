import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ property, group }) => {
  const navigate = useNavigate();

  return (
    <div className="searchItem">
      <img
        src={property.image}
        alt={property.title}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{property.title}</h1>
        <span className="siDistance">{property.distance}</span>
        <span className="siTaxiOp">{group.type}</span>
        <span className="siSubtitle">
          {property.address.address}, {property.address.districtName},{" "}
          {property.address.provinceName}
        </span>
        <span className="siFeatures">
          {group.bedType} • {group.accommodations.length || 0} room
          {group.accommodations.length === 1 ? "" : "s"} available
        </span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today.
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>
            {property.score ? property.score.toFixed(1) : (0).toFixed(1)}
          </button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${group.pricePerNight.toFixed(0)}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button
            className="siCheckButton"
            onClick={() => navigate(`/hotels/${property._id}`)}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
