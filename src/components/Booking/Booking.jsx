import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "./Booking.css";
import "react-datepicker/dist/react-datepicker.css";

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

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // From calendar to component as an input: new Date(date);
  // From component to calendar as an output: date.toISOString().substring(0, 10);

  const handleBooking = (e) => {
    e.preventDefault();
    console.log(
      startDate.toISOString().substring(0, 10),
      " and ",
      endDate.toISOString().substring(0, 10)
    );
  };

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
      <br />
      <DatePicker
        dateFormat="dd-MM-yyyy"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        excludeDateIntervals={books.map((book) => ({
          start: new Date(book.start),
          end: new Date(book.end),
        }))}
        placeholderText="Please select your dates"
        withPortal
      />
      <button onClick={handleBooking}>Book now !</button>
    </>
  );
}

export default Booking;
