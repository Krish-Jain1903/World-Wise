import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position Lat :- {lat} and Lng :- {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 100, lng: 100 })}>
        Change Position
      </button>
    </div>
  );
}

export default Map;
