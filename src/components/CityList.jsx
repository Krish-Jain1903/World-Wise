import styles from "../CityList.module.css";
import Spinner from "../Spinner";
import CityItem from "./CityItem";
import Message from "../Message";

function CityList({ cities, isLoading }) {
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
