import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";

const PostForm = ({
  getCurrentProfile,
  addPost,
  profile: { profile },
}) => {
  const [text, setText] = useState("");
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return profile === null ? (
    <div></div>
  ) : (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something to create a post</h3>
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addPost, getCurrentProfile })(
  PostForm
);
