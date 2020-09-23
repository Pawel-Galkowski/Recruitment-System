import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { withRouter } from "react-router-dom";
import { getForm, addResponseToForm } from "../../actions/form";
import axios from "axios";

const Forms = ({
  auth,
  getForm,
  addResponseToForm,
  forms: { form, loading },
  history,
  match,
}) => {
  useEffect(() => {
    getForm(match.params.company, match.params.id);
  }, [getForm, match]);

  const company = match.params.company;

  const [answer, setAnswer] = useState("");
  const [fileData, setFileData] = useState("");
  const [formData, setFormData] = useState([]);
  const onChange = (e) => {
    setAnswer({ ...answer, [e.target.name]: e.target.value });
    setFormData([answer, ...formData]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData([answer, ...formData]);
    let arr = Object.values(answer);
    addResponseToForm(company, match.params.id, arr, fileData, history);
  };

  const [file, setFile] = useState();

  const chceckType = (name) => {
    let goodFile = false;
    let afterDot = name.split(".").pop();
    switch (afterDot.toLowerCase()) {
      case "pdf":
        goodFile = true;
        break;
      case "docx":
        goodFile = true;
        break;
      default:
        goodFile = false;
    }
    return goodFile;
  };

  const handleFile = (elem) => {
    if (elem.target.files[0]) {
      const isGood = chceckType(elem.target.files[0].name);
      if (isGood) {
        setFile(elem.target.files[0]);
      } else {
        alert(
          "Wrong file format. File will not be added!. \nAvailable formats: PDF, DOCX"
        );
      }
    }
  };

  const uploadFile = async (e) => {
    if (file) {
      const isGood = chceckType(file.name);
      if (isGood) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user", auth.user._id);
        try {
          const res = await axios.post(
            `/uploads/${company}/${auth.user._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { filePath } = res.data;
          setFileData(filePath);
        } catch (err) {
          if (err.response.status === 500) {
            console.log("There was a problem with the server");
          } else {
            console.log("File with that name exist");
          }
        }
      } else {
        alert("Not valid file");
      }
    }
  };

  return loading || !form ? (
    <Spinner />
  ) : (
    <div className="paddingSection">
      <Link to={`/api/forms/${company}`} className="btn btn-light">
        Back to forms
      </Link>
      <div className="marginTop-2">
        <h1 className="large text-primary">Form Questions</h1>
        <form className="form" onSubmit={onSubmit}>
          {form.questions.map((el, index) => (
            <Fragment key={index}>
              <div className="form-group">
                <label>{el}</label>
                <input
                  type="text"
                  placeholder={el}
                  name={index}
                  required
                  onChange={onChange}
                />
              </div>
            </Fragment>
          ))}
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={(e) => handleFile(e)}
            />
            {fileData ? <span>File added</span> : null}
            <br />
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => uploadFile(e)}
            >
              Upload file
            </button>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
        </form>
      </div>
    </div>
  );
};

Forms.propTypes = {
  getForm: PropTypes.func.isRequired,
  addResponseToForm: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  forms: state.forms,
  auth: state.auth,
});

export default connect(mapStateToProps, { getForm, addResponseToForm })(
  withRouter(Forms)
);
