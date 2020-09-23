import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import { getProfileById } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "../showProfile/ProfileExp";
import ProfileEducation from "../showProfile/ProfileEdu";
import ProfileGithub from "../showProfile/ProfileGithub";

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="paddingSection">
        {profile === null || profile === undefined ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className="profileButtons">
              <Link to="/profiles" className="btn btn-light">
                Back to profiles
              </Link>
              {auth !== undefined &&
                auth !== null &&
                auth.isAuthenticated &&
                !auth.loading &&
                auth.user &&
                auth.user._id === profile.user._id && (
                  <Link to="/edit-profile" className="btn btn-dark">
                    Edit profile
                  </Link>
                )}
            </div>
            <div className="profile-page">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="flex-row">
                <div className="profile-exp bg-white p2">
                  <h2 className="text-primary">Experience</h2>
                  {profile.experience.length > 0 ? (
                    <Fragment>
                      {profile.experience.map((experience) => (
                        <ProfileExperience
                          key={experience._id}
                          experience={experience}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No experience credetials</h4>
                  )}
                </div>
                <div className="profile-edu bg-white p-2">
                  <h2 className="text-primary">Education</h2>
                  {profile.education.length > 0 ? (
                    <Fragment>
                      {profile.education.map((education) => (
                        <ProfileEducation
                          key={education._id}
                          education={education}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No education credetials</h4>
                  )}
                </div>
              </div>
              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
