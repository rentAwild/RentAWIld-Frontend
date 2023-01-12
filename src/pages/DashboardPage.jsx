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
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

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

  return (
    <div>
      <SideBar type={typeOfUser} userId={userId} userName={userName} />
      <div className="dashboard">
        {typeOfUser === "admin" ? (
          <DashboardComponent
            type="admin"
            userId={userId}
            userName={userName}
          />
        ) : typeOfUser === "company" ? (
          <DashboardComponent
            type="company"
            userId={userId}
            userName={userName}
          />
        ) : (
          <DashboardComponent type="user" userId={userId} userName={userName} />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
