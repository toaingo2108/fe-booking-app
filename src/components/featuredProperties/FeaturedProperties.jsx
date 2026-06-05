import { useNavigate } from "react-router-dom";
import "./featuredProperties.css";

const items = [
  {
    id: "h1",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    name: "Lotte Hotel Hanoi",
    city: "Hà Nội",
    priceFrom: 168,
    score: 9.2,
    label: "Excellent",
  },
  {
    id: "h2",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    name: "Sofitel Saigon Plaza",
    city: "Hồ Chí Minh",
    priceFrom: 142,
    score: 9.0,
    label: "Excellent",
  },
  {
    id: "h3",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    name: "InterContinental Danang",
    city: "Đà Nẵng",
    priceFrom: 412,
    score: 9.5,
    label: "Exceptional",
  },
  {
    id: "h6",
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    name: "JW Marriott Phu Quoc",
    city: "Phú Quốc",
    priceFrom: 365,
    score: 9.3,
    label: "Exceptional",
  },
];

const FeaturedProperties = () => {
  const navigate = useNavigate();
  return (
    <div className="fp">
      {items.map((item) => (
        <div
          key={item.id}
          className="fpItem"
          onClick={() => navigate(`/hotels/${item.id}`)}
        >
          <img src={item.image} alt={item.name} className="fpImg" />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.priceFrom}</span>
          <div className="fpRating">
            <button>{item.score.toFixed(1)}</button>
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
