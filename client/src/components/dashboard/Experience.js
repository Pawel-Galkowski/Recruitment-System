import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";
import { Link } from "react-router-dom";

const Experience = ({ experience, deleteExperience }) => {
  const submitOperation = (id) => {
    if (window.confirm("Do you really want to remove that experience?")) {
      deleteExperience(id);
    }
  };

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.location}</td>
      <td>{exp.title}</td>
      <td className="hide-md">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <Link
          to={{ pathname: `/edit-experience/${exp._id}`, query: `${exp._id}` }}
          className="btn btn-light"
        >
          <i className="far fa-edit fa-2x"></i>
        </Link>
      </td>
      <td>
        <i
          className="far fa-window-close fa-2x"
          onClick={() => submitOperation(exp._id)}
        ></i>
      </td>
    </tr>
  ));

  const experiences2 = experience.map((exp) => (
    <Fragment key={exp._id}>
      <tr>
        <th>Company</th>
        <td>{exp.company}</td>
      </tr>
      <tr>
      <th>Location</th>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
      </tr>
      <tr>
      <th>Edit</th>
        <td>
          <Link
            to={{
              pathname: `/edit-experience/${exp._id}`,
              query: `${exp._id}`,
            }}
            className="btn btn-light"
          >
            <i className="far fa-edit fa-2x"></i>
          </Link>
        </td>
      </tr>
      <tr className="strong-bottom">
      <th>Remove</th>
        <td>
          <i
            className="far fa-window-close fa-2x"
            onClick={() => submitOperation(exp._id)}
          ></i>
        </td>
      </tr>
    </Fragment>
  ));

  return (
    <Fragment>
      <h2>Experience Credentials</h2>
      <table className="information-table bigScreen">
        <thead>
          <tr>
            <th>Company</th>
            <th>Location</th>
            <th>Title</th>
            <th className="hide-md">Years</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
      <table className="information-table mobileScreen">
        <tbody>{experiences2}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
