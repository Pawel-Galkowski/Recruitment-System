import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(" ")[0]}s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </Fragment>
    )}
  </div>
);

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
  };

export default ProfileAbout;
