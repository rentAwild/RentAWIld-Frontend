/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import axios from "axios";

const UserContext = createContext();
export default UserContext;
export function UserContextProvider({ children }) {
  // creating the states for the variables
  const [typeOfUser, setTypeOfUser] = useState([]);

  const fetchUser = (email) => {
    axios
      .get(`http://localhost:5000/users/type?email=${email}`)
      .then((response) => {
        setTypeOfUser(response.data[0][0][0].type);
        localStorage.setItem("userType", response.data[0][0][0].type);
        localStorage.setItem("userName", response.data[0][0][0].name);
        localStorage.setItem("userId", response.data[0][0][0].id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        fetchUser,
        typeOfUser,
        setTypeOfUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
