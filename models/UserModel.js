const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Пожалуйста, введите Email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    fullName: String,
    firstName: {
        type: String,
        required: [true, 'Please add a firstName']
    },
    secondName: {
        type: String,
        required: [true, 'Please add a secondName']
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    signed: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    city: String,
    birthday: Date,
    sex: String,
    about: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});


module.exports = model('User', UserSchema);