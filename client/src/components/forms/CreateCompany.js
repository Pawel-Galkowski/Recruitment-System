import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addCompany } from "../../actions/form";

const CreateCompany = ({ addCompany }) => {
  var [formData, setFormData] = useState({
    company: "",
    nip: "",
  });

  var { company, nip } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    addCompany(formData);
    setFormData('');
    formData = "";
  };

  return (
    <Fragment>
      <div className="form-box">
        <h1>Create your company profile</h1>
        <form
          className="form"
          id="createCompanyForm"
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            type="text"
            placeholder="Company name"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="text"
            name="nip"
            placeholder="NIP"
            value={nip}
            onChange={(e) => onChange(e)}
            required
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

CreateCompany.propTypes = {
  addCompany: PropTypes.func.isRequired,
};

export default connect(null, { addCompany })(withRouter(CreateCompany));
