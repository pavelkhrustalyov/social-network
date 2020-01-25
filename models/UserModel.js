const { model, Schema } = require('mongoose');
const differenceInMinutes = require('date-fns/differenceInMinutes');
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
    last_seen: Date,
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
    }],
    carpet: {
        type: String,
        default: 'carpet-3.jpg'
    }
});

UserSchema.virtual('isOnline').get(function() {
    return differenceInMinutes(new Date(), this.last_seen) < 1;
});

UserSchema.set('toJSON', {
    virtuals: true,
});


module.exports = model('User', UserSchema);