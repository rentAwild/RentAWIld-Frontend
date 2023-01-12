import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
<<<<<<< HEAD
import EditCars from "./pages/EditCars";
=======
import Booking from "./components/Booking/Booking";
import LandingPage from "./pages/LandingPage";
>>>>>>> 6355d1293dd32d506adf90ae8998c88bdb497d5d
import { CarContextProvider } from "./contexts/CarContext";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="app-body">
      <UserContextProvider>
        <CarContextProvider>
          <Routes>
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
<<<<<<< HEAD
            <Route path="/editcar" element={<EditCars />} />
=======
            <Route path="/" element={<LandingPage />} />
            {/* TODO: testing route to remove after */}
            <Route path="/booking/:id" element={<Booking />} />
>>>>>>> 6355d1293dd32d506adf90ae8998c88bdb497d5d
          </Routes>
        </CarContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
