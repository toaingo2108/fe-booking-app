import { toast } from "react-toastify";
import "./propertyList.css";

const types = [
  {
    label: "Hotels",
    count: 1248,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
  },
  {
    label: "Apartments",
    count: 2331,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    label: "Resorts",
    count: 587,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
  },
  {
    label: "Villas",
    count: 412,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
  },
  {
    label: "Homestays",
    count: 893,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
  },
];

const PropertyList = () => {
  return (
    <div className="pList">
      {types.map((t) => (
        <div
          key={t.label}
          className="pListItem"
          onClick={() => toast.info(`Browsing ${t.label} — demo only.`)}
        >
          <img src={t.image} alt={t.label} className="pListImg" />
          <div className="pListTitles">
            <h1>{t.label}</h1>
            <h2>{t.count.toLocaleString()} stays</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
