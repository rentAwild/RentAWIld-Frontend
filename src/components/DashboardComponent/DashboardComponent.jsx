/* eslint-disable eqeqeq */
// eslint-disable-next-line react/destructuring-assignment
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
/* import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search"; */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import CarContext from "../../contexts/CarContext";
import UserContext from "../../contexts/UserContext";

import "./DashboardComponent.css";

function DashboardComponent(props) {
  const { userId } = useContext(UserContext);
  // eslint-disable-next-line react/destructuring-assignment
  const { cars, fetchCars } = useContext(CarContext);

  const navigate = useNavigate();
  /*   console.log(props.type); */
  const [carName, setName] = useState();
  const [type, setType] = useState();
  const [CompanyName, setCompanyName] = useState();
  const [max_price, setMax_price] = useState(500);
  const [min_price, setMin_price] = useState(0);
  const [allTypes, setAllTypes] = useState();

  const fetchTypes = () => {
    axios
      .get(`http://localhost:5000/types/cars`)
      .then((response) => {
        setAllTypes(...[response.data]);
      })
      .catch((error) => {
        // setUserNotFound(true);
        console.error("Error:", error);
      });
  };

  useEffect(() => fetchTypes, []);

  const Obj = {
    type,
    CompanyName,
    max_price,
    min_price,
    carName,
  };
  /*  console.log(Obj) */

  useEffect(() => {
    fetchCars(Obj);
  }, [carName, min_price, max_price, type, CompanyName]);
  const handleMin = (e) => {
    setMin_price(e.target.value);
  };
  const handleMax = (e) => {
    setMax_price(e.target.value);
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [carId, setCarId] = useState(null);
  return (
    <div>
      <div className="filters">
        <h2>Select some filters!</h2>
        <form id="price-range-form">
          <label htmlFor="min-price" className="form-label">
            Min price: {`${min_price}`}
          </label>
          <input
            type="range"
            min="0"
            max="300"
            step="1"
            value={`${min_price}`}
            onInput={handleMin}
          />
          <label htmlFor="max-price" className="form-label">
            Max price: {`${max_price}`}
          </label>
          <input
            type="range"
            className="form-range"
            min="200"
            max="500"
            id="max-price"
            step="1"
            value={`${max_price}`}
            onInput={handleMax}
          />
          <br />
          <br />
          <label htmlFor="dropdownBox"> </label>
          <select name="dropdownBox" value={type} onChange={handleChange}>
            <option value="All">Select a car type:</option>
            {allTypes &&
              allTypes.map((element, i) => (
                <option value={element.type} key={i}>
                  {element.type}
                </option>
              ))}
          </select>
        </form>
      </div>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cars &&
            cars
              .filter((e) => e.user_id == userId)
              .map((element, key) => {
                return (
                  <Grid item xs={4} key={key}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={element.image}
                        title={element.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {element.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {element.daily_price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {element.type}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <a href={`http://localhost:3000/booking/${element.id}`}>
                          Learn More
                        </a>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Box>
    </div>
  );
}

export default DashboardComponent;
