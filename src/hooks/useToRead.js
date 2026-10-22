import { useContext } from "react";
import { ToReadContext } from "../context/ToReadContext";

const useToRead = () => {
  const context = useContext(ToReadContext);

  if (!context) {
    throw new Error("useToRead must be inside ToReadProvider");
  }
  return context;
};

export default useToRead;
