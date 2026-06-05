import { useNavigate } from "react-router-dom";
import "./featured.css";

const cities = [
  {
    name: "Hồ Chí Minh",
    properties: 538,
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=900&q=80",
    provinceId: "p2",
  },
  {
    name: "Đà Nẵng",
    properties: 312,
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900&q=80",
    provinceId: "p3",
  },
  {
    name: "Hà Nội",
    properties: 421,
    image:
      "https://images.unsplash.com/photo-1509923936113-71fc3ad75876?w=900&q=80",
    provinceId: "p1",
  },
];

const Featured = () => {
  const navigate = useNavigate();

  const handleClick = (city) => {
    navigate("/hotels", {
      state: {
        province: city.name,
        provinceId: city.provinceId,
        district: "",
        districtId: "",
        date: [
          {
            startDate: new Date(),
            endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
            key: "selection",
          },
        ],
      },
    });
  };

  return (
    <div className="featured">
      {cities.map((city) => (
        <div
          key={city.name}
          className="featuredItem"
          onClick={() => handleClick(city)}
        >
          <img src={city.image} alt={city.name} className="featuredImg" />
          <div className="featuredTitles">
            <h1>{city.name}</h1>
            <h2>{city.properties} properties</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
