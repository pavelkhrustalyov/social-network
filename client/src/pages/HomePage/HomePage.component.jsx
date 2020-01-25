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
import Carpet from '../../components/Carpet/Carpet.component';
import Container from '../../components/Grid/Container.component';
import Row from '../../components/Grid/Row.component';
import Col from '../../components/Grid/Col.component';
import CarpetList from '../../components/Carpet/CarpetList/CarpetList.component';

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
          <Carpet
            carpet={user.carpet}
          >
            <UserView
              isOnline={user.isOnline}
              user={user}
              history={history}
              myUser={myUser}
              unfollowUser={unfollowUser}
              followUser={followUser}
              follow={follow}
              setShowModal={setShowModal}
            />
          </Carpet>
          {
            showModal === 'friends' ? <FullFriends /> : null
          }
          {
            showModal === 'carpets' ? <CarpetList userCarpet={user.carpet} /> : null
          }
          <Container>
            <Row center>
              <Col md={12} xs={12} lg={4}>
                <div className="home-page__people">
                    <UserInfo user={user} />
                </div>
                {
                  user.signed && user.followers
                  && (
                    <Row>
                      <Col xs={12} md={12} lg={12}>
                      {
                        user.signed &&
                          (<Friends
                          type="Подписки" 
                          data={user.signed}
                        />)
                      }

                      {
                        user.followers && (
                          <Friends
                            type="Подписчики" 
                            data={user.followers}
                          />
                        )
                      }
                      </Col>
                    </Row>
                  )
                }
              </Col>
              <Col md={12} xs={12} lg={8} >
                  <div className="posts_schema">
                    {(user._id === myUser._id) && <PostCreate />}
                    <Post posts={user.posts} />
                  </div>
              </Col>
            </Row>
          </Container>
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
