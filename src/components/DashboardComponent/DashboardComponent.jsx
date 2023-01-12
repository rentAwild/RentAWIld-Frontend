/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CarContext from "../../contexts/CarContext";

import "./DashboardComponent.css";

function DashboardComponent(props) {
  const navigate = useNavigate();

  const { cars } = useContext(CarContext);
  // eslint-disable-next-line react/destructuring-assignment
  console.log(props.type);

  const [carId, setCarId] = useState(null);

  const goToCarEditor = (event) => {
    setCarId(event.target.getAttribute("id"));
    navigate("/editcar");
    console.log(parseInt(event.target.getAttribute("id")));
    console.log(carId);
  };

  return (
    <div>
      <h1>{props.type}</h1>
      <Box
        className="search-bar"
        sx={{ display: "flex", alignItems: "flex-end" }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField carId="search-bar" label="Search" variant="standard" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cars &&
            cars.map((element) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Grid item xs={4}>
                  <div id={element.id} key={element.id} onClick={goToCarEditor}>
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
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </div>
  );
}

export default DashboardComponent;
