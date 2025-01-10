import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Welcome from "./pages/Welcome";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Main from "./pages/Main";
import Events from "./pages/eventsManagement/Events";
import Attendees from "./pages/attendeesManagement/Attendees";
import "./index.css";
import { AuthAndDataProvider } from "./context/AuthAndDataContext";
import TaskTracker from "./pages/taskManagement/TaskTracker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Events />, 
      },
      {
        path: "attendees",
        element: <Attendees />,
      },
      {
        path: "tasks",
        element: <TaskTracker />, 
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthAndDataProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthAndDataProvider>
  </React.StrictMode>
);
