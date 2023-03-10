/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const CarContext = createContext();
export default CarContext;
export function CarContextProvider({ children }) {
  // creating the states for the variables
  const [cars, setCars] = useState([]);

  /* `http://localhost:5000/cars?name=${name}&type=${type}$&CompanyName=${CompanyName}$&max_price=${max_price}$&min_price=${min_price}$` */
  const fetchCars = (object) => {
    let query = `http://localhost:5000/cars`;
    //   const { type, CompanyName, max_price, min_price, name } = object;n
    if (object?.carName !== undefined && object?.carName != "") {
      query += `?name=${object?.carName}`;
      if (object?.min_price !== undefined) {
        query += `&min_price=${object?.min_price}`;
      }
      if (object?.max_price !== undefined) {
        query += `&max_price=${object?.max_price}`;
      }
      if (object?.CompanyName !== undefined && object?.CompanyName !== "All") {
        query += `&CompanyName=${object?.CompanyName}`;
      }
      if (object?.type !== undefined && object?.type !== "All") {
        query += `&type=${object?.type}`;
      }
    }
    if (object?.min_price !== undefined && object?.carName === undefined) {
      query += `?min_price=${object?.min_price}`;

      if (object?.max_price !== undefined) {
        query += `&max_price=${object?.max_price}`;
      }
      if (object?.CompanyName !== undefined && object?.CompanyName !== "All") {
        query += `&CompanyName=${object?.CompanyName}`;
      }
      if (object?.type !== undefined && object?.type !== "All") {
        query += `&type=${object?.type}`;
      }
    }
    if (
      object?.max_price !== undefined &&
      object?.min_price === undefined &&
      object?.carName === undefined
    ) {
      query += `?max_price=${object?.max_price}`;
      if (object?.CompanyName !== undefined && object?.CompanyName !== "All") {
        query += `&CompanyName=${object?.CompanyName}`;
      }
      if (object?.type !== undefined && object?.type !== "All") {
        query += `&type=${object?.type}`;
      }
    }
    if (
      object?.CompanyName !== undefined &&
      object?.max_price === undefined &&
      object?.min_price === undefined &&
      object?.carName === undefined &&
      object?.CompanyName !== "All"
    ) {
      query += `?CompanyName=${object?.CompanyName}`;
    }
    if (
      object?.type !== undefined &&
      object?.CompanyName === undefined &&
      object?.max_price === undefined &&
      object?.min_price === undefined &&
      object?.carName === undefined &&
      object?.type !== "All"
    ) {
      query += `?type=${object?.type}`;
    }
    axios
      .get(query)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        // setUserNotFound(true);
        console.error("Error:", error);
      });
  };

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
