import React, { Fragment, useState } from "react";
import { changePassword } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";

const ChangePassword = ({ changePassword }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });

  const { email, password, password2 } = formData;
  const fullUrl = window.location.href;
  const token = fullUrl.replace(/([^]+)recovery\//g, "");

  const onchange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password === password2) {
      changePassword(email, password, token).then(
        setAlert("Password Changed", "success")
      );
    } else {
      setAlert("Passwords do not match", "danger");
    }
  };

  return (
    <Fragment>
      <div className="center-box">
        <div className="flex-box">
          <div className="additionalBG">&nbsp;</div>
          <div className="user bg-dark">
            <div className="form-wrap">
              <div className="tabs-content">
                <div id="register-tab-content" className="active">
                  <form
                    className="register-form"
                    onSubmit={e => onSubmit(e)}
                    method="post"
                  >
                    <div className="input-box">
                      <div className="form-group">
                        <input
                          type="email"
                          className="input"
                          placeholder="Email Address"
                          name="email"
                          value={email}
                          onChange={e => onchange(e)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="input"
                          placeholder="Password"
                          name="password"
                          minLength="6"
                          value={password}
                          onChange={e => onchange(e)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="input"
                          placeholder="Confirm Password"
                          name="password2"
                          minLength="6"
                          value={password2}
                          onChange={e => onchange(e)}
                          required
                        />
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="button-change"
                      value="Change Password"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired
};

export default connect(null, { changePassword })(ChangePassword);
