import styles from "../CountryList.module.css";
import Spinner from "../Spinner";
import CountryItem from "../CountryItem";
import Message from "../Message";

function CountriesList({ cities, isLoading }) {
  //   const countries = cities.reduce((array, city) => {
  //     if (!array.map((el) => el.city.includes(city.country))) {
  //       return [...array, { country: city.country, emoji: city.emoji }];
  //     } else {
  //       return array;
  //     }
  //   }, []);

  let countries = [];
  for (let city of cities) {
    let count = 0;
    for (let country of countries) {
      if (country.country !== city.country) {
        continue;
      } else {
        count++;
      }
    }
    if (count === 0) {
      countries.push(city);
    }
  }

  if (isLoading) {
    return <Spinner />;
  } else if (!cities.length) {
    return <Message message="No Countries Found" />;
  } else {
    return (
      <ul className={styles.countryList}>
        {countries.map((country) => {
          return <CountryItem country={country} key={country.id} />;
        })}
      </ul>
    );
  }
}

export default CountriesList;
