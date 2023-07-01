import "./create-property.css";
import Modal from "react-modal";
import { useModalProperty } from "../../hooks/useModalProperty";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosClient from "../../axiosClient";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
};

Modal.setAppElement("#root");

const newAccommodation = {
  title: "",
  pricePerNight: 0,
  type: "",
  bedType: "",
  accommodations: "",
};

const CreateProperty = () => {
  const { isOpen, closeModal } = useModalProperty();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    pageName: "",
    address: {
      address: "",
      district: "",
      province: "",
    },
    accommodationGroups: [],
  });

  const [accommodation, setAccommodation] = useState(newAccommodation);

  const {
    data: { provinces },
  } = useFetch("/divisions/p");

  const {
    data: { districts },
  } = useFetch(`divisions/d?provinceId=${formData.address.province}`);

  const handleChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeAddress = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  const handleChangeAccommodation = (e) => {
    setAccommodation({
      ...accommodation,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewAccommodation = (e) => {
    e.preventDefault();
    const tempAccommodation = { ...accommodation };
    tempAccommodation.accommodations = tempAccommodation.accommodations
      ? tempAccommodation.accommodations
          ?.split(",")
          ?.map((item) => ({ roomCode: item }))
      : [];
    formData.accommodationGroups.push(tempAccommodation);
    setAccommodation(newAccommodation);
    setFormData({ ...formData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.post("/properties", formData);
      closeModal();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Property Modal"
        preventScroll={true}
      >
        <div
          style={{
            maxHeight: "85vh",
            overflowY: "scroll",
            paddingRight: "20px",
          }}
        >
          <div className="modal-header">
            <h2>Add Property</h2>
            <button className="close-button" onClick={closeModal}>
              x
            </button>
          </div>
          <form
            id="form-property"
            className="modal-form"
            onSubmit={handleSubmit}
          >
            <section>
              <label htmlFor="ftitle">Title</label>
              <input
                type="text"
                id="ftitle"
                name="title"
                placeholder="ex: Full House"
                className="modal-input"
                required
                onChange={handleChangeText}
              />
            </section>

            <section>
              <label htmlFor="fpageName">Page name</label>
              <input
                type="text"
                id="fpageName"
                name="pageName"
                placeholder="ex: full-house-3"
                className="modal-input"
                required
                onChange={handleChangeText}
              />
            </section>

            <section>
              <label htmlFor="fprovince">Address</label>
              <select
                placeholder="Province"
                id="fprovince"
                name="province"
                onChange={handleChangeAddress}
                className="modal-input"
                required
              >
                <option value="">-- Province --</option>
                {provinces?.map((province) => (
                  <option key={province._id} value={province._id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <select
                placeholder="District"
                name="district"
                onChange={handleChangeAddress}
                required
                className="modal-input"
              >
                <option value="">-- District --</option>
                {formData.address.province &&
                  districts?.map((district) => (
                    <option key={district._id} value={district._id}>
                      {district.name}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleChangeAddress}
                className="modal-input"
                required
              />
            </section>

            <section className="accommodation-group">
              {formData.accommodationGroups.map((item, index) => (
                <div key={index} className="accommodation">
                  <p>
                    Title ({index}): {item.title}
                  </p>
                  <p>Price: {item.pricePerNight}$ / night</p>
                  <p>Room type: {item.type}</p>
                  <p>Bed type: {item.bedType}</p>
                  <p>
                    Accommodations:{" "}
                    {item.accommodations?.map((item) => (
                      <span key={`${item.roomCode} ${index}`}>
                        [{item.roomCode}]
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </section>
          </form>
          <form
            id="accommodation"
            style={{
              marginTop: "20px",
            }}
            onSubmit={handleAddNewAccommodation}
          >
            <section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="faccommodation">New Accommodation</label>
                <button type="submit" className="button-add-accommodation">
                  add
                </button>
              </div>
              <input
                type="text"
                id="faccommodation"
                name="title"
                placeholder="ex: Standard Room"
                className="modal-input"
                value={accommodation.title}
                onChange={handleChangeAccommodation}
                required
              />
              <input
                type="number"
                id="faccommodation"
                name="pricePerNight"
                placeholder="$"
                className="modal-input"
                value={accommodation.pricePerNight}
                onChange={handleChangeAccommodation}
                required
              />
              <select
                placeholder="Room Type"
                id="froomtype"
                name="type"
                value={accommodation.type}
                onChange={handleChangeAccommodation}
                className="modal-input"
                required
              >
                <option value="">-- Room Type --</option>
                <option value="specific-room">Specific</option>
              </select>
              <select
                placeholder="Bed Type"
                id="fbedtype"
                name="bedType"
                value={accommodation.bedType}
                onChange={handleChangeAccommodation}
                className="modal-input"
                required
              >
                <option value="">-- Bed Type --</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Single Bed">Single Bed</option>
                <option value="Sofa">Sofa</option>
              </select>
              <input
                type="text"
                id="froomcode"
                name="accommodations"
                placeholder="A101,A102,..."
                className="modal-input"
                required
                value={accommodation.accommodations}
                onChange={handleChangeAccommodation}
              />
            </section>
          </form>

          <input
            form="form-property"
            className="modal-input"
            type="submit"
            value="Submit"
            disabled={loading}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateProperty;
