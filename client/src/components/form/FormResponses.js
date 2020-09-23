import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./../layout/Spinner";
import { Link } from "react-router-dom";
import { getForm } from "../../actions/form";
import { getProfiles } from "../../actions/profile";
import FormResponse from "./FormResponse";

const FormResponses = ({
  auth: { loading },
  getForm,
  getProfiles,
  profile: { profiles },
  forms: { form },
  match,
}) => {
  useEffect(() => {
    getForm(match.params.company, match.params.id);
    getProfiles();
  }, [getForm, match, getProfiles]);

  const company = match.params.company;
  
  return loading || !form ? (
    <Spinner />
  ) : (
    <div className="paddingSection">
      <Link to={`/api/forms/${company}`} className="btn btn-light">
        Back to forms
      </Link>
      <div className="marginTop-2">
        <h1>Responses to form </h1>
        <div>
          <hr />
          <br/>
          <h2>Questions:</h2>
          <div className="sectionLeftPadding">
            <ol>
              {form.questions &&
                form.questions.map((ask, index) => (
                  <Fragment key={index}>
                    <li>{ask}</li>
                  </Fragment>
                ))}
            </ol>
          </div>
        </div>
        <div className="sectionLeftPadding">
          <hr />
          <br/>
          <h2>Responses:</h2>
          {form.responses && form.responses.length > 0 ? (
            form.responses.map((form) => (
              <FormResponse
                key={form._id}
                form={form}
                match={match}
                profile={profiles}
              />
            ))
          ) : (
            <h3>No responses available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

FormResponses.propTypes = {
  getForm: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  forms: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  forms: state.forms,
  profile: state.profile,
});

export default connect(mapStateToProps, { getForm, getProfiles })(
  FormResponses
);
