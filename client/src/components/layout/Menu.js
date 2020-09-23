import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileActions from "./../dashboard/DashboardActions";
import { getCurrentProfile } from "../../actions/profile";

const Menu = ({
  getCurrentProfile,
  auth: { isAuthenticated, loading, user },
  profile: { profile },
}) => {
  const [arrow, setArrow] = useState();

  useEffect(() => {
    getCurrentProfile();
    setArrow(">");
  }, [getCurrentProfile]);

  const mobileMenu = () => {
    if (arrow === ">") {
      setArrow("<");
      document.getElementById("blockID").style.display = "block";
      document.getElementById("simpleMenuBar").style.height = "100%";
    } else {
      setArrow(">");
      document.getElementById("blockID").style.display = "none";
    }
  };

  return loading ? (
    <div></div>
  ) : (
    <Fragment>
      {user && isAuthenticated ? (
        <Fragment>
          <div className="menubar" id="simpleMenuBar">
            <div className="show" id="blockID">
              <div id="layoutSidenav_nav">
                <nav
                  className="sidenav accordion sidenav-dark"
                  id="sidenavAccordion"
                >
                  <div className="sidenav-menu">
                    <div className="nav">
                      <div className="sidenav-menu-heading">Profile</div>
                      <ProfileActions profile={profile} />
                      <div className="sidenav-menu-heading">Interface</div>
                      <Link className="nav-link" to="/profiles">
                        <div className="nav-link-icon">
                          <i className="fas fa-columns"></i>
                        </div>
                        Developers{" "}
                      </Link>
                      <Link className="nav-link" to="/posts">
                        <div className="nav-link-icon">
                          <i className="fas fa-book-open"></i>
                        </div>
                        Posts{" "}
                      </Link>
                      <div className="sidenav-menu-heading">Recruitment</div>
                      <Link className="nav-link" to="/forms">
                        <div className="nav-link-icon">
                          <i className="fas fa-book-open"></i>
                        </div>
                        Companies{" "}
                      </Link>
                    </div>
                    <div className="menu-bottom">
                      {" "}
                      <small>
                        Logged in as: <br />
                      </small>
                      {user && user.name}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <input
            type="button"
            id="mobile-button"
            onClick={mobileMenu}
            value={arrow}
          />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

Menu.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Menu);
