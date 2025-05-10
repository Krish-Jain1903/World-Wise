import styles from "../CityList.module.css";
import Spinner from "../Spinner";
import CityItem from "./CityItem";
import Message from "../Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  } else if (!cities.length) {
    return <Message message="No Cities Found" />;
  } else {
    return (
      <ul className={styles.cityList}>
        {cities.map((city) => {
          return <CityItem city={city} key={city.id} />;
        })}
      </ul>
    );
  }
}

export default CityList;
