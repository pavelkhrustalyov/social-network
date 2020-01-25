import {
    GET_FEED,
    CREATE_COMMENT_FEED,
    DELETE_COMMENT_FROM_FEED,
    LIKE_UNLIKE_FEED,
    SHOW_COMMENTS_FEED } from './feed.types';

import { setAlert } from '../alert/alert.actions';
import axios from 'axios';

export const getFeed = () => async (dispatch) => {
    try {
        const feedPosts = await axios.get('/api/feed');
        dispatch({
            type: GET_FEED,
            payload: feedPosts.data
        })
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const likeUnlikeFeed = (postId) => async (dispatch) => {
    try {
        const likes = await axios.patch(`/api/posts/${postId}/likes`);
        dispatch({
            type: LIKE_UNLIKE_FEED,
            payload: { likes: likes.data, postId }
        });
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const createCommentFeed = ({ postId, text }) => async (dispatch) => {
    const comment = await axios.post(`/api/comments/create-comment/${postId}`, 
    { text });
    dispatch({
        type: CREATE_COMMENT_FEED,
        payload: { comment: comment.data, postId }
    });
};

export const deleteCommentFeed = ({ postId, _id }) => async (dispatch) => {
    await axios.delete(`/api/comments/delete-comment/${_id}`)
    dispatch({
        type: DELETE_COMMENT_FROM_FEED,
        payload: { postId, _id }
    });
};

export const showCommentFeed = (postId) => (dispatch) => {
    dispatch({
        type: SHOW_COMMENTS_FEED,
        payload: postId
    });
}
