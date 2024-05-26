// import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { useUserContext } from "./store/userContext.jsx";
import { useEffect, useState } from "react";
import { useTaskContext } from "./store/taskContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import TodoHeader from "./components/TodoHeader.jsx";

const AppWithHeader = () => {
  const location = useLocation();
  const { getLogin, loggedIn, curUser } = useUserContext();
  const { getTasks } = useTaskContext();
  const [loading, setLoading] = useState(false);

  const AbortedRoutesHeader = ["/login", "/register"];
  const shouldDisplayHeader = !AbortedRoutesHeader.includes(location.pathname);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // console.log("!1");
      const userData = JSON.parse(storedUserData);
      Promise.all([getLogin(userData),getTasks(userData)])
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
    else {
      setLoading(false);
    }

  }, [loggedIn]);
  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);
  //     updateStock(userData);
  //     getSelectedStock();
  //   }
  // }, [loggedIn]);

  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
        <CircularProgress sx={{ color: "#8e5772" }} />
      </div>
    );
  }

  return (
    <>
      {shouldDisplayHeader && <TodoHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWithHeader />
    </Router>
  );
};

export default App;
