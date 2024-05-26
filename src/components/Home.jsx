import React, { useEffect } from "react";
import TodoBox from "./TodoBox";
import { useUserContext } from "../store/userContext";
import { NavLink,useNavigate } from "react-router-dom";

const Home = () => {
  const { loggedIn } = useUserContext();    
  const redirect = useNavigate();  
   
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      redirect("/login");
    }
  }, [loggedIn]);
  
  return (
    <div
      className="font-poppin"
    >
      <TodoBox />
    </div>
  );
};

export default Home;
