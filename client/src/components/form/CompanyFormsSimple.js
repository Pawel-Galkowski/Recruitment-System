import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeForm } from "../../actions/form";

const CompanyForms = ({
  company,
  formTable: { _id, body },
  name,
}) => (
  <div className="formItemBig bg-white">
    <div>
      <h3>{name}</h3>
    </div>
    <div>
      <h1>{body && body.title}</h1>
      <h2>Skills: {body && body.skills}</h2>
      <div className="marginUpDown-1">
        {body && body.body}
      </div>
      <Link to={`/api/forms/${company}/${_id}`}>
        <h4>Apply for that position</h4>
      </Link>
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
