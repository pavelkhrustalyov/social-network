import React, { useEffect, useState } from "react";
import "./HomePage.styles.scss";

//components
import UserInfo from "../../components/UserInfo/UserInfo.component";
import Friends from "../../components/Friends/Friends.components";
import Post from "../../components/Post/Post.component";
import PostCreate from "../../components/PostCreate/PostCreate.component";
import { connect } from 'react-redux';
import { getUser, unfollowUser, followUser } from '../../redux/users/users.actions';
import Preloader from '../../components/Preloader/Preloader.component';
import CreateDialog from '../../components/CreateDialog/CreateDialog.component';
import { setShowModal } from "../../redux/others/other.actions";
import FullFriends from '../../components/Friends/FullFriends/FullFriends.component';
import UserView from '../../components/UserInfo/UserView/UserView.component';

const HomePage = ({ 
  match, 
  getUser,
  user,
  loading,
  myUser,
  history,
  unfollowUser,
  followUser,
  follow,
  showModal,
  setShowModal }) => {

  

  useEffect(() => {
    getUser(match.params.id);
  }, [getUser, match.params.id]);

  return (
    <div className="home-page">
      {
        (loading || user === null || myUser === null) ?
        <Preloader /> :
        <>
          <div className="home-page__user">
          {
              showModal === 'dialog' ? <CreateDialog userId={user._id} /> : null
          }
          {
            showModal === 'friends' ? <FullFriends /> : null
          }

          <UserView
            user={user}
            history={history}
            myUser={myUser}
            unfollowUser={unfollowUser}
            followUser={followUser}
            follow={follow}
            setShowModal={setShowModal}
          />

          <Friends
            type="Подписчики" 
            data={user.followers}
          />
          <Friends
            type="Подписки" 
            data={user.signed}
          />

        </div>

        <div className="home-page__people">
          <UserInfo user={user} />
          <div className="posts_schema">
            {(user._id === myUser._id) && <PostCreate />}
            <Post posts={user.posts} />
          </div>
        </div>
        </>
      }
    </div>
  );
};

const mapStateToProps = (
  { users: { 
    user, 
    loading, 
    toggleFollow }, auth, others }
  ) => ({
  user,
  loading,
  myUser: auth.user,
  follow: toggleFollow,
  showModal: others.showModal
});

export default connect(mapStateToProps, 
  { getUser, unfollowUser, followUser, setShowModal })
(HomePage);
