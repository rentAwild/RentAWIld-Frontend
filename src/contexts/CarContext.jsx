/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const CarContext = createContext();
export default CarContext;
export function CarContextProvider({ children }) {
  // creating the states for the variables
  const [cars, setCars] = useState([]);

  const fetchCars = () => {
    axios
      .get(`http://localhost:5000/cars`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        // setUserNotFound(true);
        console.error("Error:", error);
      });
  };
  // console.log(cars);
  // Loading the data on mounting
  useEffect(() => fetchCars, []);

  return (
    <CarContext.Provider
      value={{
        fetchCars,
        cars,
        setCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
