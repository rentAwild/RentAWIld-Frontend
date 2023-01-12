/* eslint-disable no-restricted-syntax */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "./Booking.css";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  // Fetch and manage the current car
  const carId = useParams();
  const [car, setCar] = useState({});
  const fetchCar = () => {
    axios.get("http://localhost:5000/cars").then((res) => {
      setCar(res.data.find((e) => e.id === parseInt(carId.id, 10)));
    });
  };

  // Fetch and manage the books for the current car
  const [books, setBooks] = useState([]);
  const fetchBooks = () => {
    axios
      .get("http://localhost:5000/books")
      .then((res) =>
        setBooks(res.data.filter((e) => e.car_id === parseInt(carId.id, 10)))
      );
  };

  useEffect(() => {
    fetchCar();
    fetchBooks();
  }, []);

  // Manage booking submit
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [bookingSucess, setBookingSucess] = useState(false);
  const [bookingFail, setBookingFail] = useState(false);
  const handleBooking = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/books", [
        {
          start: startDate.toISOString().substring(0, 10),
          end: endDate.toISOString().substring(0, 10),
          car_id: parseInt(carId.id, 10),
          user_id: 1, // TODO: hard coded user id to create a booking should came from context after
        },
      ])
      .then((res) => {
        if (res.status === 201) {
          setBookingSucess(true);
          setBookingFail(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setBookingFail(true);
          setBookingSucess(false);
        }
      });
  };

  return (
    <>
      <img src={car?.image} alt="car_img" />
      <p>Company : {car?.CompanyName}</p>
      <br />
      <p>Name : {car?.carName}</p>
      <br />
      <p>Type : {car?.type}</p>
      <br />
      <p>Price : {car?.daily_price}$ per day</p>
      <br />
      <DatePicker
        dateFormat="dd-MM-yyyy"
        selectsRange
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
        inline
      />
      <button type="button" onClick={handleBooking}>
        Book now !
      </button>
      {bookingSucess ? (
        <p style={{ color: "green" }}>Your booking has been succeed !</p>
      ) : null}
      {bookingFail ? (
        <p style={{ color: "red" }}>
          Please select date outside existing booking range !!!
        </p>
      ) : null}
    </>
  );
}

export default Booking;
