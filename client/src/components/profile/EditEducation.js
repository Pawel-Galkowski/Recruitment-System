import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
import {
  getCurrentEducation,
  setCurrentEducation,
} from "../../actions/profile";

const EditEducation = ({
  getCurrentEducation,
  setCurrentEducation,
  profile: { profile, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  /*eslint-disable */
  useEffect(() => {
    getCurrentEducation(match.params.id);
    const dateFrom = loading || !profile.from ? "" : profile.from;
    const dateTo = loading || !profile.to ? "" : profile.to;
    setFormData({
      school: loading || !profile.school ? "" : profile.school,
      degree: loading || !profile.degree ? "" : profile.degree,
      fieldofstudy:
        loading || !profile.fieldofstudy ? "" : profile.fieldofstudy,
      from:
        loading || !dateFrom.substring(0, 10) ? "" : dateFrom.substring(0, 10),
      to: loading || !dateTo.substring(0, 10) ? "" : dateTo.substring(0, 10),
      current: loading || !profile.current ? "" : profile.current,
      description: loading || !profile.description ? "" : profile.description,
    });
  }, []);
  /*eslint-enable */

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    setCurrentEducation(match.params.id, formData);
  };

  return loading || !profile ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="paddingSection">
        <h1 className="large text-primary"> Change your education </h1>
        <p className="lead">
          <i className="fas fa-user"> </i> Let's change some information to make
          your education stand out
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="school or Bootcamp"
              name="school"
              value={school}
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="degree"
              name="degree"
              value={degree}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="field of study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4> From Date </h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                checked={current}
                onChange={(e) => {
                  onChange(e);
                  toggleDisabled(!toDateDisabled);
                }}
              />{" "}
              Current School or Bootcamp
            </p>
          </div>
          <div className="form-group">
            <h4> To Date </h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={(e) => onChange(e)}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

EditEducation.propTypes = {
  getCurrentEducation: PropTypes.func.isRequired,
  setCurrentEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentEducation,
  setCurrentEducation,
})(withRouter(EditEducation));
