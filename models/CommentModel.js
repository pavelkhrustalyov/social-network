const { model, Schema } = require('mongoose');

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    text: {
        type: String,
        required: [ true, 'Текст комментария обязателен!'],
    }
}, { timestamps: true }
);

module.exports = model('Comment', CommentSchema);
