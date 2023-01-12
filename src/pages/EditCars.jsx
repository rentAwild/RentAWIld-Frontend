/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./EditCars.css";
import CarContext from "../contexts/CarContext";

function EditCars() {
  // TODO This component should recieve the carId from the carCard when clicked
  const { cars } = useContext(CarContext);

  const [kilometersOld, setKilometersOld] = useState(0);
  const [kilometersAdd, setKilometersAdd] = useState(0);
  const [kilometersNow, setKilometersNow] = useState(0);

  const carId = 1;

  // * Function to get old kilometers of car # ========== #
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars/${carId}`)
      .then((response) => setKilometersOld(response.data[0].kilometer));
  }, []);

  const updateCarKilometers = (e) => {
    setKilometersAdd(parseInt(e.target.value));
    if (kilometersAdd !== null || kilometersAdd !== 0) {
      setKilometersNow(parseInt(kilometersOld) + parseInt(e.target.value));
    }
  };

  const submitForm = () => {
    // event.preventDefault();
    alert(`${kilometersAdd} where added to this car!`);
    if (kilometersAdd !== 0 || kilometersAdd !== null) {
      alert(`This car has ${kilometersNow} Km's now!`);
      axios
        .patch(`http://localhost:5000/cars/${carId}`, {
          kilometer: kilometersNow,
        })
        .then((response) => {
          console.log("CarUpdate", response);
        });
    } else {
      alert(`This car has ${kilometersOld} Km's now!`);
    }
  };

  // * Button to Return to Dashboard # ========== #
  const navigateReturn = useNavigate();
  const returnDashboard = () => {
    navigateReturn("/dashboard");
  };

  return (
    <form className="editCarBody" id="editCarBody">
      <ul className="editCarForm">
        <li
          htmlFor="kilometer"
          className="carEditKilometers editCarFormListItem"
        >
          <h4 className="carEditKilometersTitle">
            How many kilometers does the car have now?
          </h4>
          <div className="carEditKilometersAdd">
            <input
              className="carEditKilometersInput"
              type="number"
              placeholder="Km's"
              onChange={updateCarKilometers}
              id="kilometer"
            />
            <li>Adding {kilometersAdd || 0} Km's to this car!</li>
          </div>
        </li>
        <li className="carEditMaintenance editCarFormListItem">
          <h4>Is this car going to maintenance?</h4>
          <input
            type="checkbox"
            id="maintenance?"
            className="maintenanceCheckbox"
          />
        </li>
        <li className="carEditButtons">
          <button onClick={submitForm} className="Button">
            Submit
          </button>
          <button onClick={returnDashboard} className="Button">
            Return
          </button>
        </li>
      </ul>
    </form>
  );
}

export default EditCars;
