/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from "react";
import DashboardComponent from "../components/DashboardComponent/DashboardComponent";
import UserContext from "../contexts/UserContext";
import SideBar from "../components/SideBar/SideBar";
import "./DashboardPage.css";

function DashboardPage() {
  // const { typeOfUser } = useContext(UserContext);
  const [typeOfUser, setTypeOfUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userType") !== 0) {
      setTypeOfUser(localStorage.getItem("userType"));
    }
  }, []);
  /* useEffect(() => fetchUser(), [email]); */
  // eslint-disable-next-line no-restricted-syntax
  /*   console.log(typeOfUser);
   */ return (
    <div>
      <SideBar type={typeOfUser} />
      <div className="dashboard">
        {typeOfUser === "admin" ? (
          <DashboardComponent type="admin" />
        ) : typeOfUser === "company" ? (
          <DashboardComponent type="company" />
        ) : (
          <DashboardComponent type="user" />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
