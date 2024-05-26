import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import TasksStore from "./store/index.js";
import UserProvider from "./store/userContext.jsx";
import TaskProvider from "./store/taskContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={TasksStore}>
      <UserProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
