import {
    GET_USER,
    EDIT_USER, 
    GET_ALL_USERS, 
    UNFOLLOW_USER, 
    FOLLOW_USER,
    CREATE_POST,
    LIKE_UNLIKE,
    DELETE_POST,
    CREATE_COMMENT, 
    DELETE_COMMENT,
    VISIBLE_COMMENTS,
    GET_FRIENDS,
    SET_AVATAR
} from './users.types';

import axios from 'axios';
import { setAlert } from '../alert/alert.actions';

export const getUser = (id) => async (dispatch) => {
    try {
        const user = await axios.get(`/api/users/${id}`);
        dispatch({
            type: GET_USER,
            payload: user.data
        });
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const editUser = (data, history) => async (dispatch) => {
    try {
        const user = await axios.post('/api/users/user/edit', data);
        dispatch({
            type: EDIT_USER,
        });
        history.push(`/user/${user.data._id}`);
        dispatch(setAlert('success', 'Профиль успешно изменен!'));
    } catch (err) {
        const errors = err.response.data.errors;
        const error = err.response.data.error;

        if (errors) {
            errors.forEach(error => dispatch(setAlert('error', error.msg)));
        } else if (error) {
            dispatch(setAlert('error', error));
        }
    }
};

export const getAllUsers = (search) => async (dispatch) => {
    if (search !== '') {
        try {
            const users = await axios.get(`/api/users/user/${search}`);
            dispatch({
                type: GET_ALL_USERS,
                payload: users.data
            });
        } catch (err) {
            if (err) {
                dispatch({
                    type: GET_ALL_USERS,
                    payload: null
                });
            }
        }
    } else {
        dispatch({
            type: GET_ALL_USERS,
            payload: []
        });
    }
    
};

export const unfollowUser = (id) => async (dispatch) => {
    try {
        const follower = await axios.delete(`/api/follow/${id}`);
        dispatch({
            type: UNFOLLOW_USER,
            payload: follower.data
        });
        dispatch(
            setAlert('success', `Вы успешно отписались`)
        );
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const followUser = (id) => async (dispatch) => {
    try {
        const follower = await axios.post(`/api/follow/${id}`);
        dispatch({
            type: FOLLOW_USER,
            payload: follower.data
        });
        dispatch(
            setAlert('success', `Вы успешно подписались`)
        );
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
}

export const createPost = (data) => async (dispatch) => {
    try {
        const post = await axios.post('/api/posts/post-create', data);
        dispatch({
            type: CREATE_POST,
            payload: post.data
        });
        dispatch(
            setAlert('success', 'Пост успешно создан!')
        );
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const likeUnlike = (postId) => async (dispatch) => {
    try {
        const likes = await axios.patch(`/api/posts/${postId}/likes`);
        dispatch({
            type: LIKE_UNLIKE,
            payload: { likes: likes.data, postId }
        });
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const createComment = ({ postId, text }) => async (dispatch) => {
    const comment = await axios.post(`/api/comments/create-comment/${postId}`, 
    { text });
    dispatch({
        type: CREATE_COMMENT,
        payload: { comment: comment.data, postId }
    });
};

export const deleteComment = ({ postId, _id }) => async (dispatch) => {
    await axios.delete(`/api/comments/delete-comment/${_id}`)
    dispatch({
        type: DELETE_COMMENT,
        payload: { postId, _id }
    });
};


export const showComments = (postId) => (dispatch) => {
    dispatch({
        type: VISIBLE_COMMENTS,
        payload: postId
    });
}

export const getFriends = (data) => (dispatch) => {
    dispatch({
        type: GET_FRIENDS,
        payload: data
    });
};

export const setAvatar = (data) => async (dispatch) => {
    try {
        const urlImg = await axios.put('/api/users/user/avatar-upload', data);
        dispatch({ type: SET_AVATAR, payload: urlImg.data })
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};