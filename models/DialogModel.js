const { model, Schema } = require('mongoose');

const DialogSchema = new Schema({
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    lastMessage: [
        { type: Schema.Types.ObjectId, ref: "Message" }
    ],
    },
    { timestamps: true }
);

module.exports = model('Dialog', DialogSchema);
