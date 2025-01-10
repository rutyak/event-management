import { Outlet } from "react-router-dom";
import "./Main.css";
import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

const Main = () => {
  const [title, setTitle] = useState("");
  const [openMenu, setOpenMenu] = useState(true);

  function handleToggleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div className="main-container">
      <Sidebar setTitle={setTitle} openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      <div className="main-body">
        <Header title={title} handleToggleMenu={handleToggleMenu}/>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
