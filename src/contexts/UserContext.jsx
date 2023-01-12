/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import axios from "axios";

const UserContext = createContext();
export default UserContext;
export function UserContextProvider({ children }) {
  // creating the states for the variables
  const [typeOfUser, setTypeOfUser] = useState([]);
  const [userId, setUserId] = useState();

  const fetchUser = (email) => {
    axios
      .get(`http://localhost:5000/users/type?email=${email}`)
      .then((response) => {
        /*         console.log(response.data); */
        setTypeOfUser(response.data[0][0][0].type);
        localStorage.setItem("userType", response.data[0][0][0].type);
        setUserId(response.data[0][0][0].id);
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
        /*   setEmail, */
        setUserId,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
