import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CarRentalIcon from "@mui/icons-material/CarRental";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SideBar from "../SideBar/SideBar";
import "./AddCar.css";

function AddCar() {
  const [typeOfUser, setTypeOfUser] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userType") !== 0) {
      setTypeOfUser(localStorage.getItem("userType"));
    }
    if (localStorage.getItem("userName") !== 0) {
      setUserName(localStorage.getItem("userName"));
    }
    if (localStorage.getItem("userId") !== 0) {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#0D0C13",
      },
      neutral: {
        main: "#0D0C13",
        contrastText: "#fff",
      },
    },
  });
  const [carDetails, setCarDetails] = useState({
    carName: "",
    carImg: "",
    carType: "",
    carKm: "",
    carPrice: "",
    carMaintenance: false,
  });
  const handleChange = (event) => {
    setCarDetails({ ...carDetails, [event.target.name]: event.target.value });
  };
  console.log(carDetails);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(carDetails.Img);
    axios
      .post("http://localhost:5000/Cars", [
        {
          carName: carDetails.carName,
          image: carDetails.carImg,
          maintenance: 0,
          type: carDetails.carType,
          kilometer: carDetails.carKm,
          daily_price: carDetails.carPrice,
          CompanyName: "Abc",
          user_id: userId,
        },
      ])
      .then()
      .catch((err) => {
        console.error(err);
      });
    navigate("/dashboard");
  };

  return (
    <>
      <SideBar type={typeOfUser} userId={userId} userName={userName} />{" "}
      <div className="addCar-container">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "neutral" }}>
                <CarRentalIcon fontSize="large" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add a car to your fleet
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="car-name"
                  label="Name"
                  name="carName"
                  autoComplete="name"
                  autoFocus
                  value={carDetails.carName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="carImg"
                  label="Car Image"
                  type="text"
                  id="car-img"
                  autoComplete="Car image link"
                  value={carDetails.carImg}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="carType"
                  label="Type of car"
                  type="text"
                  id="car-type"
                  autoComplete="Type of car"
                  value={carDetails.carType}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="carKm"
                  label="Kilometers"
                  type="text"
                  id="car-kilometers"
                  autoComplete="Kilometers"
                  value={carDetails.carKm}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="carPrice"
                  label="Daily Fee"
                  type="text"
                  id="car-price"
                  autoComplete="Daily Fee"
                  value={carDetails.carPrice}
                  onChange={handleChange}
                />
                {/*  <FormControlLabel
                  control={<Checkbox value="maintenance" color="primary" />}
                  label="Under Maintenance?"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="neutral"
                >
                  Add car
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}

export default AddCar;
