import React from "react";
import { useParams } from "react-router-dom";

function Booking() {
  const carId = useParams();
  console.log(carId.id);
  return <div>Booking</div>;
}

export default Booking;
