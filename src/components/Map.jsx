/* eslint-disable no-unused-vars */
// import { useNavigate } from "react-router-dom";
import styles from "../Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeoLoacation";
import Button from "./Button";

function Map() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [mapPosition, setMapPosition] = useState([19.07283, 72.88261]);
  const { cities } = useCities();

  const {
    isLoading: isLoadingPosition,
    position: getGeolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      setMapPosition((mapPosition) =>
        lat === null ? mapPosition : [lat, lng]
      );
    },
    [lat, lng]
  );

  useEffect(
    function () {
      getGeolocationPosition &&
        setMapPosition([
          getGeolocationPosition["lat"],
          getGeolocationPosition["lng"],
        ]);
    },
    [getGeolocationPosition]
  );

  // const navigate = useNavigate();

  return (
    <div className={styles.mapContainer}>
      {!getGeolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loadong..." : "Use Your Positon"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={false}
        className={styles.map}
      >
        {/** This TileLayer will Have Different Style of Map Because of URL Change */}

        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>{city.cityName}</Popup>
            </Marker>
          );
        })}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// THIS IS USED FOR RERENDERING MAP COMPONENT WITH NEW POSITIONS IN LEAFLET
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

// THIS IS USED TO PERFORM ANY KIND OF EVENT ON MAP IN LEAFLET
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
