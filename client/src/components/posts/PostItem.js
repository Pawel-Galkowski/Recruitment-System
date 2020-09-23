import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  addLike,
  deletePost,
  removeLike,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  profile,
}) => {
  var singleProfile;
  singleProfile = profile
    ? (singleProfile = profile.filter((x) => x.user._id === user))
    : null;
  return (
    <div className="post bg-white">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={
              profile !== undefined && singleProfile[0] && singleProfile[0].profileImg
                ? singleProfile[0].profileImg
                : avatar
            }
            alt="avatar"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p>{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => addLike(_id)}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>
                {likes && likes.length > 0 ? (
                  <span>{likes.length}</span>
                ) : (
                  <span></span>
                )}
              </span>
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => removeLike(_id)}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count"> {comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
