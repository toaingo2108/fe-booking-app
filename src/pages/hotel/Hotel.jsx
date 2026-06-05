import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPropertyById } from "../../mocks/data";

const galleryFallback = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80",
];

const Hotel = () => {
  const { id } = useParams();
  const property = useMemo(() => getPropertyById(id), [id]);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const photos = useMemo(() => {
    return [property.image, ...galleryFallback].slice(0, 6).map((src) => ({ src }));
  }, [property.image]);

  const cheapestPrice = useMemo(() => {
    return Math.min(
      ...property.accommodationGroups.map((g) => g.pricePerNight),
    );
  }, [property.accommodationGroups]);

  const nights = 4;
  const totalPrice = cheapestPrice * nights;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    const last = photos.length - 1;
    const newSlideNumber =
      direction === "l"
        ? slideNumber === 0
          ? last
          : slideNumber - 1
        : slideNumber === last
          ? 0
          : slideNumber + 1;
    setSlideNumber(newSlideNumber);
  };

  const handleBookConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setBookingDone(true);
      toast.success(`Booking confirmed at ${property.title}!`);
    }, 900);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingDone(false);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}

        {bookingOpen && (
          <div className="bookingModal" onClick={closeBooking}>
            <div className="bookingCard" onClick={(e) => e.stopPropagation()}>
              <button className="bookingClose" onClick={closeBooking}>
                ✕
              </button>
              {bookingDone ? (
                <div className="bookingSuccess">
                  <FontAwesomeIcon icon={faCheckCircle} className="bookingSuccessIcon" />
                  <h2>Booking confirmed</h2>
                  <p>
                    Your stay at <strong>{property.title}</strong> is reserved.
                    A confirmation has been sent to your email.
                  </p>
                  <div className="bookingSummary">
                    <div>
                      <span>Reference</span>
                      <strong>BK-{Math.floor(Math.random() * 90000 + 10000)}</strong>
                    </div>
                    <div>
                      <span>Nights</span>
                      <strong>{nights}</strong>
                    </div>
                    <div>
                      <span>Total</span>
                      <strong>${totalPrice}</strong>
                    </div>
                  </div>
                  <button className="bookingCta" onClick={closeBooking}>
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h2>Reserve your stay</h2>
                  <p className="bookingSubtitle">{property.title}</p>
                  <div className="bookingRow">
                    <label>
                      <span>Full name</span>
                      <input type="text" placeholder="Ngô Quốc Toại" defaultValue="Ngô Quốc Toại" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input type="email" placeholder="you@example.com" defaultValue="guest@example.com" />
                    </label>
                  </div>
                  <div className="bookingRow">
                    <label>
                      <span>Check-in</span>
                      <input type="date" />
                    </label>
                    <label>
                      <span>Check-out</span>
                      <input type="date" />
                    </label>
                  </div>
                  <div className="bookingPriceLine">
                    <span>{nights} nights × ${cheapestPrice}</span>
                    <strong>${totalPrice}</strong>
                  </div>
                  <button
                    className="bookingCta"
                    onClick={handleBookConfirm}
                    disabled={submitting}
                  >
                    {submitting ? "Confirming..." : "Confirm booking"}
                  </button>
                  <p className="bookingNote">
                    Demo only — no payment is processed.
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="hotelWrapper">
          <button className="bookNow" onClick={() => setBookingOpen(true)}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{property.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              {property.address.address}, {property.address.districtName},{" "}
              {property.address.provinceName}
            </span>
          </div>
          <span className="hotelDistance">
            Excellent location — {property.distance}
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${cheapestPrice} at this property and get a free
            airport taxi.
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay at {property.title}</h1>
              <p className="hotelDesc">{property.description}</p>
              <p className="hotelDesc">
                Rated <strong>{property.score.toFixed(1)}</strong> by{" "}
                {property.reviewCount.toLocaleString()} verified guests, this
                property combines modern amenities with attentive service. The
                rooms feature comfortable bedding, fast WiFi, climate control,
                and bathrooms stocked with premium toiletries. Restaurants,
                rooftop bars, and a fitness center are on-site, with daily
                housekeeping and 24/7 concierge to make your stay seamless.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {nights}-night stay!</h1>
              <span>
                Top-rated in this area — guests gave it a score of{" "}
                {property.score.toFixed(1)} after their stay.
              </span>
              <h2>
                <b>${totalPrice}</b> ({nights} nights)
              </h2>
              <button onClick={() => setBookingOpen(true)}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
