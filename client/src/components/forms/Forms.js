import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCompanies } from "../../actions/form";
import CompanyItem from "./CompanyItem";
import CreateCompany from "./CreateCompany";

const Forms = ({ getCompanies, forms: { forms, loading } }) => {
  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return loading || !forms ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="paddingSection">
        <h1 className="large text-primary">Companies</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the companies section
        </p>
        <CreateCompany />

        <h2 className="formsMainText">All actually registered companies:</h2>
        <div className="forms">
          {!forms || !forms.length>=1 ? (
            <h2>No companies available</h2>
          ) : (
            forms.map((form) => <CompanyItem key={form._id} forms={form} />)
          )}
        </div>
      </div>
    </Fragment>
  );
};

Forms.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  forms: state.forms,
});

export default connect(mapStateToProps, { getCompanies })(Forms);
