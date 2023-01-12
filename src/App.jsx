import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { CarContextProvider } from "./contexts/CarContext";
import { UserContextProvider } from "./contexts/UserContext";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Booking from "./components/Booking/Booking";
import LandingPage from "./pages/LandingPage";
// import AddCar from "./compenents/AddCar/AddCar";

function App() {
  return (
    <div className="app-body">
      <UserContextProvider>
        <CarContextProvider>
          <Routes>
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<LandingPage />} />
            {/* TODO: testing route to remove after */}
            <Route path="/booking/:id" element={<Booking />} />
            {/* <Route path="/booking/:id" element={<AddCar />} /> */}
          </Routes>
        </CarContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
