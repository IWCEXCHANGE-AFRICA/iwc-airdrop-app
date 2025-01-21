/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const token = useSelector((state) => state.token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  return (
    <UserContext.Provider value={{ config }}>
      {children}
    </UserContext.Provider>
  );
}
