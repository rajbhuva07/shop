import React from "react";
import GoogleMapReact from "google-map-react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import '../assert/css/svg.css';

// import "./map.css";

const Map = () => {
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };

  const LocationPin = ({ text, lat, lng }) => (
    <div className="pin">
     <FaLocationCrosshairs />
      <p className="pin-text">{text}</p>
    </div>
  );

  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAEKXIE54WnL96aA4qln5bEzU3uOGKqhyo" }}
          defaultCenter={{ lat: location.lat, lng: location.lng }}
          defaultZoom={17}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;