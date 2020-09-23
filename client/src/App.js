import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";
import Menu from "./components/layout/Menu";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

//Stylesheets
import setAuthToken from "./utils/setAuthToken";
import "./stylesheet/menuLayout/style.css";
import "./stylesheet/mainLayout/App.css";
import "./stylesheet/authLayout/auth.css";
import "./stylesheet/formsLayout/forms.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <main>
            <Navbar />
            <div className="rowLayout">
              <Menu />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route component={Routes} />
              </Switch>
            </div>
          </main>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
