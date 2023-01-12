import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Booking() {
  const carId = useParams();
  const [car, setCar] = useState({});

  const fetchCar = () => {
    axios
      .get("http://localhost:5000/cars")
      .then((res) =>
        setCar(res.data.find((e) => e.id === parseInt(carId.id, 10)))
      );
  };
  useEffect(() => fetchCar(), []);

  const [books, setBooks] = useState([
    { id: 1, start: "2023-01-22", end: "2023-01-30", car_id: 1, user_id: 3 },
  ]);

  return (
    <>
      <img src={car.image} alt="car_img" />
      <p>Company : {car.CompanyName}</p>
      <br />
      <p>Name : {car.carName}</p>
      <br />
      <p>Type : {car.type}</p>
      <br />
      <p>Price : {car.daily_price}$ per day</p>
    </>
  );
}

export default Booking;
