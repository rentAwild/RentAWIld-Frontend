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

import "./DashboardComponent.css";

function DashboardComponent() {
  const { cars, fetchCars } = useContext(CarContext);

  const navigate = useNavigate();
  /*   console.log(props.type); */
  const [carName, setName] = useState();
  const [type, setType] = useState();
  const [CompanyName, setCompanyName] = useState();
  const [Companies, setCompanies] = useState();
  const [max_price, setMax_price] = useState(500);
  const [min_price, setMin_price] = useState(0);
  const [allTypes, setAllTypes] = useState();
  const [inputValue, setInputValue] = useState();

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
  const fetchCompanies = () => {
    axios
      .get(`http://localhost:5000/Companies`)
      .then((response) => {
        setCompanies(...[response.data]);
      })
      .catch((error) => {
        // setUserNotFound(true);
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchTypes();
    fetchCompanies();
  }, []);

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
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompanyName(event.target.value);
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    console.log(event.target.value);
  };
  const handleInputSubmit = (event) => {
    event.preventDefault();
    setName(inputValue);
    console.log(inputValue);
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
        </form>
        <br />
        <label htmlFor="dropdownBox"> </label>
        <select
          name="dropdownBox"
          value={CompanyName}
          onChange={handleCompanyChange}
        >
          <option value="All">Select a company:</option>
          {Companies &&
            Companies.map((element, i) => (
              <option value={element.name} key={i}>
                {element.name}
              </option>
            ))}
        </select>
        <label htmlFor="dropdownBox"> </label>
        <select name="dropdownBox" value={type} onChange={handleTypeChange}>
          <option value="All">Select a car type:</option>
          {allTypes &&
            allTypes.map((element, i) => (
              <option value={element.type} key={i}>
                {element.type}
              </option>
            ))}
        </select>
        <br />
        <br />
        <form onSubmit={handleInputSubmit}>
          <label>
            Search for a car:
            <input
              type="text"
              name="name"
              value={`${inputValue}`}
              onChange={handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cars &&
            cars.map((element) => {
              return (
                <Grid item xs={4} key={element.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={element.image}
                      title={element.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        Car: {element.carName}
                      </Typography>
                      <Typography variant="body3" color="text.secondary">
                        Price: {element.daily_price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Car type: {element.type}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
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
