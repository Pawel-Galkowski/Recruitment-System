import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeForm } from "../../actions/form";

const CompanyForms = ({
  auth,
  removeForm,
  company,
  formTable: { _id, responses, body },
  admins,
  name,
}) => (
  <div className="formItem bg-white">
    <div>
      <h3>{name}</h3>
    </div>
    <div>
      <Link to={`/forms/post/${company}/${_id}`}>
        <h3>Check that position</h3>
      </Link>
      <h1>{body && body.title}</h1>
      <h2>Skills: {body && body.skills}</h2>
      <div className="marginUpDown-1 hide-sm">
        {body && body.body ? (
          body.body.length > 100 ? (
            body.body.substring(0, 97) + "..."
          ) : (
            body.body
          )
        ) : (
          <p></p>
        )}
      </div>
      <Link to={`/api/forms/${company}/${_id}`}>
        <h4>Apply for that position</h4>
      </Link>
    </div>
    <div>
      {!admins.includes(auth.user._id) ? (
        <div></div>
      ) : (
        <Fragment>
          <p className="hide-sm">Form responses: {responses.length}</p>
          <Link to={`/api/forms/res/${company}/${_id}`}>
            <h4>Check responses</h4>
          </Link>
          <button
            onClick={(e) => removeForm(company, _id)}
            type="button"
            className="btn btn-danger"
          >
            Remove &nbsp;<i className="fas fa-trash-alt"></i>
          </button>
        </Fragment>
      )}
    </div>
  </div>
);

CompanyForms.propTypes = {
  formTable: PropTypes.object.isRequired,
  removeForm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeForm })(CompanyForms);
