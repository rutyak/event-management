import React, { useState } from "react";
import { useAuthAndData } from "../../../context/AuthAndDataContext";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const [showPop, setShowPop] = useState(false);
  const { logout } = useAuthAndData();
  const navigate = useNavigate();

  const handleTogglePopup = () => {
    setShowPop(!showPop);
  };

  const handleCancel = () => {
    setShowPop(false);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowPop(false);
    navigate("/");
  };

  return (
    <>
      <div className="logout-trigger" onClick={handleTogglePopup}>
        Logout
      </div>

      {showPop && (
        <div className="logout-popup-overlay" onClick={handleCancel}>
          <div className="logout-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Log Out</h3>
            </div>
            <div className="body">
              <div className="popup-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="popup-footer">
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="logout-btn" onClick={handleConfirmLogout}>
                  Log Out                             
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
