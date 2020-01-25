import {
    GET_USER,
    EDIT_USER,
    GET_ALL_USERS,
    UNFOLLOW_USER,
    FOLLOW_USER,
    CLEAR_USER,
    CREATE_POST,
    LIKE_UNLIKE,
    DELETE_POST,
    CREATE_COMMENT,
    DELETE_COMMENT,
    VISIBLE_COMMENTS,
    GET_FRIENDS,
    SET_AVATAR,
    GET_CARPETS,
    SET_CARPETS
} from './users.types';

import {
    likeRelease,
    createPost,
    deletePost,
    createComment,
    deleteComment,
    showComments,
} from './utils.user';

const initial_state = {
    user: null,
    loading: true,
    users: [],
    toggleFollow: false,
    friends: null,
    carpets: []
};

export default (state = initial_state, { type, payload }) => {
    switch(type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
                loading: false,
                toggleFollow: false
            }
        case EDIT_USER:
            return {
                ...state,
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                loading: false,
                toggleFollow: false,
                user: { ...state.user, followers: payload }
            }
        case FOLLOW_USER:
            return {
                ...state,
                loading: false,
                user: { ...state.user, followers: payload },
                toggleFollow: true
            }
        case CLEAR_USER:
            return {
                user: null,
                loading: true,
                users: null,
                toggleFollow: false
            }
        case CREATE_POST:
            return {
                ...state,
                loading: false,
                user: createPost(state.user, payload)
            }
        case LIKE_UNLIKE:
            return {
                ...state,
                loading: false,
                user: likeRelease(state.user, payload)
            }
        case DELETE_POST:
            return {
                ...state,
                loading: false,
                user: deletePost(state.user, payload)
            }
        case CREATE_COMMENT:
            return {
                ...state,
                user: createComment(state.user, payload)
            }
        case DELETE_COMMENT:
            return {
                ...state,
                user: deleteComment(state.user, payload)
            }
        case VISIBLE_COMMENTS:
            return {
                ...state,
                user: showComments(state.user, payload)
            }
        case GET_FRIENDS:
            return {
                ...state,
                friends: [ ...payload ]
            }
        case SET_AVATAR:
            return {
                ...state,
                user: { ...state.user, avatar: payload }
            }
        case GET_CARPETS:
            return {
                ...state,
                carpets: payload
            }
        case SET_CARPETS:
            return {
                ...state,
                user: { ...state.user, carpet: payload }
            }
        default:
            return state;
    }
}



