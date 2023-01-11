import React from "react";
import DashboardComponent from "@components/DashboardComponent/DashboardComponent";
import SideBar from "../components/SideBar/SideBar";
import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div>
      <SideBar />
      <div className="dashboard">
        <DashboardComponent />
      </div>
    </div>
  );
}

export default DashboardPage;
