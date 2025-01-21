import { useContext } from "react";
import { UserContext } from "./userContext";

export function useUserContext() {
  return useContext(UserContext);
}