import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const CustomMap = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (event) => {
    const { lat, lng } = event.latlng;
    setSelectedLocation({ lat, lng });
    onLocationSelect({ lat, lng });
    const modal = document.getElementById("my_modal_1");
    modal.close();
  };

  const LocationMarker = () => {
    useMapEvents({
      click: handleLocationSelect,
    });

    return selectedLocation ? (
      <Marker position={selectedLocation}></Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={[21.121365496, 21.121365496]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default CustomMap;
