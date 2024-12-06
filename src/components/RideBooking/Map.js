import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

// Fix for the missing marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;

  .leaflet-container {
    height: 100%;
    width: 100%;
  }

  .leaflet-routing-container {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    width: 300px;
  }
`;

// Custom icons for pickup and destination
const pickupIcon = new L.Icon({
  iconUrl: "/pickup-marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const destinationIcon = new L.Icon({
  iconUrl: "/destination-marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Component to handle routing
function RoutingMachine({ pickup, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!pickup || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickup[0], pickup[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: "#000", weight: 4 }],
      },
      createMarker: () => null,
    }).addTo(map);

    const bounds = L.latLngBounds([pickup, destination]);
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => map.removeControl(routingControl);
  }, [map, pickup, destination]);

  return null;
}

function Map({ pickup, destination, onPickupSelect, onDestinationSelect }) {
  const [center] = useState([12.9716, 77.5946]); // Bangalore center

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    if (!pickup) {
      onPickupSelect([lat, lng]);
    } else if (!destination) {
      onDestinationSelect([lat, lng]);
    }
  };

  return (
    <MapWrapper>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {pickup && (
          <Marker position={pickup} icon={pickupIcon}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}

        {destination && (
          <Marker position={destination} icon={destinationIcon}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {pickup && destination && (
          <RoutingMachine pickup={pickup} destination={destination} />
        )}
      </MapContainer>
    </MapWrapper>
  );
}

export default Map;
