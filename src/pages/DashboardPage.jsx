import React from "react";
import DashboardComponent from "@components/DashboardComponent/DashboardComponent";
import SideBar from "../components/SideBar/SideBar";
import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <SideBar />
      <DashboardComponent />
    </div>
  );
}

export default DashboardPage;
