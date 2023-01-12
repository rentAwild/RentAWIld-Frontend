/* eslint-disable no-restricted-syntax */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Sidebar from "@components/SideBar/SideBar";

import "./Booking.css";
import "react-datepicker/dist/react-datepicker.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
      <Sidebar />

      <div className="booking-container">
        {/* <div className="banner">
          <h2>Bookings</h2>
        </div> */}
        <Grid container component="main" spacing={2}>
          <Grid
            item
            xs={6}
            square /* xs={12} sm={8} md={5} elevation={6} square */
            className="booking-img-ctn"
          >
            <img src={car?.image} alt="car_img" className="booking-img" />
          </Grid>
          <Grid
            item
            xs={6}
            square
            className="booking-right" /* xs={12} sm={8} md={5} elevation={6} square */
          >
            <Card sx={{ minWidth: 275 }} className="booking-card">
              <CardContent>
                <Typography variant="h3" component="div">
                  {car?.carName}
                </Typography>
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Company name: {car?.CompanyName}
                </Typography>

                <Typography sx={{ mb: 1 }} color="text.secondary">
                  Type: {car?.type}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {" "}
                  Price : {car?.daily_price}$ per day
                </Typography>
              </CardContent>
            </Card>
            <div className="calendar-container">
              <DatePicker
                className="calendar"
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
                inline
              />
              <Button
                variant="contained"
                onClick={handleBooking}
                className="booking-btn"
              >
                Book now!
              </Button>
              {/* <button type="button" onClick={handleBooking}>
                Book now !
              </button> */}
              {bookingSucess ? (
                <p style={{ color: "green" }}>Your booking was successfull !</p>
              ) : null}
              {bookingFail ? (
                <p style={{ color: "red" }}>
                  Please select date outside existing booking range !!!
                </p>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Booking;
