import React, { useEffect } from "react";
import "./Sidebar.css";
import {
  AttendanceIcon,
  CandidateIcon,
  EmployeeIcon,
  LeavesIcon,
  Logo,
  LogoutIcon,
  SearchIcon,
} from "../../assets/Icons";
import { Link } from "react-router-dom";
import Logout from "../../pages/authentication/logout/Logout";

const Sidebar = ({ setTitle, openMenu, setOpenMenu }) => {
  const handleCloseMenu = (type) => {
    setTitle(type);
    if (window.innerWidth <= 1024) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setOpenMenu]);

  return (
    <div className={openMenu ? "sidebar" : "closeMenu"}>
      <div className="logo">
        <Logo />
      </div>
      <div className="search">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input type="text" placeholder="Search" />
      </div>
      <div className="menu">
        <Link
          to="/dashboard"
          className="menu-item"
          onClick={() => handleCloseMenu("Upcoming Events")}
        >
          <CandidateIcon />
          <span className="text">Events</span>
        </Link>
        <Link
          to="/dashboard/attendees"
          className="menu-item"
          onClick={() => handleCloseMenu("Attendees")}
        >
          <EmployeeIcon />
          <span className="text">Attendees</span>
        </Link>
        <Link
          to="/dashboard/tasks"
          className="menu-item"
          onClick={() => handleCloseMenu("Tasks")}
        >
          <AttendanceIcon />
          <span className="text">Tasks</span>
        </Link>
        <div className="menu-item" onClick={() => handleCloseMenu("Logout")}>
          <LogoutIcon />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
