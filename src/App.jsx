import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="app-body">
      <Routes>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
