import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = ({ profile }) => {
  return (
    <div className="dash-buttons">
      {profile !== null ? (
        <Link className="nav-link" to="/edit-profile">
          <div className="nav-link-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          Edit Profile{" "}
        </Link>
        ) : (
          <div></div>
      )}
      <Link className="nav-link" to="/education">
        <div className="nav-link-icon">
          <i className="fas fa-graduation-cap"></i>
        </div>
        Add Education{" "}
      </Link>
      <Link className="nav-link" to="/experience">
        <div className="nav-link-icon">
          <i className="fab fa-black-tie"></i>
        </div>
        Add Experience{" "}
      </Link>
    </div>
  );
};

export default DashboardActions;
