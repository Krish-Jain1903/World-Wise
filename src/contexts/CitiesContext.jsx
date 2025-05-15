import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();
const initialState = { cities: [], isLoading: false, currentCity: {} };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "loadingComplete":
      return { ...state, isLoading: false };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "cities/get/currentCity":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    default:
      break;
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        alert("There was some Error");
      } finally {
        dispatch({ type: "loadingComplete" });
      }
    }
    fetchCities();
  }, []);

  // Usecallback for making this function stable

  const getCity = useCallback(
    async function getCity(id) {
      try {
        if (Number(id) === currentCity.id) return;
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "cities/get/currentCity", payload: data });
      } catch {
        alert("There was some Error");
      } finally {
        dispatch({ type: "loadingComplete" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      // THIS HOW TO PASS DATA TO API
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "cities/created", payload: data });
    } catch {
      alert("There was some Error");
    } finally {
      dispatch({ type: "loadingComplete" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      // THIS HOW TO PASS DATA TO API
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      alert("There was some Error");
    } finally {
      dispatch({ type: "loadingComplete" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        getCity: getCity,
        createCity: createCity,
        deleteCity: deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("Use Cities was used out of its Privider");
  }
  return context;
}

export { CitiesProvider, useCities };
