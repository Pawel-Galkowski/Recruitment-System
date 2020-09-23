import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { getProfiles } from "../../actions/profile";
import { getPosts } from "../../actions/post";
import PostForm from "./PostForm";

const Posts = ({
  getProfiles,
  profile,
  getPosts,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getProfiles();
    getPosts();
  }, [getPosts, getProfiles]);

  return loading || profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="paddingSection">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community
        </p>
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} profile={profile.profiles} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPosts, getProfiles })(Posts);
