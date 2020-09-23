import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {deleteComment} from "../../actions/post"

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth, deleteComment
}) => {
  return (
    <div className="post bg-white">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt="avatar"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p>
          {text}
        </p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user===auth.user._id && ( <button className="btn btn-danger" onClick={e =>deleteComment(postId, _id)} type="button">
            <i className="fas fa-times">{''}</i>
            </button>)}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
