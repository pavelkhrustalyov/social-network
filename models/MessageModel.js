const { model, Schema } = require('mongoose');

const MessageSchema = new Schema({
    text: { type: String },
    dialogId: { type: Schema.Types.ObjectId, ref: 'Dialog', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    readed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  });

module.exports = model('Message', MessageSchema);