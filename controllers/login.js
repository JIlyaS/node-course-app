const passport = require('passport');
const jwt = require('jsonwebtoken');
const Permission = require('../models/Permission');
// const router = require('../routes');

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        message: 'Неверный email или пароль'
      });
    }

    req.logIn(user, async () => {
      console.log("🚀 ~ file: login.js ~ line 18 ~ req.logIn ~ user", user)
      const permission = await Permission.findById({_id: String(user.permission)});
      const body = {
        _id: user.id,
        email: user.email
      };
      // Код генерирует ключ авторизации в соответствии с зарегистрированным пользователем синхронно
      const token = jwt.sign({user: body}, process.env.JWT_SECRET);
      return res.json({
        username: user.username,
        surName: user.surName,
        firstName: user.firstName,
        middleName: user.middleName,
        image: user.image,
        permission: permission.permission,
        accessToken: `Bearer ${token}`,
      });
    });
  })(req, res, next);
}
