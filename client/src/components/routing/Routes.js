import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile/CreateProfile";
import EditProfile from "../profile/EditProfile";
import PrivateRoute from "../routing/PrivateRoute";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import AddExperience from "../profile/AddExperience";
import EditExperience from "../profile/EditExperience";
import EditEducation from "../profile/EditEducation";
import AddEducation from "../profile/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../showProfile/Profile";
import AdminRoute from "../routing/AdminRoute";
import Admin from "../dashboard/Admin";
import ReMailer from "../auth/ReMailer";
import Authorize from "../auth/Authorize";
import ChangePassword from "../auth/ChangePassword";
import Forms from "../forms/Forms";
import CompanyForm from "../form/CompanyForm";
import Form from "../form/Form";
import FormResponses from "../form/FormResponses";
import SingleFormResponse from "../form/SingleFormResponse";
import CreateForm from "../form/CreateForm";
import SimpleForm from "../form/SimpleForm";
import Alert from "../layout/Alert";


const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/api/users/confirmation/:token" component={Authorize} />
        <Route exact path="/recovery" component={ReMailer} />
        <Route exact path="/api/users/recovery/:token" component={ChangePassword} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/forms" component={Forms} />
        <PrivateRoute exact path="/api/forms/:company" component={CompanyForm} />
        <PrivateRoute exact path="/api/forms/create/:company" component={CreateForm} />
        <PrivateRoute exact path="/forms/post/:company/:id" component={SimpleForm} />
        <PrivateRoute exact path="/api/forms/:company/:id" component={Form} />
        <PrivateRoute exact path="/api/forms/res/:company/:id" component={FormResponses} />
        <PrivateRoute exact path="/api/forms/res/:company/:id/:response" component={SingleFormResponse} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/edit-experience/:id" component={EditExperience} />
        <PrivateRoute exact path="/edit-education/:id" component={EditEducation} />
        <PrivateRoute exact path="/experience" component={AddExperience} />
        <PrivateRoute exact path="/education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <AdminRoute exact path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
