import React, { useState } from "react";
import axios from "axios";
import Map from "../../components/Map/Map";
import "mapbox-gl/dist/mapbox-gl.css";

const ParcelBooking = () => {
  const [formData, setFormData] = useState({
    // ... other form fields
    latitude: "",
    longitude: "",
  });

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      latitude: location.lat.toFixed(6),
      longitude: location.lng.toFixed(6),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API
      await axios.post("http://localhost:3001/api/bookParcel", formData);

      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      // Handle error, e.g., show an error message
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <form onSubmit={handleSubmit}>
                {/* ... other form fields */}
                <label>
                  Delivery Address Latitude:
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    readOnly
                  />
                </label>

                <label>
                  Delivery Address Longitude:
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    readOnly
                  />
                </label>

                <Map />

                <button type="submit">Book</button>
              </form>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ParcelBooking;
