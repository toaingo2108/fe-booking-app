import "./searchItem.css";

const SearchItem = ({ property, group }) => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{property.title}</h1>
        <span className="siDistance">{group.title}</span>
        <span className="siTaxiOp">{group.type}</span>
        <span className="siSubtitle">
          {property.address.address}, {property.address.districtName},{" "}
          {property.address.provinceName}
        </span>
        <span className="siFeatures">
          {group.bedType} • {group.accommodations.length || 0} room •{" "}
          {group.accommodations?.map(
            (accommodation) => `|${accommodation.roomCode}|`
          )}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span></span>
          <button>{property.reviewCount.toFixed(1)}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${group.pricePerNight.toFixed(2)}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
