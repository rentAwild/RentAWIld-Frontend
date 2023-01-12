/* eslint-disable no-nested-ternary */
import React, { useContext } from "react";
import VerticalBar from "../components/VerticalBar/VerticalBar";
import DashboardComponent from "../components/DashboardComponent/DashboardComponent";
import UserContext from "../contexts/UserContext";

function DashboardPage() {
  const { typeOfUser } = useContext(UserContext);
  console.log(typeOfUser);
  return (
    <div>
      <VerticalBar />
      {typeOfUser === "admin" ? (
        <DashboardComponent type="admin" />
      ) : typeOfUser === "company" ? (
        <DashboardComponent type="company" />
      ) : (
        <DashboardComponent type="user" />
      )}
    </div>
  );
}

export default DashboardPage;
