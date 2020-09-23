import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";
import { Link } from "react-router-dom";

const Education = ({ education, deleteEducation }) => {
  const submitOperation = (id) => {
    if (window.confirm("Do you really want to remove that experience?")) {
      deleteEducation(id);
    }
  };

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>{edu.fieldofstudy}</td>
      <td className="hide-md">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to !== null ? (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        ) : (
          "Now"
        )}
      </td>
      <td>
        <Link
          to={{ pathname: `/edit-education/${edu._id}`, query: `${edu._id}` }}
          className="btn btn-light"
        >
          <i className="far fa-edit fa-2x"></i>
        </Link>
      </td>
      <td>
        <i
          className="far fa-window-close fa-2x"
          onClick={() => submitOperation(edu._id)}
        ></i>
      </td>
    </tr>
  ));

  const educations2 = education.map((edu) => (
    <Fragment key={edu._id}>
      <tr>
        <th>School</th>
        <td>{edu.school}</td>
      </tr>
      <tr>
        <th>Degree</th>
        <td>{edu.degree}</td>
      </tr>
      <tr>
        <th>Edit</th>
        <td>
          <Link
            to={{ pathname: `/edit-education/${edu._id}`, query: `${edu._id}` }}
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
            onClick={() => submitOperation(edu._id)}
          ></i>
        </td>
      </tr>
    </Fragment>
  ));
  return (
    <Fragment>
      <h2 className="me-2">Education Credentials</h2>
      <table className="information-table bigScreen">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th className="hide-md">Field Of Study</th>
            <th>Years</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
      <table className="information-table mobileScreen">
        <tbody>{educations2}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
