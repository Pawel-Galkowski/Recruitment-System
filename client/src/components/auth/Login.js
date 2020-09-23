import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onchange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  //Redirected if logged in

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="center-box">
        <div className="flex-box">
          <div className="additionalBG">&nbsp;</div>
          <div className="user bg-dark">
            <div className="form-wrap">
              <div className="tabs-content">
                <div id="login-tab-content" className="active">
                  <form className="login-form" onSubmit={e => onSubmit(e)} method="post">
                  <div className="input-box">
                    <input
                      type="email"
                      className="input"
                      id="user_login"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={e => onchange(e)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="input"
                      id="user_pass"
                      name="password"
                      value={password}
                      onChange={e => onchange(e)}
                      required
                    />
                  </div>
                    <input type="submit" className="button" value="Login" />
                  </form>
                  <div className="help-action">
                    <p>&nbsp;</p>
                    <p className="forgot">
                      Do not have account yet? <Link to="/register"><i className="fas fa-arrow-right"></i> Sign Up <i className="fas fa-arrow-left"></i></Link>
                    </p>
                    <p className="forgot">
                      <Link to="/recovery">
                      <i className="fas fa-arrow-right" aria-hidden="true"></i> Forgot your password?
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
