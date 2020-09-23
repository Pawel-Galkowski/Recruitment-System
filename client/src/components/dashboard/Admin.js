import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles, getUsers, getAllusers } from "../../actions/profile";
import { getPosts } from "../../actions/post";
import AdminPosts from "../admin/LastPosts";
import AdminProfiles from "../admin/LastProfiles";
import AddUsers from "../admin/AddUsers";
import AdminUsers from "../admin/LastUsers";
import AllUsers from "../admin/AllUsers";

const propComparator = (propName) => (a, b) =>
  a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;

const Admin = ({
  profile: { profiles, profile, users2, allUsers, loading },
  getPosts,
  post: { posts },
  getProfiles,
  getUsers,
  getAllusers,
}) => {
  useEffect(() => {
    getPosts();
    getProfiles();
    getUsers();
    getAllusers();
  }, [getPosts, getProfiles, getUsers, getAllusers]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="paddingSection">
        <section className="flex-column">
          <article className="row-100">
            <div className="admin-box">
              <div className="inside-box">
                <h2 className="box-header">Last added profiles</h2>
                {profiles === undefined ? (
                  <Spinner />
                ) : (
                  profiles
                    .map((profile) => (
                      <AdminProfiles key={profile._id} profile={profile} />
                    ))
                    .sort(propComparator("date"))
                    .slice(0, 5)
                )}
              </div>
            </div>
            <div className="admin-box">
              <div className="inside-box">
                <h2 className="box-header">Last added posts</h2>
                {posts === undefined ? (
                  <Spinner />
                ) : (
                  posts
                    .map((post) => <AdminPosts key={post._id} post={post} />)
                    .sort(propComparator("date"))
                    .slice(0, 5)
                )}
              </div>
            </div>
          </article>
          <article className="row-100">
            <div className="admin-box">
              <div className="inside-box">
                <h2 className="box-header">Last added users without profile</h2>
                {users2 === undefined ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    {users2
                      .map((usrs) => <AdminUsers key={usrs._id} usrs={usrs} />)
                      .sort(propComparator("date"))
                      .slice(0, 5)}
                  </Fragment>
                )}
              </div>
            </div>
            <div className="admin-box">
              <div className="inside-box">
                <h2 className="box-header">Add user</h2>
                <AddUsers />
              </div>
            </div>
          </article>
          <article className="row-100">
            <div className="admin-box">
              <div className="inside-box">
                <h2 className="box-header">All Users</h2>
                {allUsers === undefined ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    {allUsers
                      .map((usrs) => <AllUsers key={usrs._id} usrs={usrs} />)
                      .sort(propComparator("date"))
                      .slice(0, 5)}
                  </Fragment>
                )}
              </div>
            </div>
            <div className="admin-box">
              <div className="inside-box">
                <h2 className="box-header">Not added yet</h2>
                <Spinner />
              </div>
            </div>
          </article>
        </section>
      </div>
    </Fragment>
  );
};

Admin.propTypes = {
  profile: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getAllusers: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  getPosts,
  getProfiles,
  getUsers,
  getAllusers,
})(Admin);
