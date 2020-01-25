export const feedLikeUnlike = (feed, payload) => {
    return feed.map(f => {
        return f._id === payload.postId
        ? { ...f, likes: payload.likes }
        : f
    })
};

export const createComment = (feed, payload) => {
    return feed.map(f => {
        return f._id === payload.postId
        ? { ...f, comments: [ ...f.comments, payload.comment ] }
        : f
    })
};

export const showComments = (feed, payload) => {
    return feed.map(f => {
        return f.id === payload.postId
        ? { ...f, showComments: !f.showComments }
        : f
    })
};

export const deleteComment = (feed, payload) => {
    return feed.map(f => {
        return f._id === payload.postId
        ? {...f, comments: f.comments.filter(cm => cm._id !== payload._id)}
        : f
    })
};