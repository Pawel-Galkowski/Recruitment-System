import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    skills,
    company,
    location,
    website,
    social,
    user: { name, avatar },
    profileImg,
  },
}) => {
  return (
    <div className="profile-top">
      <div className="profile-profile bg-primary">
        <img
          className="round-img"
          src={!profileImg ? avatar : profileImg}
          alt="avatar"
        />
        <h1 className="large">{name}</h1>
        <p className="middle-text">
          {status} {company && <span> at {company} </span>}
        </p>
        <p className="lead">{location}</p>
        <div className="icons">
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}
          {social && social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </div>
      <div className="profile-skills bg-white">
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {skills.map((skill, index) => (
            <div key={index}>
              <i className="fas fa-check"></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
