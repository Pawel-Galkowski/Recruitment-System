import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { getPost } from "../../actions/post";
import { getProfiles } from "../../actions/profile";

const Post = ({
  getPost,
  getProfiles,
  post: { post, loading },
  profile,
  match,
}) => {
  useEffect(() => {
    getPost(match.params.id);
    getProfiles();
  }, [getPost, match, getProfiles]);
  return loading || post === null || profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="paddingSection">
        <Link to="/posts" className="btn btn-light">
          Back to Posts
        </Link>
        <div className="mainPost">
          <PostItem post={post} showActions={false} profile={profile.profiles} />
        </div>
        <hr />
        <CommentForm postId={post._id} />
        <div className="comments">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPost, getProfiles })(Post);
