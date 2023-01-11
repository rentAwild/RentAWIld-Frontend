import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import Booking from "./components/Booking/Booking";

function App() {
  return (
    <div className="app-body">
      <Routes>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* TODO: testing route to remove after */}
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;
