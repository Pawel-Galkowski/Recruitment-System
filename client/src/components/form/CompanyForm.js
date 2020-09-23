import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompanyForms } from "../../actions/form";
import { Link } from "react-router-dom";
import CompanyForms from "./CompanyForms";
import Spinner from "../layout/Spinner";

const CompanyForm = ({
  auth,
  getCompanyForms,
  forms: { forms, loading },
  match,
}) => {
  useEffect(() => {
    getCompanyForms(match.params.company);
  }, [getCompanyForms, match]);

  return loading || !forms || !auth.user ? (
    <Spinner />
  ) : (
    <div className="paddingSection">
      {forms.admins && forms.admins.includes(auth.user._id) ? (
        <div className="mobile-center">
          <Link
            to={`/api/forms/create/${match.params.company}`}
            className="btn btn-primary"
          >
            Create new form
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      <div className="marginTop-2">
        <h2>Actually forms:</h2>
        {!forms.formTable || forms.formTable.length < 1 ? (
          <h2>No forms available</h2>
        ) : (
          forms.formTable.map((form) => (
            <CompanyForms
              key={form._id}
              formTable={form}
              company={match.params.company}
              admins={forms.admins}
              name={forms.company}
            />
          ))
        )}
      </div>
    </div>
  );
};

CompanyForm.propTypes = {
  getCompanyForms: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  forms: state.forms,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCompanyForms })(CompanyForm);
