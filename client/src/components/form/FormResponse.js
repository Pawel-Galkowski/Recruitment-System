import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeResponse } from "./../../actions/form";
import Spinner from "../layout/Spinner";

const FormResponse = ({
  removeResponse,
  form: { _id, user, answer, file, loading },
  profile,
  match,
}) => {
  var singleProfile, profileImg;

  if (profile && profile !== undefined) {
    singleProfile = singleProfile = profile.filter(
      (x) => x.user._id === user
    )[0];
    profileImg = singleProfile && singleProfile.profileImg ? singleProfile.profileImg : null;
  }
  return profile !== undefined && loading ? (
    <Spinner />
  ) : (
    <div className="post bg-white">
      <div>
        <h1>
          <Link to={`/profile/${user}`}>
            {profileImg === null ? (
              <i className="fas fa-user-tie fa-4x"></i>
            ) : (
              <img src={profileImg} className="round-img" alt=""></img>
            )}
          </Link>
        </h1>
      </div>
      <div>
        <h2>{singleProfile ? singleProfile.user.name : null}</h2>
        <h4>Form responses:</h4>
        <div className="sectionLeftPadding">
          <ol>
            {answer && answer.length > 0 ? (
              answer.map((res, index) => (
                <Fragment key={index}>
                  <li>{res}</li>
                </Fragment>
              ))
            ) : (
              <h2>No forms Available</h2>
            )}
          </ol>
        </div>
        {file && file !== "" ? (
          <div>
            My CV:{" "}
            <a href={`${file}`} download>
              Download now{" "}
            </a>
          </div>
        ) : null}
        <hr />
        <button
          onClick={(e) =>
            removeResponse(match.params.company, match.params.id, _id)
          }
          type="button"
          className="btn btn-danger marginUpDown-1"
        >
          Remove &nbsp;<i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

FormResponse.propTypes = {
  removeResponse: PropTypes.func.isRequired,
};

export default connect(null, { removeResponse })(FormResponse);
