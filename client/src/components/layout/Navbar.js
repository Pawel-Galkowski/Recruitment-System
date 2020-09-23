import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { getCurrentProfile } from "../../actions/profile";

const Navbar = ({
  getCurrentProfile,
  auth: { isAuthenticated, loading, user },
  logout,
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const showProfile = (
    <li>
      <Link to={`/profile/${user && user._id}`}>
        <i className="fas fa-user"></i>
        {""} Profile{" "}
      </Link>
    </li>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to="/admin">Admin panel </Link>
      </li>
      {profile === null ? <span /> : showProfile}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          {""}
          <span> Logout</span>
        </a>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      {profile === null ? <span /> : showProfile}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          {""}
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/"> Dashboard </Link>
      </li>
      <li>
        <Link to="/login"> Login </Link>
      </li>
      <li>
        <Link to="/register"> Register </Link>
      </li>
    </ul>
  );

  return loading ? (
    <div></div>
  ) : (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/" className="logoLink">
          <i className="fas fa-hashtag"></i>
          JoinJobs
        </Link>
      </h1>
      <div className="mainNav">
        {(user && user.role) === "admin" && isAuthenticated
          ? adminLinks
          : isAuthenticated
          ? authLinks
          : guestLinks}
      </div>
      <div className="menu-wrap">
        <input type="checkbox" className="toggler" />
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            <div>
              {(user && user.role) === "admin" && isAuthenticated
                ? adminLinks
                : isAuthenticated
                ? authLinks
                : guestLinks}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(Navbar);
