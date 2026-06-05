// Mock data for portfolio demo (no backend required)

export const mockProvinces = [
  { _id: "p1", name: "Hà Nội" },
  { _id: "p2", name: "Hồ Chí Minh" },
  { _id: "p3", name: "Đà Nẵng" },
  { _id: "p4", name: "Nha Trang" },
  { _id: "p5", name: "Đà Lạt" },
  { _id: "p6", name: "Phú Quốc" },
  { _id: "p7", name: "Hội An" },
  { _id: "p8", name: "Sapa" },
];

export const mockDistrictsByProvince = {
  p1: [
    { _id: "d1-1", name: "Hoàn Kiếm" },
    { _id: "d1-2", name: "Ba Đình" },
    { _id: "d1-3", name: "Tây Hồ" },
    { _id: "d1-4", name: "Đống Đa" },
  ],
  p2: [
    { _id: "d2-1", name: "Quận 1" },
    { _id: "d2-2", name: "Quận 3" },
    { _id: "d2-3", name: "Quận 7" },
    { _id: "d2-4", name: "Bình Thạnh" },
  ],
  p3: [
    { _id: "d3-1", name: "Hải Châu" },
    { _id: "d3-2", name: "Sơn Trà" },
    { _id: "d3-3", name: "Ngũ Hành Sơn" },
  ],
  p4: [
    { _id: "d4-1", name: "Lộc Thọ" },
    { _id: "d4-2", name: "Vĩnh Hải" },
  ],
  p5: [
    { _id: "d5-1", name: "Phường 1" },
    { _id: "d5-2", name: "Phường 3" },
  ],
  p6: [
    { _id: "d6-1", name: "Dương Đông" },
    { _id: "d6-2", name: "An Thới" },
  ],
  p7: [
    { _id: "d7-1", name: "Cẩm Phô" },
    { _id: "d7-2", name: "Minh An" },
  ],
  p8: [
    { _id: "d8-1", name: "Sa Pả" },
    { _id: "d8-2", name: "Tả Phìn" },
  ],
};

const propertyImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
];

export const mockProperties = [
  {
    _id: "h1",
    title: "Lotte Hotel Hanoi",
    image: propertyImages[0],
    score: 9.2,
    reviewCount: 1248,
    address: {
      address: "54 Liễu Giai",
      districtName: "Ba Đình",
      provinceName: "Hà Nội",
    },
    distance: "Center 1.2 km",
    description:
      "Luxury 5-star hotel with panoramic city views, rooftop pool, and full-service spa.",
    accommodationGroups: [
      {
        title: "Deluxe King Room",
        type: "Free WiFi",
        bedType: "1 king bed",
        accommodations: [{ roomCode: "DK-101" }, { roomCode: "DK-102" }],
        pricePerNight: 168,
      },
      {
        title: "Executive Suite",
        type: "Breakfast included",
        bedType: "1 king bed + sofa",
        accommodations: [{ roomCode: "ES-301" }],
        pricePerNight: 245,
      },
    ],
  },
  {
    _id: "h2",
    title: "Sofitel Saigon Plaza",
    image: propertyImages[1],
    score: 9.0,
    reviewCount: 982,
    address: {
      address: "17 Lê Duẩn",
      districtName: "Quận 1",
      provinceName: "Hồ Chí Minh",
    },
    distance: "Center 0.6 km",
    description:
      "Iconic French hospitality in the heart of Saigon, with elegant rooms and acclaimed dining.",
    accommodationGroups: [
      {
        title: "Superior Room",
        type: "Free cancellation",
        bedType: "1 queen bed",
        accommodations: [{ roomCode: "S-201" }],
        pricePerNight: 142,
      },
    ],
  },
  {
    _id: "h3",
    title: "InterContinental Danang Sun Peninsula",
    image: propertyImages[2],
    score: 9.5,
    reviewCount: 2104,
    address: {
      address: "Bãi Bắc Sơn Trà",
      districtName: "Sơn Trà",
      provinceName: "Đà Nẵng",
    },
    distance: "Beach 0.2 km",
    description:
      "Iconic beachfront resort designed by Bill Bensley, with private beach and award-winning villas.",
    accommodationGroups: [
      {
        title: "Ocean View Villa",
        type: "Breakfast & dinner included",
        bedType: "1 king bed + living area",
        accommodations: [{ roomCode: "OV-15" }, { roomCode: "OV-16" }],
        pricePerNight: 412,
      },
    ],
  },
  {
    _id: "h4",
    title: "Mia Resort Nha Trang",
    image: propertyImages[3],
    score: 9.1,
    reviewCount: 1567,
    address: {
      address: "Bãi Dong, Cam Hải Đông",
      districtName: "Lộc Thọ",
      provinceName: "Nha Trang",
    },
    distance: "Beach 0.0 km",
    description:
      "Cliffside resort with private beach coves and quiet villas overlooking the South China Sea.",
    accommodationGroups: [
      {
        title: "Cliff Suite",
        type: "Free WiFi",
        bedType: "1 king bed",
        accommodations: [{ roomCode: "CL-08" }],
        pricePerNight: 220,
      },
    ],
  },
  {
    _id: "h5",
    title: "Ana Mandara Villas Dalat",
    image: propertyImages[4],
    score: 8.8,
    reviewCount: 642,
    address: {
      address: "Lê Lai",
      districtName: "Phường 3",
      provinceName: "Đà Lạt",
    },
    distance: "Center 1.5 km",
    description:
      "Restored colonial French villas spread across a pine-covered hillside.",
    accommodationGroups: [
      {
        title: "Garden Villa Room",
        type: "Breakfast included",
        bedType: "1 queen bed",
        accommodations: [{ roomCode: "GV-3" }],
        pricePerNight: 138,
      },
    ],
  },
  {
    _id: "h6",
    title: "JW Marriott Phu Quoc Emerald Bay",
    image: propertyImages[5],
    score: 9.3,
    reviewCount: 1893,
    address: {
      address: "Bãi Khem, An Thới",
      districtName: "An Thới",
      provinceName: "Phú Quốc",
    },
    distance: "Beach 0.0 km",
    description:
      "Whimsical Bill Bensley resort styled as a French colonial university campus.",
    accommodationGroups: [
      {
        title: "Emerald Bay Suite",
        type: "All-inclusive available",
        bedType: "1 king bed + balcony",
        accommodations: [{ roomCode: "EB-12" }, { roomCode: "EB-13" }],
        pricePerNight: 365,
      },
    ],
  },
  {
    _id: "h7",
    title: "Anantara Hoi An Resort",
    image: propertyImages[6],
    score: 9.0,
    reviewCount: 1102,
    address: {
      address: "1 Phạm Hồng Thái",
      districtName: "Minh An",
      provinceName: "Hội An",
    },
    distance: "Old Town 0.4 km",
    description:
      "Riverside resort minutes from the lantern-lit ancient town, with colonial-style rooms.",
    accommodationGroups: [
      {
        title: "Premier Balcony Room",
        type: "Free cancellation",
        bedType: "1 king bed",
        accommodations: [{ roomCode: "PB-22" }],
        pricePerNight: 198,
      },
    ],
  },
  {
    _id: "h8",
    title: "Topas Ecolodge Sapa",
    image: propertyImages[7],
    score: 9.4,
    reviewCount: 873,
    address: {
      address: "Thanh Kim",
      districtName: "Tả Phìn",
      provinceName: "Sapa",
    },
    distance: "Center 18 km",
    description:
      "Eco-friendly bungalows perched on a mountain ridge with infinity pool overlooking rice terraces.",
    accommodationGroups: [
      {
        title: "View Bungalow",
        type: "Breakfast included",
        bedType: "1 queen bed",
        accommodations: [{ roomCode: "VB-04" }],
        pricePerNight: 175,
      },
    ],
  },
];

export function getPropertiesByFilter({ provinceId, districtId }) {
  const province = mockProvinces.find((p) => p._id === provinceId);
  const districts = mockDistrictsByProvince[provinceId] || [];
  const district = districts.find((d) => d._id === districtId);

  return mockProperties.filter((p) => {
    if (province && p.address.provinceName !== province.name) return false;
    if (district && p.address.districtName !== district.name) return false;
    return true;
  });
}

export function getPropertyById(id) {
  return mockProperties.find((p) => p._id === id) || mockProperties[0];
}
