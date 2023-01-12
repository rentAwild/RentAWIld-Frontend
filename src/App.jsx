import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
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
          </Routes>
        </CarContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
