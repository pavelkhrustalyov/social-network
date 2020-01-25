import {
    GET_FEED,
    CREATE_COMMENT_FEED,
    DELETE_COMMENT_FROM_FEED,
    LIKE_UNLIKE_FEED,
    SHOW_COMMENTS_FEED } from './feed.types';

import {
    feedLikeUnlike,
    createComment,
    showComments,
    deleteComment
} from './feed.utils';

const initial_state = {
    feed: [],
    loading: true,
};

export default (state = initial_state, { type, payload }) => {
    switch(type) {
        case GET_FEED:
            return {
                ...state,
                loading: false,
                feed: payload
            }
        case LIKE_UNLIKE_FEED:
            return {
                ...state,
                feed: feedLikeUnlike(state.feed, payload)
            }
        case CREATE_COMMENT_FEED:
            return {
                ...state,
                feed: createComment(state.feed, payload)
            }
        case SHOW_COMMENTS_FEED:
            return {
                ...state,
                feed: showComments(state.feed, payload)
            }
        case DELETE_COMMENT_FROM_FEED:
            return {
                ...state,
                feed: deleteComment(state.feed, payload)
            }
        default:
            return state;
    }
}