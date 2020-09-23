import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import {
  getCurrentExperience,
  setCurrentExperience,
} from "../../actions/profile";

const EditExperience = ({
  getCurrentExperience,
  setCurrentExperience,
  profile: { profile, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    company: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  /*eslint-disable */
  useEffect(() => {
    getCurrentExperience(match.params.id);
    const dateFrom = loading || !profile.from ? "" : profile.from;
    const dateTo = loading || !profile.to ? "" : profile.to;
    setFormData({
      title: loading || !profile.title ? "" : profile.title,
      location: loading || !profile.location ? "" : profile.location,
      company: loading || !profile.company ? "" : profile.company,
      from:
        loading || !dateFrom.substring(0, 10) ? "" : dateFrom.substring(0, 10),
      to: loading || !dateTo.substring(0, 10) ? "" : dateTo.substring(0, 10),
      current: loading || !profile.current ? "" : profile.current,
      description: loading || !profile.description ? "" : profile.description,
    });
  }, []);
  /*eslint-enable */

  const { title, location, company, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    setCurrentExperience(match.params.id, formData);
  };

  return loading || !profile ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="paddingSection">
        <h1 className="large text-primary"> Change Your experience </h1>
        <p className="lead">
          <i className="fas fa-user"> </i> Let's get some information to make
          your experience stand out
        </p>
        <small> * = required field </small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* title or Bootcamp"
              name="title"
              value={title}
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="company"
              name="company"
              value={company}
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
            <h4> To Date </h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={(e) => onChange(e)}
              disabled={toDateDisabled ? "disabled" : "enabled"}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                checked={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />
              Current Job
            </p>
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

EditExperience.propTypes = {
  getCurrentExperience: PropTypes.func.isRequired,
  setCurrentExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentExperience,
  setCurrentExperience,
})(EditExperience);
