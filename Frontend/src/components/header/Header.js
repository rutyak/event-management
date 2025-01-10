import React from "react";
import "./Header.css";
import { BellIcon, EmailIcon } from "../../assets/Icons";
import menuIcon from "../../assets/menu.png";

const Header = ({ title, handleToggleMenu }) => {
  return (
    <div className="header">
      <div className="menu-icon">
        <img src={menuIcon} alt="icon" className="icon" style={{ width: "27px" }} onClick={handleToggleMenu}/>
        <div className="title">{title}</div>
      </div>
      <div className="icons">
        <EmailIcon />
        <BellIcon />
        <div className="profile">
          <img
            src="https://res.cloudinary.com/drxanllxs/image/upload/v1731160820/samples/smile.jpg"
            alt="User"
            className="profile-image"
          />
          <span className="dropdown-icon">▾</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
