import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  CLEAR_USERS,
  GET_USERS,
  USERS_ERROR,
  GET_EXPERIENCE,
  POST_EXPERIENCE,
  POST_EDUCATION,
  GET_EDUCATION,
  POST_FILE,
  ALL_USERS,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  repos: [],
  error: {},
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case GET_EXPERIENCE:
    case GET_EDUCATION:
    case POST_EXPERIENCE:
    case POST_EDUCATION:
    case UPDATE_PROFILE:
    case POST_FILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users2: payload,
        loading: false,
      };
      case ALL_USERS:
        return{
          ...state,
          allUsers: payload,
          loading: false,
        } ;
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case USERS_ERROR:
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_USERS:
    case CLEAR_PROFILE:
      return {
        ...state,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
