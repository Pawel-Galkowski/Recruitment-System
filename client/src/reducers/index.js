import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alert from "./alert";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import formReducer from "./formReducer";

export default combineReducers({
  auth: authReducer,
  alert,
  profile: profileReducer,
  post: postReducer,
  forms: formReducer,
});
