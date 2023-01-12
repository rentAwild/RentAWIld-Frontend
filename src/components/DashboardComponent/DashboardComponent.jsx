/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import * as React from "react";
import { useContext } from "react";
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
import UserContext from "../../contexts/UserContext";

import "./DashboardComponent.css";

function DashboardComponent(props) {
  const { cars } = useContext(CarContext);
  const { userId } = useContext(UserContext);
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <div>
      <Box
        className="search-bar"
        sx={{ display: "flex", alignItems: "flex-end" }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField id="search-bar" label="Search" variant="standard" />
      </Box>
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
