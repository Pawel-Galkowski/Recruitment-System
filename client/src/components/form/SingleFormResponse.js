import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./../layout/Spinner";
import { getForm } from "../../actions/form";
import FormResponse from "./FormResponse";

const SingleFormResponse = ({
  auth: { loading },
  getForm,
  forms: { form },
  match,
}) => {
  useEffect(() => {
    getForm(match.params.company, match.params.id);
  }, [getForm, match]);
  return loading || !form ? (
    <Spinner />
  ) : (
    <div className="paddingSection">
      <h1>Responses to form </h1>
      <div>
        <hr />
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

      <div>
        <hr />
        <h2>Responses:</h2>
        {form.responses &&
          form.responses.map((form) => (
            <Fragment key={form._id}>
              {" "}
              {form._id === match.params.response ? (
                <FormResponse form={form} match={match} />
              ) : (
                <div></div>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

SingleFormResponse.propTypes = {
  getForm: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  forms: state.forms,
});

export default connect(mapStateToProps, { getForm })(SingleFormResponse);
