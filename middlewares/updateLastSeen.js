const User = require('../models/UserModel');

const setStatus = async ( req, res, next) => {
    if (req.user) {
        await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          last_seen: new Date()
        },
        { new: true }
      );
    }
    next();
};

module.exports = setStatus;