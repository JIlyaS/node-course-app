const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Permission = require('../models/Permission');

module.exports.reg = async (req, res, next) => {
  try {
    const permission = await Permission.create({
      permission: {
        chat: { C: true, R: true, U: true, D: true },
        news: { C: true, R: true, U: true, D: true },
        settings: { C: true, R: true, U: true, D: true }
      }
    });
    const user = await User.create({
      permission: permission._id,
      ...req.body,
    });
    

    req.logIn(user, async (err) => {
      if (err) {
       next(err);
      }

      const body = { _id: user._id, username: user.username };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
      return res.json({ accessToken: `Bearer ${token}` });
    }); 
  } catch (err) {
    if (err.name === 'ValidationError') {
      // res.send('Sorry, that username is already taken');
      next(err);
    } else {
      next(err);
    }
  }
}
