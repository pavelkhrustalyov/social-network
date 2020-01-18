export const likeRelease = (user, payload) => {
    return { ...user,
        posts: user.posts.map(post => {
            return post._id === payload.postId
            ? {...post, likes: [ ...payload.likes ]}
            : post
        })
    }
};

export const createPost = (user, payload) => {
    const newPosts = [...user.posts];
    newPosts.unshift(payload);

    return { ...user,
        posts: newPosts
    }
};

export const deletePost = (user, payload) => {
    return {
        ...user,
        posts: user.posts.filter(post => (
            post._id !== payload
        ))
    }
};

export const createComment = (user, { postId, comment }) => {
    return {
        ...user,
        posts: user.posts.map(post => {
           return post._id === postId ?
            { ...post, comments: [ ...post.comments, comment ] }
            : post
        })
    }
};

export const deleteComment = (user, { postId, _id }) => {
    return {
        ...user,
        posts: user.posts.map(post => {
           return post._id === postId ?
            { ...post, comments: post.comments.filter(comment => (
                comment._id !== _id)
            )}
            : post
        })
    }
};

export const showComments = (user, payload) => {
    return { ...user,
        posts: user.posts.map(post => {
            return post._id === payload
            ? { ...post, showComments: !post.showComments }
            : post
        })
    }
};

