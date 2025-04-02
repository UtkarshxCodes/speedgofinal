"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const LocationMarker = ({ setPickup }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setPickup(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Your pickup location is set!</Popup>
    </Marker>
  );
};

const Map = ({ latitude = 23.2599, longitude = 77.4126, setPickup, rideStatus }) => {
  const [showMap, setShowMap] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="relative">
      {!showMap && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          {rideStatus === "started" ? (
            <video
              src="/videos/ride-loop.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/images/map-placeholder.jpg"
              alt="Map Placeholder"
              className="w-full h-full object-cover"
            />
          )}
          <button
            onClick={() => setShowMap(true)}
            className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded"
          >
            Show Map
          </button>
        </div>
      )}
      {showMap && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker setPickup={setPickup} />
        </MapContainer>
      )}
    </div>
  );
};

export default Map;