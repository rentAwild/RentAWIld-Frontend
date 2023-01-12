/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const UserContext = createContext();
export default UserContext;
export function UserContextProvider({ children }) {
  // creating the states for the variables
  const [typeOfUser, setTypeOfUser] = useState([]);
  // const [email, setEmail] = useState([]);

  //   const email = "admin@email";

  const fetchUser = (email) => {
    axios
      .get(`http://localhost:5000/users/type?email=${email}`)
      .then((response) => {
        setTypeOfUser(response.data[0][0][0].type);
      })
      .catch((error) => {
        // setUserNotFound(true);
        console.error("Error:", error);
      });
  };
  const [users, setUsers] = useState([]);

  const fetchAllUser = () => {
    axios
      .get(`http://localhost:5000/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        // setUserNotFound(true);
        console.error("Error:", error);
      });
  };
  // Loading the data on mounting
  useEffect(() => fetchAllUser(), []);

  console.log(users);

  return (
    <UserContext.Provider
      value={{
        fetchUser,
        typeOfUser,
        setTypeOfUser,
        /*   setEmail, */
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
