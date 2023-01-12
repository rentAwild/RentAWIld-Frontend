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
  const carId = 2;
  const form = document.querySelector("form");

  const [kilometersOld, setKilometersOld] = useState(0);
  const [kilometersAdd, setKilometersAdd] = useState(0);
  const [kilometersNow, setKilometersNow] = useState(0);

  const [oldPrice, setOldPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const [maintenance, setMaintenance] = useState(false);

  const updateCarPrice = (e) => {
    setNewPrice(parseInt(e.target.value));
  };

  const toggleMaintenance = () => {
    setMaintenance(!maintenance);
  };

  // * Function to get Old Kilometers of car # ========== #
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars/${carId}`)
      .then(
        (response) =>
          console.log(response.data) +
          setKilometersOld(response.data[0].kilometer) +
          setOldPrice(response.data[0].daily_price) +
          setMaintenance(form.elements[3].checked)
      );
  }, []);

  // * Function to set up the Adding Kilometers to car # ========== #
  const updateCarKilometers = () => {
    setKilometersAdd(parseInt(form.elements[0].value));
    if (kilometersAdd !== null || kilometersAdd !== 0) {
      setKilometersNow(
        parseInt(kilometersOld) + parseInt(form.elements[0].value)
      );
    }
  };

  // * Function to Submit Form # ========== #
  const submitForm = () => {
    alert(kilometersAdd + " where added to this car!");
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
    if (form.elements[1].checked === true) {
      axios
        .patch(`http://localhost:5000/carmaintenance/${carId}`, {
          maintenance: maintenance,
        })
        .then((response) => {
          console.log("CarUpdate", response);
        });
    } else {
      axios
        .patch(`http://localhost:5000/carmaintenance/${carId}`, {
          maintenance: maintenance,
        })
        .then((response) => {
          console.log("CarUpdate", response);
        });
    }
    if (form.elements[2].value > 0) {
      axios
        .patch(`http://localhost:5000/Carprice/${carId}`, {
          daily_price: newPrice,
        })
        .then((response) => {
          console.log("CarUpdate", response);
        });
    }
    if (form.elements[3].checked === true) {
      axios.delete(`http://localhost:5000/cars/${carId}`).then((response) => {
        console.log("Deleted Car", response);
      });
    }
  };
  // const submitForm = () => {
  //   form.addEventListener("submit", (event) => {
  //     console.log("Saving value", form.elements[2].value);
  //     event.preventDefault();
  //   });
  //   console.log(form);
  // };

  console.log(kilometersOld);
  console.log(kilometersAdd);
  console.log(kilometersNow);

  // ! Function to change maintenance # ========== #

  console.log(newPrice);
  console.log(oldPrice);

  // * Button to Return to Dashboard # ========== #
  const navigateReturn = useNavigate();
  const returnDashboard = () => {
    navigateReturn("/dashboard");
  };

  return (
    <form className="editCarBody" id="editCarForm">
      <ul className="editCarForm">
        <li className="editCarFormListItem">
          Editing this the car:
          <img
            src="https://www.razaoautomovel.com/wp-content/uploads/2018/01/fiat_punto_sporting_20-e1516641314226_925x520_acf_cropped.jpeg"
            alt="Image of this car"
          />
        </li>
        <li className="editCarFormListItem">
          <h4>This car has {kilometersOld} Km's</h4>
        </li>
        <li
          htmlFor="kilometer"
          className="carEditKilometers editCarFormListItem"
        >
          <label htmlFor="kilometer" className="carEditKilometersTitle">
            How many kilometers are you adding?
          </label>
          <div className="carEditKilometersAdd">
            <li>
              Adding
              <input
                className="carEditKilometersInput"
                type="number"
                placeholder="Km's"
                onChange={updateCarKilometers}
                id="kilometer"
              />
              Km's to this car!
            </li>
          </div>
        </li>
        <li className="editCarFormListItem">
          <label htmlFor="maintenance">Is this car going to maintenance? {maintenance?"Yes":"No"}</label>
          <input
            type="checkbox"
            id="maintenance"
            className="checkbox"
            onChange={toggleMaintenance}
            checked={maintenance}
          />
        </li>
        <li htmlFor="price" className="editCarFormListItem">
          <h5>This car is {oldPrice}€/day</h5>
          <label htmlFor="price" className="carEditKilometersTitle">
            Do you want to update this car price?
          </label>
          <div className="carEditKilometersAdd">
            <input
              className="carPriceUpdate"
              type="number"
              placeholder="New price"
              onChange={updateCarPrice}
              id="price"
            />
            <li>Updating to {newPrice} €/day!</li>
          </div>
        </li>
        <label htmlFor="deleteCar" className="editCarFormListItem">
          Do you wnt to remove this car from your fleet?
          <input type="checkbox" id="deleteCar" className="checkbox" />
        </label>
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
