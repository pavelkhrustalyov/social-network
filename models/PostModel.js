const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    showComments: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    postImg: {
        type: String,
        default: null
    },
    text: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
}, { timestamps: true });

module.exports = model('Post', PostSchema);
