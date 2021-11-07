const passport = require('passport');
const jwt = require('jsonwebtoken');
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

    req.logIn(user, () => {
      const body = {
        _id: user.id,
        email: user.email
      };
      // Код генерирует ключ авторизации в соответствии с зарегистрированным пользователем синхронно
      const token = jwt.sign({user: body}, process.env.JWT_SECRET);
      return res.json({
        accessToken: `Bearer ${token}`
      });
    });
  })(req, res, next);
}
